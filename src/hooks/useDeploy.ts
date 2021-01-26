import { IDeployMode } from '@/interfaces/settings';
import { ref } from 'vue';
import path from 'path';
import { checkConfigCorrect } from '@/utils';
import { message } from 'ant-design-vue';
import childProcess from 'child_process';
import {NodeSSH} from 'node-ssh';
const ssh = new NodeSSH();
interface GlobalDeployConfig{
  privateKey: string,
  passphrase: string,
  projectPath:string
}
export default (config: IDeployMode, globalConfig: GlobalDeployConfig) => {
  let status = ref(false);
  async function startDeploy() {
    status.value = true;
    try {
      checkConfigCorrect(config);
      await executeDeployFlow(config, globalConfig);
      status.value = false;
    } catch (error) {
      message.error('请检查配置正确性!');
      console.log(error);
      status.value = false;
    }
  }

  return {
    status,
    startDeploy
  };
};
// 执行部署工作流
async function executeDeployFlow(config:IDeployMode, globConfig:GlobalDeployConfig) {
  // 执行打包
  await build(config,globConfig);
  // 连接ssh
  await connectSSH(config, globConfig);
  // 备份
  await backup(config);
  // 删除远程文件
  await removeRemoteFile(config);
  // 上传文件
  await uploadFiles(config, globConfig);
  // 断开ssh
  ssh.dispose();
  console.log(`项目已成功部署到${config.name}\n`);
}
// 执行打包命令
async function build({ script }:IDeployMode,globalConfig:GlobalDeployConfig) {
  try {
    if (!script) return;
    console.log(`- ${script}`);
    console.log('正在打包中...\n');
    await new Promise((resolve, reject) => {
      childProcess.exec(script, { cwd: globalConfig.projectPath, maxBuffer: 5000 * 1024 }, (e) => {
        if (e === null) {
          console.log('打包成功');
          resolve('打包成功');
        } else {
          reject(e.message);
        }
      });
    });
  } catch (e) {
    console.log('错误：打包失败');
    console.log(e);
  }
}
// 连接ssh
async function connectSSH({ username, host, port, password }:IDeployMode, { privateKey, passphrase }:GlobalDeployConfig) {
  try {
    console.log(`- ssh连接 ${host}`);
    let config:any = {
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
    console.log('ssh连接成功');
  } catch (e) {
    console.log(e);
  }
}
// 备份
async function backup({backupDir,webDir}:IDeployMode) {
  try {
    if (!backupDir) return;
    const fileName = +new Date();
    const outFile = `${backupDir}/${fileName}.tar`;
    console.log(`- 备份远程文件 ${webDir}`);
    await ssh.execCommand(`tar -cvf ${outFile} ${webDir}`);
    console.log(`备份成功: ${outFile}`);
  } catch (e) {
    console.log(e);
  }
}
// 删除远程文件
async function removeRemoteFile({webDir}:IDeployMode) {
  try {
    console.log(`- 删除远程文件 ${webDir}`);
    await ssh.execCommand(`rm -rf ${webDir}`);
    console.log('删除成功');
  } catch (e) {
    console.log(e);
  }
}
// 上传文件
async function uploadFiles({distPath,webDir}:IDeployMode,globalConfig:GlobalDeployConfig) {
  try {
    console.log(`- 上传文件至远程目录 ${webDir}`);
    console.log('文件上传中...\n');
    let status = await ssh.putDirectory(path.resolve(globalConfig.projectPath,distPath), webDir, {
      recursive: true, // 递归
      concurrency: 1, // 并发
      tick(localPath:any, remotePath:any, error:any) {
        if (error) {
          console.log(`${localPath} 上传失败`);
          console.log(error);
        }
      }
    });
    if(status) return console.log('上传成功');
    console.log('错误：上传失败');
  } catch (e) {
    console.log(`错误：上传失败: ${e}`);
  }
}