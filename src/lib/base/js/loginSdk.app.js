/*
 * @Author: {daihanqiao}
 * @Date:   2015-12-25 16:40:55
 * @Last Modified by:   代汉桥
 * @Last Modified time: 2016-07-13 15:27:33
 * 登录SDK
 * 用法：
 * var LoginSdk = requrie(__LOGIN_SDK__);
 * LoginSdk.login(...);
 */

"use strict";
(function() {
	var loginSdk = {
        //登录参数，登录类型：1.微信
		login:function(o_params,i_type,f_callBack){
			i_type = i_type || 1;
            o_params = o_params || {};
            switch (i_type) {
                case 1:
                    var wx = api.require('wx');
                    wx.auth(o_params,function(ret,err){
                        if(ret.status){
                            f_callBack();
                        }else{
                            switch (err.code){
                                case 3:Com.toast('当前设备未安装微信客户端');break;
                            }
                        }
                    });
                break;
                default:break;
            }
		},
	};

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function(){
			return loginSdk;
		});
	} else if(typeof module !== 'undefined' && module.exports){
		module.exports = loginSdk;
	} else{
		window.LoginSdk = loginSdk;
	}
}());
