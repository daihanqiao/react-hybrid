/*
* @Author: daihanqiao
* @Date:   2016-02-23 11:02:38
* Copyright (c) 2016 by daihanqiao. All Rights Reserved.
* JS基础库，wap端使用
*/

"use strict";
require('normalizeCss');
require('baseCss');
var Storage = require('storage');
var Loader = require('loader');
var Notie = require('notie');
var reqwest = require('reqwest');
var Pubsub = require('pubsub-js');
require('flexible');
var o_base = {
    //是否为APP
    isApp:false,
    //ready方法
    ready:function(f_callback){
        var callFunc = function(){
            var FastClick = require('fastclick');
            FastClick.attach(document.body);
            f_callback();
        };
        var r_readyRE = /complete|loaded|interactive/;
        if (r_readyRE.test(document.readyState)) {
            callFunc();
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                callFunc();
            }, false);
        }
    },
    //组装className,可针对不同平台生成不同class name
    genDiffCls:function(s_cls){
        if(this.getBrowserType()  === this.ENUM_BROWSER_WX){
            return s_cls + ' base-weixin';
        }
        return s_cls;
    },
    //是否需要设置沉浸式
    isNeedImmerse:function(){
        return false;
    },
    //设置沉浸式
    setImmerseBar: function(s_selector,n_paddingTop,i_type){
        return false;
    },
    //显示确认弹窗
    confirm:function(s_msg,f_callback){
        if (confirm(s_msg) === true){
            if(f_callback){
                f_callback();
            }
        }
    },
    //显示输入弹窗
    inputNotie:function(s_title,s_placeholder,f_okHandler,s_okLabel,s_cancelLabel){
        s_okLabel = s_okLabel || "确定";
        s_cancelLabel = s_cancelLabel || "取消";
        Notie.input(s_title, s_okLabel, s_cancelLabel, '', s_placeholder, f_okHandler);
        this.setImmerseBar("#notie-input-outer");
    },
    //显示loading
    showProgress:function(s_title,s_msg){
        Loader.show();
    },
    //隐藏loading
    hideProgress:function(){
        Loader.hide();
    },
    //显示toast
    toast:function(s_msg,f_callBack,i_type,n_seconds){
        i_type = i_type || 3;
        n_seconds = n_seconds || 3;
        Notie.alert(i_type,s_msg,n_seconds);
        if(f_callBack){
            setTimeout(f_callBack,n_seconds*1000);
        }
    },
    //ajax
    ajax:function(s_requestUrl,o_param,f_callBack,b_isNoShowProgress,b_isNoHideProgress,s_method,f_errorCallBack){
        s_method = s_method || "POST";
        var self = this;
        if(!b_isNoShowProgress){
            self.showProgress();
        }
        reqwest({
            withCredentials: true,
            crossOrigin: true,
            url: s_requestUrl,
            method: s_method,
            data: o_param,
            type: 'json',
            timeout: 30000,
            success: function(res) {
                if(__DEBUG__){
                    console.log(res);
                }
                if(f_callBack){
                    f_callBack(res);
                }
                if(!b_isNoHideProgress){
                    self.hideProgress();
                }
            },
            error: function(err) {
                if(f_errorCallBack){
                    f_errorCallBack(err);
                }
                if(!b_isNoHideProgress){
                    self.hideProgress();
                }
            }
        });
    },
    //获取页面传来的参数
    getPageParams:function(s_keyStr){
        var s_url = window.document.location.href;
        var s_str = s_url.split("?")[1];
        if(typeof(s_str) === 'undefined'){
            return {};
        }
        var a_items = s_str.split("&");
        var o_result = {};
        var a_arr;
        for(var i in a_items){
            if(a_items.hasOwnProperty(i)){
                a_arr = a_items[i].split("=");
                if(s_keyStr && s_keyStr === a_arr[0]){
                    return unescape(a_arr[1]);
                }else{
                    o_result[a_arr[0]] = unescape(a_arr[1]);
                }
            }
        }
        return o_result;
    },
    //获取页面名称
    getPageName:function(){
        var a_page = window.document.location.href.match(/(\/)([a-zA-Z0-9_]+)(\.)/);
        return a_page[2];
    },
    //打开页面
    openWin:function(s_name,o_pageParam,o_winParams){
        if(!s_name){
            return;
        }
        if(s_name.indexOf('http://') === -1){
            s_name = './'+s_name+'.html';
        }
        var s_urlParam = "";
        for (var s_key in o_pageParam) {
            if (o_pageParam.hasOwnProperty(s_key)) {
                var value = o_pageParam[s_key];
                s_urlParam += (s_key+"="+escape(value)+"&");
            }
        }
        s_urlParam = s_urlParam.replace(/&$/,"");
        s_name = s_urlParam?(s_name+"?"+s_urlParam):s_name;
        window.location.href = s_name;
    },
    //关闭页面
    closeWin:function(s_winName){
        window.history.go(-1);
    },
    //发送事件
    sendEvt:function(s_name,o_params){
        Pubsub.publish(s_name,o_params);
    },
    //侦听事件
    addEvt:function(s_name,f_callBack){
        Pubsub.subscribe(s_name,function(evt,data){
            f_callBack(data);
        });
    },
    //获取本地数据
    getLocalData:function(s_storageName,s_key){
        var o_data = Storage.get(s_storageName);
        return (o_data && s_key) ? o_data[s_key] : o_data;
    },
    //设置本地数据
    setLocalData:function(s_storageName,u_value,s_key){
        var o_data = Storage.get(s_storageName);
        if(s_key){
            o_data = o_data || {};
            o_data[s_key] = u_value;
        }else{
            o_data = u_value;
        }
        Storage.set(s_storageName,o_data);
    },
    //清除本地数据
    removeLocalData:function(s_storageName){
        Storage.remove(s_storageName);
    },
    //获取设备ID
    getDeviceId:function(){
        var s_str = Storage.get('userDeviceId');
        if(!s_str){
            var s_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
            var i_maxPos = s_chars.length;
            s_str = '';
            for (var i = 0; i < 16; i++) {
                s_str += s_chars.charAt(Math.floor(Math.random() * i_maxPos));
            }
            Storage.set('userDeviceId',s_str);
        }
        return s_str;
    },
    //校验手机号
    checkMobile: function(i_mobileNum){
        var re = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
        return re.test(i_mobileNum);
    },
    //隐藏手机号
    hideMobile: function(i_mobileNum){
        return i_mobileNum.toString().replace(/(^\d{3})(\d){7}(\d{1}$)/,'$1*******$3');
    },
    download:function(s_path,f_callback){
        return false;
    },
    //保存图片视频到本地
    saveMediaToAlbum:function(s_path,f_callBack){
        return false;
    },
    //获取APP版本
    getAppVersion:function(){
        return "1.0.0";
    },
    //通过系统相册或拍照获取图片
    getPicture:function(s_sourceType,f_callback){
        return false;
    },
    getFNScanner : function(){
        return {closeView:function(){}};
    },
    //生成二维码
    genQrCode:function(s_url,f_callBack){
        return false;
    },
    //打开扫描仪
    openScanner:function(f_callBack){
        return false;
    },
    openScannerView:function(f_callBack){
        return false;
    },
    //打开手机上其他应用
    openApp:function(s_iosUrl,androidPkg,o_appParam,s_uri){
        return false;
    },
    //复制内容
    setClipBoard:function(s_content){
        return false;
    },
    //格式化数字，比如：0->0.00
    getNumFormat:function(n_num,i_len){
        n_num = parseFloat(n_num) || 0;
        i_len = i_len || 2;
        return n_num.toFixed(i_len);
    },
    //格式化时间日期,time:秒数,type:0,输出年月日,1.输出时分秒,2.全部输出
    getTimeFormat:function(s_time,i_type){
        s_time = s_time ? new Date(parseInt(s_time)*1000) : new Date();
        i_type = i_type || 0;
        var a_YMDList = [s_time.getFullYear(),s_time.getMonth()+1,s_time.getDate()];
        var a_HMSList = [s_time.getHours(),s_time.getMinutes(),s_time.getSeconds()];
        a_YMDList.map(function(value,index){
            a_YMDList[index] = value.toString().replace(/(^\d{1}$)/,"0"+"$1");
        });
        a_HMSList.map(function(value,index){
            a_HMSList[index] = value.toString().replace(/(^\d{1}$)/,"0"+"$1");
        });
        if(i_type === 0){
            return a_YMDList.join('-');
        }else if(i_type === 1){
            return a_HMSList.join(':');
        }else{
            return a_YMDList.join('-') + " "+ a_HMSList.join(':');
        }
        return a_YMDList.join('-');
    },
    //拼接object
    spliceObj:function(o_a,o_b){
        for (var variable in o_b) {
            if (o_b.hasOwnProperty(variable)) {
                o_a[variable] = o_b[variable];
            }
        }
        return o_a;
    },
    //截取字符串长度,超出部分显示...，一个中文算两个字符
    getSpliceStr:function(s_str,i_len){
        s_str = s_str || "";
        if(i_len >= s_str.replace(/[^\x00-\xff]/g, 'xx').length){
            return s_str;
        }
        var s_newStr='',i_newLen = 0,i_index = 0,i_charCode = 0;
        while (i_newLen<i_len){
            s_newStr += s_str[i_index];
            i_charCode = s_str.charCodeAt(i_index);
            i_newLen += (i_charCode >= 0 && i_charCode <= 128)? 1 : 2;
            i_index++;
        }
        return s_newStr + '...';
    },
    //枚举：安卓系统
    ENUM_SYS_ANDROID:0,
    //枚举：IOS系统
    ENUM_SYS_IOS:1,
    //获取系统类型：安卓为0，其他为1
    getSysType: function () {
        if((/android/gi).test(navigator.appVersion)){
            return this.ENUM_SYS_ANDROID;
        }
        return this.ENUM_SYS_IOS;
    },
    //枚举：PC端浏览器
    ENUM_BROWSER_PC:0,
    //枚举：微信浏览器
    ENUM_BROWSER_WX:1,
    //获取浏览器类型：0:PC端，1:微信浏览器
    getBrowserType: function (){
        var ua = window.navigator.userAgent.toLowerCase();
        var browserList = ['','micromessenger','qq','ucbrowser','safari'];
        if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
            for (var i = 0; i < browserList.length; i++) {
                if(browserList[i] && (ua.indexOf(browserList[i]) !== -1)){
                    return i;
                }
            }
        }
        return 0;
    },
    //获取屏幕宽
    getScreenWidth:function(){
        if(this.getSysType() === this.ENUM_SYS_ANDROID){
            return document.body.clientWidth;
        }
        return window.screen.availWidth;
    },
    //拨打电话
    call:function(mobile){
        return false;
    },
    //拨打电话
    setCallEl:function(el,mobile){
        return  <a href={"tel:"+mobile}>
            {el}
        </a>;
    },
    //设置窗口属性
    setWinAttr:function(o_params){
        return false;
    },
    //取消物理返回
    setBackDisable:function(){
        return false;
    },
    //打开系统通讯录选择联系人
    openContacts:function(f_callBack){
        f_callBack("","");
    }
};
//对外接口
module.exports = o_base;
