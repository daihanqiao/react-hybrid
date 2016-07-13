/*
* @Author: {daihanqiao}
* @Date:   2015-12-15 10:09:36
* @Last Modified by:   {daihanqiao}
* @Last Modified time: 2016-01-06 13:49:31
* 打包html,并插入公共js,css以及页面js,css文件引入
*/
'use strict';
//大于10kb的文件使用gzip
var GZIP_SIZE = 10240;
var fs = require('fs');
var zlib = require('zlib');
var Lib = require('./buildLib.js');
//生成目录
function mkdirSync(path){
    if(!fs.existsSync(Lib.getPath(path))){
        fs.mkdirSync(Lib.getPath(path));
    }
}
//在指定字符串除插入字符串，isAfter(在该字符串后)
function insStrIndex(oldStr,specifyStr,insStr,fileName,isAfter){
	var arr = oldStr.split(specifyStr);
	if(arr.length !== 2){
		throw fileName + ".html Don't have Num:" + arr.length + " " + specifyStr + " !";
	}
    if(isAfter){
        arr[1] = insStr + arr[1];
    }else{
        arr[0] = arr[0] + insStr;
    }
	var newStr = arr.join(specifyStr);
	return newStr;
}
//生成输出目录和输出目录下html目录
mkdirSync(Lib.getOutDir());
mkdirSync(Lib.getOutDir('/html/'));

//输出目录下所有js,css文件列表
function getFileList(path){
    var fileNameList = [];//不带路径文件名
    Lib.walk(path,function(tmpPath,stats){
        var fileName =tmpPath.split('/').pop();
        //css开启gzip测试浏览器解析不成功
        if(Lib.isOpenGzip && stats.size >= GZIP_SIZE && fileName.indexOf('.css') === -1){
            var gzip = zlib.createGzip();
            var inp = fs.createReadStream(tmpPath);
            var out = fs.createWriteStream(tmpPath+'.gz');
            inp.pipe(gzip).pipe(out);
            fileNameList.push(fileName + '.gz');
        }else{
            fileNameList.push(fileName);
        }
    });
    return fileNameList;
}
var fileNameList = getFileList(Lib.getOutDir());
var fileListLen = fileNameList.length;
//根据原始文件名获取带Hash的文件名。null为找不到该文件
function checkFileName(fileName,fileType){
    for(var i = 0;i<fileListLen;i++){
        var checkFile = fileNameList[i];
        var checkRe = new RegExp("^("+fileName+"(\\.[a-zA-Z0-9]{8})?"+'\\'+fileType+"(\\.gz)?"+")$");
        var isFile = checkRe.test(checkFile);
        if(isFile){
            return checkFile;
        }
    }
    return null;
}
function genHtmlFiles(path){
    Lib.walk(path,function(tmpPath){
        var fileType = tmpPath.split('.').pop();
        var fileName =tmpPath.split('/').pop().replace(/\.\w+$/,'');
        if(fileType !== 'html'){
            return false;
        }
        var data=fs.readFileSync(tmpPath,"utf-8");
        //检测是否已引入页面js,css和公共js,css
        if(data.indexOf('/' + fileName + '.entry.js') !== -1){
            throw fileName + ".html Don't need to introduce "+ fileName + '.entry.js !';
        }
        if(data.indexOf('/' + fileName + '.entry.js') !== -1){
            throw fileName + ".html Don't need to introduce "+ fileName + '.entry.css !';
        }
        if(data.indexOf('/common.js') !== -1){
            throw fileName + ".html Don't need to introduce common.js !";
        }
        if(data.indexOf('/common.css') !== -1){
            throw fileName + ".html Don't need to introduce common.css !";
        }
        //手动引入公共js,css,页面js,css
        var insStrCss = "";
        var commonCssPath = checkFileName('common','.css');
        if(commonCssPath){
            insStrCss += '    <link rel="stylesheet" type="text/css" href="../lib/'+commonCssPath+'">\n    ';
        }
        var entryCssPath = checkFileName(fileName + '.entry','.css');
        if(entryCssPath){
            insStrCss += '    <link rel="stylesheet" type="text/css" href="../css/'+entryCssPath+'">\n    ';
        }
        data = insStrIndex(data,'</head>',insStrCss,fileName);
        var insStrJs = "";
        var commonJsPath = checkFileName('common','.js');
        if(commonJsPath){
            insStrJs += '    <script type="text/javascript" src="../lib/'+commonJsPath+'"></script>\n    ';
        }
        var entryJsPath = checkFileName(fileName + '.entry','.js');
        if(entryJsPath){
            insStrJs += '    <script type="text/javascript" src="../js/'+entryJsPath+'"></script>\n    ';
        }
        data = insStrIndex(data,'</body>',insStrJs,fileName);
        var genHtmlPath = Lib.getOutDir('/html/'+fileName+'.html');
        fs.writeFileSync(genHtmlPath,data);
    });
}
//生成html文件
genHtmlFiles(Lib.getPath('src/'+Lib.getPackageType()));
