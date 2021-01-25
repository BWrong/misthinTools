const childProcess = require('child_process');
const inquirer = require('inquirer');
const ora = require('ora');
const { NodeSSH } = require('node-ssh');
const { showLogo, checkVersion, checkHasConfigFile, checkConfigCorrect, logNormal, logError, logSuccess, logUnderline,formatTimestamp } = require('../utils');
const { configPath } = require('../config');
const ssh = new NodeSSH();
module.exports = async ({ mode }) => {


  // 2. 处理传入参数
  if (!mode || (mode !== 'all' && !config.modes[mode])) return logError('错误：未指定环境或指定环境无效');
  // 3. 检查配置文件正确性
  if (mode === 'all') {
    let modeList = Object.values(config.modes);
    modeList.map((item) => {
      checkConfigCorrect(item);
      executeDeployFlow(item, config);
    });
  } else {
    checkConfigCorrect(config.modes[mode]);
    executeDeployFlow(config.modes[mode], config);
  }
};
// 执行部署工作流
async function executeDeployFlow(config, globConfig) {
  // 执行打包
  await build(config);
  // 连接ssh
  await connectSSH(config, globConfig);
  // 备份
  await backup(config, globConfig);
  // 删除远程文件
  await removeRemoteFile(config);
  // 上传文件
  await uploadFiles(config);
  // 断开ssh
  ssh.dispose();
  logSuccess(`${logUnderline(globConfig.projectName)}项目已成功部署到${logUnderline(config.name)}\n`);
  process.exit(0);
}
// 执行打包命令
async function build({ script }) {
  try {
    if (!script) return;
    logNormal(`- ${script}`);
    const spinner = ora('正在打包中...\n').start();
    await new Promise((resolve, reject) => {
      childProcess.exec(script, { cwd: process.cwd(), maxBuffer: 5000 * 1024 }, (e) => {
        spinner.stop();
        if (e === null) {
          logSuccess('打包成功');
          resolve();
        } else {
          reject(e.message);
        }
      });
    });
  } catch (e) {
    logError('错误：打包失败');
    logError(e);
    process.exit(1);
  }
}
// 连接ssh
async function connectSSH({ username, host, port, password }, { privateKey, passphrase }) {
  try {
    logNormal(`- ssh连接 ${logUnderline(host)}`);
    if (!privateKey && !password) {
      const answers = await inquirer.prompt([
        {
          type: 'password',
          name: 'password',
          message: '请输入远程服务器密码'
        }
      ]);
      password = answers.password;
      logNormal(`正在连接${logUnderline(host)}`);
    }
    let config = {
      username,
      host,
      port,
      password
    };
    privateKey && (config.privateKey = privateKey);
    passphrase && (config.passphrase = passphrase);
    await ssh.connect(config);
    logSuccess('ssh连接成功');
  } catch (e) {
    logError(e);
    process.exit(1);
  }
}
// 备份
async function backup({backupDir,webDir},{projectName}) {
  try {
    if (!backupDir) return;
    const fileName = formatTimestamp(+new Date(), 'yyyyMMddhhmmss');
    const outFile = `${backupDir}/${projectName}-${fileName}.tar`;
    logNormal(`- 备份远程文件 ${logUnderline(webDir)}`);
    await ssh.execCommand(`tar -cvf ${outFile} ${webDir}`);
    logSuccess(`备份成功: ${logUnderline(outFile)}`);
  } catch (e) {
    logError(e);
    process.exit(1);
  }
}
// 删除远程文件
async function removeRemoteFile({webDir}, index) {
  try {
    logNormal(`- 删除远程文件 ${logUnderline(webDir)}`);
    await ssh.execCommand(`rm -rf ${webDir}`);
    logSuccess('删除成功');
  } catch (e) {
    logError(e);
    process.exit(1);
  }
}
// 上传文件
async function uploadFiles({distPath,webDir}) {
  try {
    logNormal(`- 上传文件至远程目录 ${logUnderline(webDir)}`);
    const spinner = ora('文件上传中...\n').start();
    let status = await ssh.putDirectory(distPath, webDir, {
      recursive: true, // 递归
      concurrency: 1, // 并发
      tick(localPath, remotePath, error) {
        if (error) {
          logError(`${localPath} 上传失败`);
          logError(error);
        }
      }
    });
    spinner.stop();
    if(status) return logSuccess('上传成功');
    logError('错误：上传失败');
  } catch (e) {
    logError(`错误：上传失败: ${e}`);
    process.exit(1);
  }
}