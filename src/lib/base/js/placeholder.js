/*
 * @Author: {daihanqiao}
 * @Date:   2015-12-25 16:40:55
 * @Last Modified by:   代汉桥
 * @Last Modified time: 2016-07-12 09:44:54
 * 占位图
 */
'use strict';
var c,cc;
//缓存池
var o_cache = {};
function createCanvas(opts) {
	var newOpts = prepareOpts(opts);
	var s_flag = newOpts.flag;
	if(s_flag && o_cache[s_flag]){
		return o_cache[s_flag];
	}
	if (!c || !cc) {
		//如果不存在则实例化
		c = document.createElement('canvas');
		cc = c.getContext('2d');
	}
	var canvas_width = parseInt(newOpts.a[0]), canvas_height = parseInt(newOpts.a[1]);
	//图片大小
	c.width = canvas_width;
	c.height = canvas_height;
	cc.clearRect(0, 0, canvas_width, canvas_height); //清楚已有的画布
	//设置背景色
	cc.fillStyle = newOpts.c;
	cc.fillRect(0, 0, canvas_width, canvas_height);
	//字体颜色
	cc.fillStyle = newOpts.d;
	cc.font = newOpts.e + ' normal ' + newOpts.f + ' ' + (newOpts.g || 100) + 'px ' + newOpts.h;
	var scale = 1.0;
	if (newOpts.g === '') {
		//auto calculate size
		var width_limit = 0.7 * canvas_width,
			heigth_limit = 0.7 * canvas_height,
			text_width = cc.measureText(newOpts.b).width,
			text_height = 100;
		scale = Math.min(width_limit / text_width, heigth_limit / text_height);
	}
	//文字居中
	cc.translate(canvas_width / 2, canvas_height / 2);
	cc.scale(scale, scale);
	cc.textAlign = 'center';
	cc.textBaseline = 'middle';

	cc.fillText(newOpts.b, 0, 0);
	var s_data = c.toDataURL();
	if(s_flag){
		o_cache[s_flag] = s_data;
	}
	return s_data;
}

//随机颜色值
function randomColor() {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
//预处理配置信息，补全默认项
function prepareOpts(opts) {
	opts = opts || {};
	var size = opts.size || '100x100',
	text = opts.text || size,
	bgcolor = opts.bgcolor || "#999", //other placeholder default bgcolor is '#ccc',
	color = opts.color || "#3A7E65", //other placeholder default color is '#969696',
	//font参数
	fstyle = opts.fstyle || 'normal', //normal / italic / oblique
	fweight = opts.fweight || 'bold', //normal / bold / bolder / lighter
	fsize = opts.fsize || '', //auto calculate the font size to response to the image size
	ffamily = opts.ffamily || 'consolas', //规定字号和行高，以像素计。
	new_opts = {};

	size = size.split('x');
	if (size.length !== 2) {
		size = [128, 128];
	}
	new_opts.a = size;
	new_opts.b = text;
	new_opts.c = bgcolor;
	new_opts.d = color;
	new_opts.e = fstyle;
	new_opts.f = fweight;
	new_opts.g = fsize;
	new_opts.h = ffamily;
	new_opts.flag = opts.flag || "";
	opts = null;
	return new_opts;
}

//获取占位图
function getData(o_evtParams){
	var e_imgEl = o_evtParams.target;
	var o_params = e_imgEl.getAttribute('data-params');
	e_imgEl.src = createCanvas(JSON.parse(o_params));
}

module.exports = {
	getData:getData
};
