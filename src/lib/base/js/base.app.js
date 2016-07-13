/*
* @Author: daihanqiao
* @Date:   2016-02-23 11:02:38
* Copyright (c) 2016 by daihanqiao. All Rights Reserved.
* JS基础库，APP端使用
*/
"use strict";
require('normalizeCss');
require('baseCss');
var Notie = require('notie');
var Storage = require('storage');
require('flexible');
var o_base = {
    //是否为APP
    isApp:true,
    //ready方法
    ready:function(f_callback){
        window['apiready'] = function(){
            f_callback();
            //消除300毫秒延迟
            var FastClick = require('fastclick');
            FastClick.attach(document.body);
            // api.setStatusBarStyle({color:"#000"});
        };
    },
    //组装className,可针对不同平台生成不同class name
    genDiffCls:function(s_cls){
        return s_cls + ' base-app';
    },
    //是否需要设置沉浸式
    isNeedImmerse:function(){
        var i_strDM = this.getSysType();
        var n_ver = parseFloat(api.systemVersion) || 0;
        var b_fullScreen = api.fullScreen;
        var b_isNeedImmerse = false;
        if (i_strDM === this.ENUM_SYS_IOS) {
            if (n_ver >= 7 && !b_fullScreen) {
                b_isNeedImmerse = true;
            }
        }/*else if(i_strDM === this.ENUM_SYS_ANDROID){
            if(n_ver >= 5 && !b_fullScreen){
                b_isNeedImmerse = true;
            }
        }*/
        return b_isNeedImmerse;
    },
    //设置沉浸式
    setImmerseBar: function(s_selector,n_paddingTop,i_type){
        if(!document.querySelector(s_selector)){
            return;
        }
        n_paddingTop = n_paddingTop || 20;
        i_type = i_type || 0;
        var b_isNeedImmerse = this.isNeedImmerse();
        /************************如果安卓需要，可以考虑加上边框20********************/
        if(b_isNeedImmerse){
            if(i_type === 0){
                document.querySelector(s_selector).style.paddingTop = n_paddingTop + 'px';
            }else{
                document.querySelector(s_selector).style.marginTop = n_paddingTop + 'px';
            }
        }
    },
    //显示确认弹窗
    confirm:function(s_msg,f_callback){
        api.confirm({msg: s_msg,buttons: ['确定', '取消']},function( ret, err ){
            if(ret && ret.buttonIndex === 1 && f_callback){
                 f_callback();
            }
        });
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
        s_title = s_title || '努力加载中...';
        s_msg = s_msg || '先喝杯茶...';
        api.showProgress({style: 'default',animationType:'fade',title: s_title,text: s_msg,modal: true});
    },
    //隐藏loading
    hideProgress:function(){
        api.hideProgress();
    },
    //显示toast
    toast:function(s_msg,f_callBack,i_type,n_seconds){
        // api.toast({msg: s_msg,duration:2000,location: 'middle'});
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
        api.ajax({
            url: s_requestUrl,
            method: s_method,
            cache: false,
            timeout: 30,
            data: {
                values: o_param
            }
        }, function (ret, err) {
            if(ret){
                if(f_callBack){
                    f_callBack(ret);
                }
                if(!b_isNoHideProgress){
                    self.hideProgress();
                }
            }else{
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
        return !s_keyStr ? api.pageParam : api.pageParam[s_keyStr];
    },
    //获取页面名称
    getPageName:function(){
        return api.winName;
    },
    //打开页面
    openWin:function(s_name,o_pageParam,o_winParams){
        o_pageParam = o_pageParam?o_pageParam:{};
        o_winParams = o_winParams?o_winParams:{};
        o_winParams['name'] = s_name;
        o_winParams['url'] = "./"+s_name+".html";
        o_winParams['pageParam'] = o_pageParam;
        o_winParams['hScrollBarEnabled'] = false;
        o_winParams['vScrollBarEnabled'] = false;
        api.openWin(o_winParams);
    },
    //关闭页面
    closeWin:function(s_winName){
        if(s_winName){
            api.closeWin({name:s_winName});
        }else{
            api.closeWin();
        }
    },
    //发送事件
    sendEvt:function(s_name,o_params){
        api.sendEvent({
            name: s_name,
            extra: o_params
        });
    },
    //侦听事件
    addEvt:function(s_name,f_callBack){
        api.addEventListener({
            name: s_name
        }, function( ret, err ){
            var u_result = (ret && ret.value) ? ret.value : {};
            f_callBack(u_result);
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
        var s_str = api.deviceId;
        if(!s_str){
            s_str = Storage.get('userDeviceId');
            if(!s_str){
                var s_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
                var i_maxPos = s_chars.length;
                s_str = '';
                for (var i = 0; i < 16; i++) {
                    s_str += s_chars.charAt(Math.floor(Math.random() * i_maxPos));
                }
                Storage.set('userDeviceId',s_str);
            }
        }
        return api.deviceId;
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
    //下载文件
    download:function(s_path,f_callback){
        api.download({
            url: s_path,
            report: true,
            cache: true,
            allowResume: true
        },function( ret, err ){
            if(ret.state === 1){
                f_callback(ret.savePath);
            }
        });
    },
    //保存图片视频到本地，为本地图时可直接保存，网络图需要download再保存
    saveMediaToAlbum:function(s_path,f_callBack,b_isLocalImg){
        var self = this;
        function saveMedia(s_savePath){
            api.saveMediaToAlbum({path: s_savePath}, function(ret, err){
                if(ret && ret.status && f_callBack){
                     f_callBack();
                }
            });
        }
        if(b_isLocalImg){
            saveMedia(s_path);
        }else{
            self.download(s_path,function(s_savePath){
                saveMedia(s_savePath);
            });
        }
    },
    //获取APP版本
    getAppVersion:function(){
        return api.appVersion;
    },
    //通过系统相册或拍照获取图片
    getPicture:function(s_sourceType,f_callback){
        s_sourceType = s_sourceType || "library";
        api.getPicture({
            sourceType: s_sourceType,
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'base64',
            allowEdit: true,
            quality: 50,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false
        }, function( ret, err ){
            if( ret ){
                f_callback(ret);
            }else{
                // alert( JSON.stringify( err ) );
            }
        });
    },
    getFNScanner:function(){
        if(!this.FNScanner){
            this.FNScanner = api.require('FNScanner');
        }
        return this.FNScanner;
    },
    //生成二维码
    genQrCode:function(s_url,f_callBack){
        var FNScanner = this.getFNScanner();
        FNScanner.encodeImg({
            content: s_url,
            saveToAlbum: false,
            saveImg: {
                path: "fs://" + encodeURIComponent(s_url.replace(/[http|\.|\/|\:|\=|\?|\&]/g,"")) + '.jpg',
                w: 200,
                h: 200
            }
        },function( ret, err ){
            if(ret.status){
                f_callBack(ret.imgPath);
            }
        });
    },
    //打开扫描仪
    openScanner:function(f_callBack){
        var FNScanner = this.getFNScanner();
        FNScanner.openScanner({
            autorotation: false,
        },function( ret, err ){
            if( ret.eventType === "success" ){
                f_callBack(ret);
            }
        });
    },
    openScannerView:function(f_callBack){
        var self = this;
        var FNScanner = this.getFNScanner();
        FNScanner.openView({
            rect: {
                x: 20,   //（可选项）数字类型；模块左上角的 x 坐标（相对于所属的 Window 或 Frame）；默认：0
                y: self.isNeedImmerse() ? 84 : 64,   //（可选项）数字类型；模块左上角的 y 坐标（相对于所属的 Window 或 Frame）；默认：0
                w:api.winWidth - 40, //（可选项）数字类型；模块的宽度；默认：所属的 Window 或 Frame 的宽度
                h: api.winWidth - 40   //（可选项）数字类型；模块的高度；默认：所属的 Window 或 Frame 的高度
            }
        },function( ret, err ){
            if( ret.eventType === "success" ){
                f_callBack(ret);
            }
        });
    },
    //打开手机上其他应用
    openApp:function(s_iosUrl,androidPkg,o_appParam,s_uri){
        o_appParam = o_appParam || {};
        s_uri = s_uri || "";
        if(this.getSysType() === this.ENUM_SYS_IOS){
            api.openApp({
                iosUrl: s_iosUrl,
                appParam: o_appParam
            });
        }else{
            api.openApp({
                androidPkg: androidPkg,
                mimeType: 'text/html',
                uri: s_uri
            },function( ret, err ){});
        }
    },
    //复制内容
    setClipBoard:function(s_content){
        var self = this;
        var obj = api.require('clipBoard');
        obj.set({
            value: s_content
        }, function(ret, err){
            if(ret.status){
                self.toast("复制到剪切板成功");
            }
        });
    },
    //格式化数字，比如：0->0.00
    getNumFormat:function(n_num,i_len){
        n_num = parseFloat(n_num) || 0;
        i_len = i_len || 2;
        return n_num.toFixed(i_len);
    },
    //格式化时间日期,s_time:秒数,i_type:0,输出年月日,1.输出时分秒,2.全部输出
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
        if(api.systemType === "android"){
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
        api.call({
            type: 'tel_prompt',
            number: mobile
        });
    },
    //设置拨打电话组件
    setCallEl:function(el,mobile){
        var self = this;
        function callPhone(){
            self.call(mobile);
        }
        return  <a onClick={callPhone}>
            {el}
        </a>;
    },
    //设置窗口属性
    setWinAttr:function(o_params){
        api.setWinAttr(o_params);
    },
    //取消物理返回键
    setBackDisable:function(){
        if(this.getSysType() === this.ENUM_SYS_ANDROID){
            this.addEvt("keyback",function(){
                return false;
            });
        }else {
            this.setWinAttr({slidBackEnabled:false});
        }
    },
    //打开系统通讯录选择联系人
    openContacts:function(f_callBack){
        api.openContacts(function( ret, err ){
            if(ret.status ===true){
                f_callBack(ret.name,ret.phone);
            }else {
                Com.toast(err.msg);
            }
        });
    }
};
//对外接口
module.exports = o_base;
