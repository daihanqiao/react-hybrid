/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 09:52:48
* 级联动选择器，支持一二三级联动，应用场景如省市区选择器
* 用法：
* var PopPicker = require("popPicker");
* var data = require('cityData');//数据参考src/general/common/js/cityData.js
* PopPicker.setData(data,3);//三级联动
* PopPicker.show(function(items){
* console.log(items);
* });
*/

'use strict';
window.mui = require('mui');
require('mui.picker');
require('mui.poppicker');
require('poppickerCss');
var picker = null;
module.exports = {
    setData:function(data,layer){
        var layer = layer || 3;
        if(!picker){
            picker = new window.mui.PopPicker({
    			layer: layer
    		});
        }
        picker.setData(data);
    },
    show:function(f_callBack){
        if(!picker){
            return;
        }
        picker.show(f_callBack);
    }
};
