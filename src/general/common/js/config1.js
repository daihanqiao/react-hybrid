// @Author: daihanqiao
// @Date:   2016-01-18 15:12:24
// Copyright (c) 2016 by daihanqiao. All Rights Reserved.
//线上开发环境配置文件

"use strict";
;(function(){
    var config = {
        API_URL:"http://api.true.com/index.php?",//api地址
    };

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// AMD. Register as an anonymous module.
		define(function() {
			return config;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = config;
	} else {
		window.config = config;
	}
})();
