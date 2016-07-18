# react-hybrid最佳实践
>基于react，webpack，apicloud同时构建ios，android，wap端的应用框架，根据不同打包命令，引用不同库文件，最终输出适合不同平台的应用

## 演示
下载项目后访问`./dev/html/example.html`

## 使用
### 安装依赖库
运行环境：Windows，（Linux和Mac需要修改package.json下scripts中设置环境变量的命令如：`set NODE_ENV=release`=>`env NODE_ENV=release`

安装：nodejs

在项目根目录依次运行：

`npm i cnpm -g`

`cnpm i`

### 项目结构
>**bin**：项目中所用相关脚本
>>**buildHtml**：webpack打包完成后，将html文件进行相关处理后（例如对js文件进行gzip）生成到输出目录

>>**buildLib**：脚本公共库

>>**copyFiles**：需要输出ios，android版本时，会运行该脚本，将输出目录release_app下的文件拷贝到APICLOUD项目目录中（需配置apicloud项目地址）

>>**createPage**：创新新页面时运行该脚本

>**输出目录**：
>>**dev**：开发环境的输出目录

>>**release0**：发布环境的输出目录，使用配置config0.js

>>**release1**：发布环境的输出目录，使用配置config1.js

>>**release_app**：app的输出目录

>**src**：代码文件
>>**lib**：基础库+基础组件

>>**general**：项目相关的公共样式，js文件，公共组件

>>**page**：页面目录

### 新建页面
规则：**约定大于配置**，由`模块名_页面名`组成

运行命令：`npm run page user_login 登录 css`

命令参数说明：
> **user_login**：user：模块名，login：页面名

>  **登录**：页面标题

>   **css**：该页面是否需要样式文件

命令运行成功后，会在page目录下生成`user_login`目录，包含`user_login.entry.js` ，`user_login.html`，`user_login.scss`

### 资源引用
规则：**约定大于配置**，项目相关文件放于`src/general/common/`对应目录，引用资源文件时无需文件路径及文件类型，约定如下：
> **js文件**：`var Js = require('fileName')`

> **css，scss文件**：`require('fileNameCss')`

> **图片文件**：`require('fileNameImg')`

### 项目调试
运行命令：`npm run watch`

命令运行成功后，会在根目录生成`dev`目录，该目录下`html/`中的文件即可在游览器中正常运行，当`src`目录中有文件被修改时，会实时更新到`dev`目录

### 项目发布
输出wap端：`npm run release num`

输出wap端gzip版本：`npm run release-gzip num`

输出app端：`npm run release-app num`

命令参数说明：
>**num**：打包时所调用的`src/general/common/js/config.js`版本，如：`1`=>`config1.js`，会在根目录输出release1目录

>**gzip**：需服务端开启相应配置支持

app端说明：
>配置`bin/copyFiles.js`中`newAppFilePath`路径

>命令执行完成后，提交`newAppFilePath`路径下apicloud项目至apicloud云端，云端打包输出android，ios安装包，**注意**：apicloud项目的`config.xml`需要修改入口文件`<content src="html/项目入口文件名.html"/>`


### 接口数据
> **测试接口数据**：配置`./src/general/js/common`中`TEST_DATA_CONFIG`为true，测试接口`act`,`op`均为页面名，在`./src/general/js/testData`中添加相应数据即可

> **正式接口数据**：配置`./src/general/js/config`中`API_URL`，修改`common`中请求方法即可


### 基础组件
详细文档见组件源码中用法示例

> **actionSheet**：从下弹出的仿IOS选择器

> **apposeBtn**：并排两个按钮

> **apposeFixedBtn**：上浮并排两个按钮

> **blockBtn**：块级按钮

> **blockInput**：块状输入框，支持右侧带按钮

> **blockTitle**：块级标题，如有子元素会自动缩进

> **bottomTab**：底部tab

> **callEl**：拨打电话组件（对wap端和app端做兼容）

> **checkBox**：选择框

> **foldItem**：折叠Item

> **inputWithBtn**：左侧带标题，右侧带按钮的输入框

> **labelInput**：文本组件，支持左侧带标题，右侧带箭头，是否为输入文本

> **loader**：加载loading

> **mediaItem**：图文组件

> **numBox** ：数量选择框

> **poppicker**：多级联动选择器，支持一二三级联动，应用场景如省市区选择器

> **radio**：单选框

> **radioList**：单选组

> **scroll**：滚动组件

> **slider**：轮播组件

>**tabBtnGroup**：tab按钮组

> **topBar**：顶部bar

### 基础库
> **base**：`base.app`：打包app端时所运行的基础库，`base`：打包wap端时所运行的基础库， 详情见[base文档](./src/lib/base/README.md)

>**fiexible**：实现适配的基础库，`base`中已引入，使用方法：编写样式时，使用`pxToRem(px)`替代`px`，如：`font-size: pxToRem(14px);`=>`font-size: 14px;`

> **loginSdk**：第三方登录sdk，app端已实现微信登录，其他登录方式和wap端可拓展，保持参数及返回一致即可，使用方法见`loginSdk`源码示例

> **paySdk**：第三方支付sdk，wap端已实现微信支付，其他支付方式和app端可拓展，保持参数一致即可，使用方法见`paySdk`源码示例

> **shareSdk**：第三方分享sdk，app端已实现微信分享，其他分享方式和wap端可拓展，保持参数一致即可，使用方法见`shareSdk`源码示例

> **storage**：本地数据管理基础库，已封装至`base`

> **timing**：计时器工具，使用方法见`timing`源码示例

## 关于作者
* 个人博客：http://daihanqiao.github.io/
* 邮件：daihanqiao@126.com
* QQ: 935483576

