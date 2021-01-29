# MisthinTools
[![Build status](https://ci.appveyor.com/api/projects/status/9ni4180osqa3mnfy?svg=true)](https://ci.appveyor.com/project/BWrong/misthintools)
[![Build Status](https://travis-ci.com/BWrong/misthinTools.svg?branch=main)](https://travis-ci.com/BWrong/misthinTools)

[下载地址](https://github.com/BWrong/misthinTools/releases)
## 简介
MisthinTools是一款辅助开发软件，出发点是通过一些小工具为开发者提供便利。目前提供了项目模板和自动部署两个功能，后续也会根据需求加入其它实用的功能。
#### 技术实现
- 应用框架: `Electron11.2.1`、`Nodejs12.18.3`、`Chrome：87.0.4280.141`
- 应用打包: `ElectronUpdater4.3.5`
- 核心：`TypeScript`、`Vue3.0`
- 视图：`Ant Design of Vue 2.0`
## 功能
### 项目模板
项目模板提供了一些常用技术栈的基础项目框架，这些框架一般具有较高的成熟度，包含项目所需的一些功能，目的是让开发者在新建项目的时候不用从零开始，可以更快的进入业务开发。
目前，提供的框架有限，而且这些数据也是放在软件中的，在后续会提供一个平台来进行管理，也会考虑接受推荐。

![](https://gitee.com/letwrong/Picture/raw/master/20210129144247.png)

在列表中列出了现有的一些模板，每项可以看到名字、使用的技术栈、作者和简介，也可以查看文档及仓库地址，如果需要下载，可以点击下载按钮，然后会弹出对话框，输入项目名称和存放位置即可下载该模板。

![](https://gitee.com/letwrong/Picture/raw/master/20210129145056.png)

**注意：**
- 项目名称会作为`package.json`的`name`值，为了防止特殊字符和中文引起的一些问题，目前仅支持`英文`、`数字`和`-_`。
- 模板并不能满足每一个人的需求，遇到模板不满足需求或者模板有bug时请去其仓库反馈，也欢迎贡献代码。

### 自动部署
其实自动部署这个名字并不准确，应该叫部署助手。

一些小公司或个人可能并不具备集成CICD的条件，在部署项目的时候还是会采用比较传统一点的手段，如: 打包 -> 查看服务器登录信息 ->登录FTP -> 上传文件，看起来仅仅几个步骤，但是如果项目多了，每次也挺麻烦的。因为这些流程都是固定重复的，所以便想着能不能让程序来完成这部分功能，解放双手。

![](https://gitee.com/letwrong/Picture/raw/master/20210129152918.png)

目前实现了如下功能：
- 项目管理：用户可以管理多个项目（添加、编辑、删除）
- 多环境：每个项目支持多种环境（开发、测试、生产、等等）,目前限制最多添加5个环境
- 一键部署：可以一键部署某个项目，可以同时部署多个环境
- 打包：构建前可以进行自动打包，**不配置打包命令将跳过打包环节**
- 备份： 可以在覆盖服务器上文件前进行备份，便于在新版本有问题时做回滚，**不配置备份目录将跳过备份环节**
- 部署目标位置设置： **会先将该目录删除再将新的文件上传到该处**
- 兼容[misthin-cli](https://www.npmjs.com/package/misthin-cli)：在添加项目时，如果项目中已存在`misthin.config.js`配置文件，可以直接导入该配置
- 配置管理：采用本地数据库管理用户配置文件，且密码信息进行加密存储，保证安全性
- 支持多种登录方式：
  - `ssh-key`: 推荐使用该方式，不过需要服务器支持，在软件设置设置`ssh-key`相关信息，然后在添加项目环境信息时，不设置密码，将使用`ssh-key`进行连接
  - 密码：如果项目环境信息中设置了密码，将使用密码进行登录

![](https://gitee.com/letwrong/Picture/raw/master/20210129152847.png)
![](https://gitee.com/letwrong/Picture/raw/master/20210129153008.png)
![](https://gitee.com/letwrong/Picture/raw/master/20210129225541.png)

**提示：** [misthin-cli](https://www.npmjs.com/package/misthin-cli)是作者之前开发的一款命令行工具，也包含了项目模板和部署功能。

## TODO
### 特色功能
- [x] 项目模板
- [x] 自动部署
  - [x] 发布流程
  - [x] 导入[misthin-cli](https://www.npmjs.com/package/misthin-cli)配置
- [] server
- [] 组件管理
- [] 常用推荐
### 基础功能
- [x] 自动更新: 由于mac自动更新需要证书，所以现在只做了更新检测，需要用户手动去下载安装。
- [x] 设置
- [x] 托盘功能
- [x] 深色模式
- [] Dock显示部署进度
