"use strict";
var fs = require('fs');
var path = require('path');
var a_remain = JSON.parse(process.env.npm_config_argv).remain;
var pageDir = process.env.NODE_PAGE;
var pageName =  a_remain[0];
var s_title = a_remain[1];
var b_haveCss = (a_remain[2] && a_remain[2] === "css");
var s_requireCss = "";
if(b_haveCss){
    s_requireCss = '\n    require(\"'+pageName+'Css\");';
}
//生成绝对路径
var getPath = function(url) {
    return path.resolve('./', url);
};
if(!pageName){
    throw "必须输入新目录名字";
}
if(!s_title){
    throw "必须输入页面标题";
}
var pageSrc = getPath("./src/"+pageDir+"/"+pageName);
var s_jsData = '\'use strict\';' +
    '\nCom.ready(function(){' +
    '\n    var TopBar = require(\'topBar\');' +
    '\n    TopBar.create(\"'+s_title+'\");' +
    s_requireCss +
    '\n    //页面组件' +
    '\n    var PageEl = React.createClass({' +
    '\n        render:function(){' +
    '\n            return (' +
    '\n                <div className="'+pageName+'">' +
    '\n                </div>' +
    '\n             );' +
    '\n        }' +
    '\n    });' +
    '\n    //请求数据' +
    '\n    Com.getNormal({act:"'+pageName+'",op:"'+pageName+'"},function(res){' +
    '\n        if(res.code === 0){' +
    '\n            ReactDOM.render(<PageEl data={res.data}/>,document.getElementById(\'pageCon\'));' +
    '\n        }else{' +
    '\n            Com.toast(res.msg);' +
    '\n        }' +
    '\n    });' +
    '\n});';
var s_htmlData = '<!DOCTYPE html>' +
    '\n<html lang="en">' +
    '\n<head>' +
    '\n    <meta charset="UTF-8">' +
    '\n    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">' +
    '\n    <meta name="apple-mobile-web-app-capable" content="yes"/>' +
    '\n    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />' +
    '\n    <title>'+s_title+'</title>' +
    '\n</head>' +
    '\n<body>' +
    '\n    <div class="base-container" id="pageCon"></div>' +
    '\n</body>' +
    '\n</html>';
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function(dst){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            throw "该目录已存在，请重命名-------";
        }else{
            fs.mkdir( dst, function(){
                var js_dst,html_dst;
                js_dst = dst + '/' + pageName + ".entry.js";
                html_dst = dst + '/' + pageName + ".html";
                fs.writeFileSync(js_dst,s_jsData);
                fs.writeFileSync(html_dst,s_htmlData);
                if(b_haveCss){
                    var css_dst = dst + '/' + pageName + ".scss";
                    fs.writeFileSync(css_dst,'@import "../../lib/base/css/globalStyle";\n.'+pageName+'{\n}');
                }
            });
        }
    });
};
exists(pageSrc);
