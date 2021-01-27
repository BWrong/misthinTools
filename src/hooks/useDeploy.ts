import path from 'path';
import childProcess from 'child_process';
import { ref } from 'vue';
import { NodeSSH } from 'node-ssh';
import { IDeploy, IDeployMode } from '@/interfaces/settings';
import { ILog } from '@/interfaces/common';
import {formatTimestamp} from '@/utils';
const ssh = new NodeSSH();
interface GlobalDeployConfig {
  privateKey: string;
  passphrase: string;
}
let logs = ref<ILog[]>([]);
export default (modes: IDeployMode[], project:IDeploy, globalConfig: GlobalDeployConfig) => {
  logs.value = [];
  async function startDeploy() {
    for await (const mode of modes) {
      try {
        await executeDeployFlow(mode, project, globalConfig);
      } catch (error) {
        emitLog('error', error+'');
        console.log(error);
        throw new Error(`任务执行失败:${error}`);
      } finally {
        // 断开ssh
        ssh.dispose();
      }
    }
  }
  return {
    startDeploy,
    logs
  };
};
// 执行部署工作流
async function executeDeployFlow(config: IDeployMode,project:IDeploy, globConfig: GlobalDeployConfig) {
  // 检查配置
  checkConfigCorrect(config);
  // 执行打包
  await build(config,project);
  // 连接ssh
  await connectSSH(config, globConfig);
  // 备份
  await backup(config,project);
  // 删除远程文件
  await removeRemoteFile(config);
  // 上传文件
  await uploadFiles(config, project);
  emitLog('success', `项目已成功部署到${config.name}\n`);
  emitLog('info', '------------------------------');
}
const keyNameMap = {
  name: '环境名称',
  host: '服务器',
  port: '端口',
  username: '用户名',
  distPath: '打包目录',
  webDir: '部署目录'
};
// 检测部署配置
function checkConfigCorrect(config: IDeployMode) {
  emitLog('start',`检查配置 ${config.name}` );
  const rules: any = {
    name: (val: string) => /\S+/.test(val),
    host: (val: string) => /\S+/.test(val),
    port: (val: string) => /\d+/.test(val),
    username: (val: string) => /\S+/.test(val),
    distPath: (val: string) => /[^/]/.test(val),
    webDir: (val: string) => /[^/]+/.test(val)
  };
  Object.keys(rules).forEach((key: string) => {
    if (!rules[key]((config as any)[key])) {
      let keyName = (keyNameMap as any)[key];
      throw new Error(`[${config.name} - ${keyName}] 配置错误`);
    }
  });
  emitLog('success','配置正确' );
}
// 执行打包命令
async function build({ script }: IDeployMode,project:IDeploy) {
  try {
    if (!script) return;
    emitLog('start', `开始打包 ${script}`);
    await new Promise((resolve, reject) => {
      childProcess.exec(script, { cwd: project.path, maxBuffer: 5000 * 1024 }, (e) => {
        if (e === null) {
          emitLog('success', '打包成功');
          resolve('打包成功');
        } else {
          reject(e.message);
        }
      });
    });
  } catch (e) {
    console.log(e);
    throw new Error('打包失败');
  }
}
// 连接ssh
async function connectSSH({ username, host, port, password }: IDeployMode, { privateKey, passphrase }: GlobalDeployConfig) {
  try {
    emitLog('start', `ssh连接 ${host}:${port}`);
    let config: any = {
      username,
      host,
      port,
      password
    };
    if (!password) {
      config.privateKey = privateKey;
      config.passphrase = passphrase;
    }
    await ssh.connect(config);
    emitLog('success', 'ssh连接成功');
  } catch (e) {
    console.log(e);
    throw new Error('ssh连接失败');
  }
}
// 备份
async function backup({ backupDir, webDir }: IDeployMode,project:IDeploy) {
  try {
    if (!backupDir) return;
    const fileName = formatTimestamp(+new Date(), 'yyyyMMddhhmmss');
    const outFile = `${backupDir}/${project.name}-${fileName}.tar`;
    emitLog('start', `备份远程文件 ${webDir}`);
    await ssh.execCommand(`tar -cvf ${outFile} ${webDir}`);
    emitLog('success', `备份成功 ${outFile}`);
  } catch (e) {
    console.log(e);
    throw new Error('备份失败');
  }
}
// 删除远程文件
async function removeRemoteFile({ webDir }: IDeployMode) {
  try {
    emitLog('start', `删除远程文件 ${webDir}`);
    await ssh.execCommand(`rm -rf ${webDir}`);
    emitLog('success', '删除成功');
  } catch (e) {
    console.log(e);
    throw new Error('删除文件失败');
  }
}
// 上传文件
async function uploadFiles({ distPath, webDir }: IDeployMode, project:IDeploy,) {
  try {
    emitLog('start', `上传文件 ${webDir}`);
    let status = await ssh.putDirectory(path.resolve(project.path, distPath), webDir, {
      recursive: true, // 递归
      concurrency: 1, // 并发
      tick(localPath: any, remotePath: any, error: any) {
        if (error) {
          console.log(`${localPath} 上传失败`);
          console.log(error);
        }
      }
    });
    if (status) return emitLog('success', '上传成功');
    throw new Error('上传失败');
  } catch (e) {
    console.log(e);
    throw new Error('上传失败');
  }
}
// 添加日志
function emitLog(status: ILog['status'], txt: ILog['txt']) {
  logs.value.push({ status, txt });
}
