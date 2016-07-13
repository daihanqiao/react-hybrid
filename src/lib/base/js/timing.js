/*
 * @Author: {daihanqiao}
 * @Date:   2015-12-25 16:40:55
 * @Last Modified by:   代汉桥
 * @Last Modified time: 2016-07-13 15:33:41
 * 计时器工具
 * 用法：
 * var Timing = require('timing');
 * Timing.start(10,function(value){
 * console.log(value
 * )},1);
 */
"use strict";
(function() {
    var i_interval = null;
    var i_curTime = 0;
    var timing = {
        //i_totalTime：总时间，f_callBack：执行回调，i_intervalTime：间隔时间，b_promptCall：立即执行回调函数
        start:function(i_totalTime,f_callBack,i_intervalTime,b_promptCall){
            i_intervalTime = i_intervalTime || 1;
            i_intervalTime = i_intervalTime * 1000;
            i_totalTime = i_totalTime || 0;
            i_totalTime = i_totalTime * 1000;
            i_curTime = 0;
            if(b_promptCall){
                f_callBack((i_totalTime - i_curTime)/1000);
            }
            i_interval = window.setInterval(function(){
                i_curTime += i_intervalTime;
                if(i_totalTime >= i_curTime){
                    f_callBack((i_totalTime - i_curTime)/1000);
                }else{
                    if(i_interval){
                        window.clearInterval(i_interval);
                    }
                }
            },i_intervalTime);
        },
        stop:function(f_callBack){
            if(i_interval){
                window.clearInterval(i_interval);
            }
            if(f_callBack){
                f_callBack();
            }
        }
    };

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function(){
            return timing;
        });
    } else if(typeof module !== 'undefined' && module.exports){
        module.exports = timing;
    } else{
        window.Timing = timing;
    }
}());
