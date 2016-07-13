/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:29:44
* 折叠Item
* 使用方法：<FoldItem o_params={{"id":1}} f_callBack={self.f_hander} i_state = {1} s_title={'标题'} />
*/

'use strict';
require('foldItemCss');
var classSet = require('classnames');
var foldItem = React.createClass({
	propTypes : {
		s_title : React.PropTypes.string.isRequired,//标题
		i_state : React.PropTypes.number,//当前状态
		f_callBack : React.PropTypes.func,//展开回调
		o_params : React.PropTypes.object,//回调参数
	},
	f_clickHandler:function(){
		this.setState({b_isOpen:!this.state.b_isOpen,i_state:1});
		if(this.props.i_state === 0 && this.props.f_callBack){
			this.props.f_callBack(this.props.o_params);
		}
	},
	getInitialState:function(){
		return {b_isOpen:false,i_state:this.props.i_state};
	},
	render:function(){
		var s_classSet = classSet({"fold-group":true,"open":this.state.b_isOpen});
		var s_menuClassSet = classSet("base-after-line",{"fold-menu":true});
		var e_tips = (this.state.i_state === 0) ? (<i className="msg-tips"></i>) : "";
		return (
			<div className="foldItem">
				<div className={s_classSet}>
					<div className={s_menuClassSet} onClick={this.f_clickHandler}>
						{e_tips}
						<span className="msgTitle">{this.props.s_title}</span>
						<i className="base-iconUp"></i>
					</div>
					<div className="fold-conent base-after-line base-line-left">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});
module.exports = foldItem;
