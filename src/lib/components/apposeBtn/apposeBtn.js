/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:04:56
* 并排两个按钮
* 用法：<ApposeBtn s_leftLabel="确定" s_rightLabel="取消" f_leftClick={this._clickAppose} f_rightClick={this._clickAppose}/>
*/
'use strict';
require('apposeBtnCss');
var ApposeBtn = React.createClass({
	propTypes:{
        f_leftClick:React.PropTypes.func.isRequired,
        f_rightClick:React.PropTypes.func.isRequired,
        s_leftLabel:React.PropTypes.string.isRequired,
        s_rightLabel:React.PropTypes.string.isRequired,
	},
	render:function(){
		return (
			<div className="apposeBtn base-ovh base-mT20 base-pdLR10">
                <button type="button" className="base-fl base-btn-main leftBtn" onClick={this.props.f_leftClick}>
                    {this.props.s_leftLabel}
                </button>
                <button type="button" className="base-fl rightBtn" onClick={this.props.f_rightClick}>
                    {this.props.s_rightLabel}
                </button>
			</div>
		);
	}
});
module.exports = ApposeBtn;
