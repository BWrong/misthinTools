const webpack = require('webpack');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // outputDir: 'dist_electron', // 输出目录
      builderOptions: {
        publish: ['github',
          // {
          // provider: 'generic',
          // url: 'http://10.6.30.238:8888/software/course-tools/'
          // }
        ],
        win: {
          icon: './build/icons/icon.ico', // 应用文件图标
          'target': [{
            'target': 'nsis', //利用nsis制作安装程序
            'arch': ['x64']
          }]
        },
        mac: {
          icon: './build/icons/icon.icns',
          'target': [{
            'target': 'dmg'
          }]
        },
        nsis: {
          'oneClick': false, // 一键安装
          'allowToChangeInstallationDirectory': true // 允许修改安装目录
        },
        productName: 'MisthinTools', // 安装文件名
        appId: 'org.${name}.electron',
        copyright: 'Copyright © 2021 ${author}', //版权信息
        files: [{
          'filter': ['**/*']
        }],
        // extraFiles: ['./extensions/'],
        asar: true
      },
      mainProcessFile: 'src/main/index.ts',
      mainProcessWatch: ['src/main/**/*'],
      // mainProcessArgs: [],
      // rendererProcessFile: 'src/main.js',
      // chainWebpackMainProcess: (config) => {}, //主进程配置
      // chainWebpackRendererProcess: (config) => {}, // 渲染进程配置
      // disableMainProcessTypescript: false, // 主进程禁用ts
      // mainProcessTypeChecking: false, // 主进程禁用类型检查
      // removeElectronJunk: false
    }
  },
  productionSourceMap: !IS_PRODUCTION,

  configureWebpack: (config) => {
    config.devtool = 'source-map';
    config.plugins.push(
      // 去掉moment多余语言文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    );
  },
  css: {
    sourceMap: !IS_PRODUCTION,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
};
