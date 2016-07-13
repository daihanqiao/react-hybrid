//测试数据，键名与页面名一致
'use strict';
// var Mock = require('mockjs');

function genData(o_data){
	console.log(o_data);
    return {code:0,msg:'',data:o_data};
}

var o_testData = {
    "example":genData({a:1}),
};
module.exports = o_testData;
