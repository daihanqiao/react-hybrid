/*
 * @Author: {daihanqiao}
 * @Date:   2015-12-25 16:40:55
 * @Last Modified by:   代汉桥
 * @Last Modified time: 2016-07-13 15:25:03
 * 登录SDK
 * 用法：
 * var LoginSdk = requrie(__LOGIN_SDK__);
 * LoginSdk.login(...);
 */

"use strict";
(function() {
	var loginSdk = {
        //分享参数，登录类型：1.微信
		share:function(o_params,i_type){
			i_type = i_type || 1;
            switch (i_type) {
                case 1:
                    console.log(o_params);
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
