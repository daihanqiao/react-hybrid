/*
* @Author: daihanqiao
* @Date:   2015-12-08 19:59:14
* @Last Modified by:   daihanqiao
* @Last Modified time: 2016-01-07 11:58:57
* webpack配置文件
*/
'use strict';
var webpack = require('webpack');
var fs = require('fs');
var Lib = require('./bin/buildLib.js');
var WebpackShellPlugin = require('webpack-shell-plugin');
var isApp = Lib.isApp;
var isRelease = Lib.isRelease;
var outPutDir = Lib.getOutDir();
//发布版则清空输出目录
if(isRelease){
    if(fs.existsSync(outPutDir)){
        Lib.walk(outPutDir,function(tmpPath){
            fs.unlinkSync(tmpPath);
        });
    }
}
//根据fileType获取文件别名列表和不带后缀的文件名列表
var aliasTypeList = ['js','css','scss','svg'];
//图片类型文件
var imageTypeList=["jpg","gif","jpeg","png",'bmp','svg'];
function getFileList(path){
    var fileAliasList = {};//文件别名{'alis':fullPath}
    var entryAliasList = {};//入口程序别名
    var entryNameList = [];//入口程序文件名
    Lib.walk(path,function(tmpPath){
        var fileType = tmpPath.split('.').pop().toLowerCase();
        var fileName =tmpPath.split('/').pop().replace(/\.\w+$/,'');
        if(aliasTypeList.indexOf(fileType) === -1 && imageTypeList.indexOf(fileType) === -1){
            return false;
        }
        if(entryAliasList[fileName] || (fileAliasList[fileName] && fileType === fileAliasList[fileName].split('.').pop().toLowerCase())){
            throw "出现重名文件：" + fileName;
        }
        //入口程序js
        if(fileType === 'js' && fileName.indexOf('.entry') !== -1){
            entryAliasList[fileName] = Lib.getPath(tmpPath);
            entryNameList.push(fileName);
        }else{
            if(fileType === 'css' || fileType === "scss"){
                fileName = fileName + 'Css';
            }
            if(imageTypeList.indexOf(fileType) !== -1){
                fileName = fileName + 'Img';
            }
            fileAliasList[fileName] = Lib.getPath(tmpPath);
        }
    });
    return {
            'aliasList':fileAliasList,
            'entryAliasList':entryAliasList,
            'entryNameList':entryNameList
        };
}
//所有文件别名(不包括入口程序和html)
var aliasList = getFileList(Lib.getPath('src')).aliasList;
//所有需要打包的目录下文件列表
var packageType = Lib.getPackageType();
var pageFileList = getFileList(Lib.getPath('src/'+packageType));
//入口文件配置
var entryAliasList = pageFileList.entryAliasList;
var entryNameList = pageFileList.entryNameList;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var needHash = (isRelease && !isApp);
var outputName = needHash ? 'js/[name].[chunkhash:8].js' :'js/[name].js';
var extractTextName = needHash ? 'css/[name].[chunkhash:8].css' : 'css/[name].css';
var imageLoader = needHash ? 'url-loader?name=images/[name].[hash:8].[ext]&limit=8192' : 'url-loader?name=images/[name].[ext]&limit=8192';
var fontLoader = needHash ? 'url?name=fonts/[name].[hash:8].[ext]&prefix=font/&limit=10000' : 'url?name=fonts/[name].[ext]&prefix=font/&limit=10000';
//公共库别名
var baseJsName = isApp ? 'base.app' : 'base';
var shareSdkName = isApp ? 'shareSdk.app' : 'shareSdk';
var loginSdkName = isApp ? 'loginSdk.app' : 'loginSdk';
var paySdkName = isApp ? 'paySdk.app' : 'paySdk';
var mainName = isApp ? 'main.app' : 'main';
var isDebug = isRelease ? false : true;
var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        'name':'../lib/common',      //输出公共库文件名
        'minChunks':3,              //最少被3个入口文件引入的js文件会打包进common
        'minSize':1024              //打包进common的文件最小尺寸，单位：字节
    },entryNameList),
    //不采用style的方式加入css
    new ExtractTextPlugin(extractTextName,{allChunks:false,disable:false}),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({      //该插件可以增加公共配置
        __DEBUG__:isDebug,
        __CONFIG__:JSON.stringify("config"+Lib.getConfigType()),
        __SHARE_SDK__:JSON.stringify(shareSdkName),
        __LOGIN_SDK__:JSON.stringify(loginSdkName),
        __PAY_SDK__:JSON.stringify(paySdkName),
        __MAIN__:JSON.stringify(mainName),
    }),
    new webpack.ProvidePlugin({     //开启后js文件中不需要手动require:react,react-dom
        React: 'react',
        ReactDOM: 'react-dom',
        Com: 'common',
        Base: baseJsName
    }),
    new WebpackShellPlugin({
    //   onBuildStart: ['echo "BuildStarting"'],
    //   onBuildEnd: ['echo "BuildEnding"']
      onBuildExit: ['node .\\bin\\buildHtml.js']
    }),
];
if(isRelease){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}
//webpack配置
module.exports = {
    //页面入口文件配置
    entry: entryAliasList,
    //入口文件输出配置
    output: {
        path: outPutDir,
        publicPath: '../',//资源文件路径，包括字体，按需加载模块等
        filename: outputName
    },
    module: {
        //加载器配置
        loaders: [
            { test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            { test:/\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "!css!sass")},
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.(png|jpg|gif)$/, loader: imageLoader},
            { test   : /\.woff|\.woff2|\.svg|.eot|.otf|\.ttf/, loader : fontLoader},
        ],
        noParse: [] //不解析某文件，例如压缩后的react.min.js，和输出无关
    },
    // devtool: "source-map",
    //插件项
    plugins: plugins,
    //其它解决方案配置
    resolve: {
        // root: './', //绝对路径
        extensions: ['', '.js', '.json', '.less','.scss', '.css', "jpg"," gif", "jpeg", "png", 'bmp'],
        alias: aliasList
    }
};
