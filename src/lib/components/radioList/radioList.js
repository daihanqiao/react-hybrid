/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 10:08:28
* 单选列表,含：图片，文字，单选按钮
* 用法：<RadioList a_list={[{s_img:require('wxLogoImg'),s_label:"微信支付",b_default:true,s_value:"1"},{s_img:require('alipayLogoImg'),s_label:"支付宝",s_value:"2"}]}/>
*/

'use strict';
var Radio=require('radio');
require('radioListCss');
var RadioList = React.createClass({
    propTypes:{
        a_list:React.PropTypes.array.isRequired,//数据列表
	},
    s_value:'',
    getValue:function(){
        return this.s_value;
    },
    changeHandler:function(value){
        this.s_value = value;
    },
	render:function(){
        var self = this;
        var e_items = function(item,key){
            if(item.b_default){
                self.s_value = item.s_value;
            }
            return (<li className="base-after-line base-line-left" key={key}>
                        {item.s_img ? <img className="itemImg" src={item.s_img} alt=""/> : null}
                        <span className="itemLabel">{item.s_label}</span>
                        <Radio b_default={item.b_default} s_value={item.s_value} s_name={item.s_radioName || "RadioList"} f_changeHandler={self.changeHandler}/>
                    </li>);
        };
		return (
			<div className="radioList">
                <ul>
                    {this.props.a_list.map(e_items)}
                </ul>
            </div>
		);
	}
});module.exports = RadioList;
