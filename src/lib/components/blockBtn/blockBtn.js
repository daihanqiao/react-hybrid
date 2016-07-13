/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:07:11
* 块级按钮
* 用法：<BlockBtn s_label="块级按钮" onClick={this._click}/>
*/

'use strict';
var BlockBtn = React.createClass({
	propTypes:{
		onClick:React.PropTypes.func.isRequired,
		s_label:React.PropTypes.string.isRequired
	},
	render:function(){
		return (
			<div className="blockBtn base-mT20 base-pdLR10">
				<div onClick={this.props.onClick} className="base-btn base-btn-main" style={{display:"block"}}>
					{this.props.s_label}
				</div>
			</div>
		);
	}
});
module.exports = BlockBtn;
