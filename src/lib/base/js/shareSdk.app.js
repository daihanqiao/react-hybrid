/*
 * @Author: {daihanqiao}
 * @Date:   2015-12-25 16:40:55
 * @Last Modified by:   代汉桥
 * @Last Modified time: 2016-07-13 15:30:14
 * 分享SDK
 * 用法：
 * var ShareSdk = requrie(__SHARE_SDK__);
 * ShareSdk.share(...);
 */

"use strict";
(function() {
	function f_wxShareCallBack(ret, err){
		if(ret.status){
			Com.toast('分享成功');
		}else{
			switch (err.code){
				case 6:Com.toast('当前设备未安装微信客户端');break;
				case 1:Com.toast('分享失败，请重新尝试');break;
				//case 2:Com.toast('已取消分享');break;
				case 3:Com.toast('发送失败，请重新尝试');break;
				//case 4:Com.toast('拒绝授权，请确认是否登录');break;
				//case 5:Com.toast('版本不支持');break;
				//default:Com.toast(err.msg);break;
			}
		}
	}
	var shareSdk = {
        //分享参数，分享类型：1.微信
		share:function(o_params,i_type){
			i_type = i_type || 1;
            switch (i_type) {
                case 1:
                    var wx = api.require('wx');
                    switch (o_params.i_shareType) {
                    	case 1://分享图片
							Base.download(o_params.s_contentUrl,function(s_savePath){
								wx.shareImage({
									scene: o_params.s_scene || "timeline",//可选，默认为：timeline（朋友圈）
									thumb: o_params.s_thumb,//缩略图片的地址，支持 fs://，widget:// 协议。大小不能超过32K，若 contentUrl 为本地图片地址则本参数忽略,需要路径包含图片格式后缀，否则如果原图片为非png格式，会分享失败
									contentUrl: s_savePath,//分享图片的 url 地址（支持 fs://、widget:// 和网络路径），长度不能超过10k，若为网络图片仅当 scene 为 session 时有效，若为本地图片大小不能超过10M
								}, f_wxShareCallBack);
							});
                    		break;
						case 2://分享图文
							Base.download(o_params.s_thumb,function(s_savePath){
								wx.shareWebpage({
									scene: o_params.s_scene || 'timeline',
									title: o_params.s_title,//分享的标题
									description: o_params.s_description,//分享内容描述
									thumb: s_savePath,//要求本地路径（fs://，widget://）大小不能超过32K,需要路径包含图片格式后缀
									contentUrl: o_params.s_contentUrl//分享网页的 url 地址
								}, f_wxShareCallBack);
							});
						break;
                    	default:break;
                    }
                break;
                default:break;
            }
		},
	};

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function(){
			return shareSdk;
		});
	} else if(typeof module !== 'undefined' && module.exports){
		module.exports = shareSdk;
	} else{
		window.ShareSdk = shareSdk;
	}
}());
