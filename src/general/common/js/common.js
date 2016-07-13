/*
* @Author: daihanqiao
* @Date:   2016-02-23 11:02:38
* Copyright (c) 2016 by daihanqiao. All Rights Reserved.
* JS通用库
*/

"use strict";
var Config = require(__CONFIG__);
//测试配置，为true使用testData.js中的数据
var TEST_DATA_CONFIG = true;
//请求
function _request(s_method , o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress ){
    function callBack(res){
        f_callBack && f_callBack(res);
    }
    if(TEST_DATA_CONFIG){
        var o_testData = require('testData');
        f_callBack(o_testData[o_param['act']]);
    }else{
        if(!o_param['act'] || ! o_param['op']){
            throw "未传入act或op";
        }
        var s_requesrUrl = Config.API_URL;
        Base.ajax(s_requesrUrl, o_param, callBack, b_isNoShowProgress, b_isNoHideProgress,s_method,function(err){
            console.log(err);
        });
    }
}
var o_com = {
    //post请求非校验接口
    postNormal:function(o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress) {
        o_param = o_param || {};
        //设置post非校验接口公共数据
        _request('post', o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress);
    },
    //get请求非校验接口
    getNormal:function(o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress) {
        o_param = o_param || {};
        //设置get非校验接口公共数据
        _request('get', o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress);
    },
    //post请求需校验身份的接口
    postVerify:function(o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress) {
        o_param = o_param || {};
        //设置post非校验接口公共数据
        _request('post', o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress);
    },
    //get请求需校验身份的接口
    getVerify:function(o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress) {
        o_param = o_param || {};
        //设置get非校验接口公共数据
        _request('get', o_param, f_callBack, b_isNoShowProgress, b_isNoHideProgress);
    }
};
var o_com = Base.spliceObj(o_com,Base);
//对外接口
module.exports = o_com;
