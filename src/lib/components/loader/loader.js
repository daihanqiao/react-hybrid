/*
* @Author: daihanqiao
* @Date:   2015-12-05 23:12:33
* @Last Modified by:   daihanqiao
* @Last Modified time: 2016-01-07 12:00:48
* 加载loading
* 用法：Loader.show();
*/

'use strict';
require("loaderCss");
var Loading = require("loadingLogoImg");
var LoadingRotate = require("loadingImg");
//组件
var Loader = React.createClass({
	render: function() {
		return (
			<div className="loader">
				<div className='loader-bg'></div>
				<div className="loader-fixed">
				    <img className="fixedRotate" src={LoadingRotate} alt=""/>
				    <img className="fixedImg" src={Loading} alt=""/>
				</div>
			</div>
		);
	}
});
//对外接口
var e_loaderCon = null;
module.exports = {
	show:function(){
		if(!e_loaderCon){
			e_loaderCon = document.createElement('div');
			e_loaderCon.style.zIndex = 10000;
			e_loaderCon.style.position = "fixed";
			e_loaderCon.style.height = "100vh";
			document.body.appendChild(e_loaderCon);
			e_loaderCon.addEventListener('touchmove',function(e){
				e.stopPropagation();
				e.preventDefault();
				return false;
			});
			e_loaderCon.addEventListener('mousemove',function(e){
				e.stopPropagation();
				e.preventDefault();
				return false;
			});
		}
		ReactDOM.render(<Loader></Loader>,e_loaderCon);
	},
	hide:function(){
		if(e_loaderCon){
			ReactDOM.unmountComponentAtNode(e_loaderCon);
		}
	}
};
