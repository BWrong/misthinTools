const { resolve } = require('path');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // outputDir: 'dist_electron', // 输出目录
      builderOptions: {
        publish: [{
          provider: 'github',
          owner: 'BWrong',
          repo: 'misthinTools',
          releaseType: 'draft'
        }

          // {
          // provider: 'generic', // 自己托管服务器
          // url: 'http://10.6.30.238:8888/software/course-tools/'
          // }
        ],
        snap: {
          publish: ['github']
        },
        win: {
          icon: './build/icons/icon.ico', // 应用文件图标
          target: [{ target: 'nsis', arch: ['x64'] }],
          legalTrademarks: 'misthin'
        },
        mac: {
          icon: './build/icons/icon.icns',
          category: 'public.app-category.developer-tools', // 应用类别
          target: [{ target: 'dmg' }],
          darkModeSupport: true, // 深色模式支持
          extendInfo: {
            // LSUIElement: 1 // 不占用dock栏
          }
        },
        nsis: {
          oneClick: false, // 一键安装
          perMachine: false, // 辅助安装模式
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true // 创建开始菜单图标
        },
        dmg: {
          // contents: [
          //   {
          //     x: 410,
          //     y: 150,
          //     type: 'link',
          //     path: '/Applications'
          //   },
          //   {
          //     x: 130,
          //     y: 150,
          //     type: 'file'
          //   }
          // ]
        },
        linux: {
          icon: 'build/electron-icon/icon.png',
          target: 'AppImage'
        },
        productName: 'MisthinTools', // 安装文件名
        appId: 'org.misthin-tools.electron',
        // appId: 'org.${name}.electron',
        copyright: 'Copyright © 2021 ${author}', //版权信息
        asar: true
        // files: ['/**/*'],
        // extraFiles: ['./extensions/'],
      },
      mainProcessFile: 'src/main/index.ts',
      mainProcessWatch: ['src/main/**/*'],
      nodeIntegration: true
      // mainProcessArgs: [],
      // rendererProcessFile: 'src/main.js',
      // chainWebpackMainProcess: (config) => {}, //主进程配置
      // chainWebpackRendererProcess: (config) => {}, // 渲染进程配置
      // disableMainProcessTypescript: false, // 主进程禁用ts
      // mainProcessTypeChecking: false, // 主进程禁用类型检查
      // removeElectronJunk: false
    }
  },
  productionSourceMap: false,

  configureWebpack: {
    entry:'./src/renderer/main.ts',
    resolve: {
      // .mjs needed for https://github.com/graphql/graphql-js/issues/1272
      extensions: ['*', '.mjs', '.js', '.vue', '.json']
    },
    plugins: [
      new AntdDayjsWebpackPlugin()
      // 去掉moment多余语言文件
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },
  chainWebpack: (config) => {
    // config.devtool = 'source-map';
    config.resolve.alias.set('~', resolve('src/renderer'));
    config.resolve.alias.set('components', resolve('src/renderer/components'));
    config.module
      .rule('javascript/auto')
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type('javascript/auto');
    config.optimization.minimizer('terser').tap((args) => {
      // args[0].terserOptions.compress.drop_console = true;
      args[0].terserOptions.compress.drop_debugger = true;
      return args;
    });
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 优先级
            chunks: 'initial'
          },
          antd: {
            name: 'chunk-antd',
            test: /[\\/]node_modules[\\/]_?(ant-design-vue|@ant-design)(.*)/,
            priority: 20
          }
        }
      });
      config.optimization.runtimeChunk('single');
      // config.optimization.mergeDuplicateChunks=false;
    });
  },
  css: {
    sourceMap: !IS_PRODUCTION,
    loaderOptions: {
      less: {
        // additionalData: '@import "@/assets/styles/_mixin.less";',
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true;@import "${resolve('./src/renderer/assets/style/_variable.less')}"`
          }
        }
      }
    }
  }
};
