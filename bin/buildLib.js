// @Author: daihanqiao
// @Date:   2016-04-22 11:18:14
// Copyright (c) 2016 by daihanqiao. All Rights Reserved.
// 脚本公共库
'use strict';
var path = require('path');
var fs = require('fs');
//参数0
var param0 = JSON.parse(process.env.npm_config_argv).remain[0] || "";
//参数1
var param1 = JSON.parse(process.env.npm_config_argv).remain[1] || "";
//是否为数字的正则
var numRe = new RegExp(/^(\d+)$/);
var com = {
    //是否为发布版
    isRelease:(process.env.NODE_ENV === 'release'),
    //是否为APP
    isApp:(parseInt(process.env.NODE_APP) === 1),
    //是否开启gzip
    isOpenGzip:(parseInt(process.env.NODE_GZIP) === 1),
    //获取绝对路径
    getPath:function(url){
        return path.resolve('./', url);
    },
    //获取命令参数，数字则为打对应config
    getConfigType:function(){
        if(numRe.test(param0)){
            return parseInt(param0);
        }
        return 0;
    },
    //获取打包类型
    getPackageType:function(){
        return "page";
    },
    //获取输入目录
    getOutDir:function(afterUrl){
        var dir = "dev";
        if(this.isRelease){
            if(this.isApp){
                dir = 'release_app';
            }else{
                dir = 'release' + this.getConfigType();
            }
        }
        if(afterUrl){
            dir += afterUrl;
        }
        return this.getPath(dir);
    },
    //遍历文件
    walk:function(path, handleFile){
        var self = this;
        self.files = fs.readdirSync(path);
        self.files.forEach(function(item) {
            var tmpPath = path + '/' + item;
            var stats = fs.statSync(tmpPath);
            if (stats.isDirectory()) {
                if(item === '.svn'){
                    return false;
                }
                self.walk(tmpPath,handleFile);
            } else {
                handleFile(tmpPath,stats);
            }
        });
    }
};
module.exports = com;
