/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:04:51
* 上浮并排两个按钮
* 用法：<ApposeFixedBtn s_leftLabel="fixed确定" s_rightLabel="fixed取消" f_leftClick={this._clickAppose} f_rightClick={this._clickAppose}/>
*/

'use strict';
require('apposeBtnCss');
var FixedBtn = React.createClass({
    propTypes:{
        f_leftClick:React.PropTypes.func.isRequired,
        f_rightClick:React.PropTypes.func.isRequired,
        s_leftLabel:React.PropTypes.string.isRequired,
        s_rightLabel:React.PropTypes.string.isRequired,
	},
	render:function(){
		return (
			<div className="fixedBtn base-fixed base-pdLR10">
                <button onClick={this.props.f_leftClick} type="button" className="leftBtn base-fl base-btn-main">
                    {this.props.s_leftLabel}
                </button>
                <button onClick={this.props.f_rightClick} type="button" className="rightBtn base-fl">
                    {this.props.s_rightLabel}
                </button>
			</div>
		);
	}
});
module.exports = FixedBtn;
