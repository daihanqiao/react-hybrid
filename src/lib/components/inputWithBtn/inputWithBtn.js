/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:32:29
* 左侧带标题，右侧带按钮的输入框
* 用法：
* <InputWithBtn s_left="姓名" s_right="代汉桥" s_btnTxt="发送" f_rightClick={this._sendMsg}/>
*/

'use strict';
require('inputWithBtnCss');
var classSet = require('classnames');
var LabelInput = React.createClass({
    propTypes : {
        s_left:React.PropTypes.string,//左label
        s_right:React.PropTypes.string,//右label
        s_inputType:React.PropTypes.string,//输入类型，默认text
        s_btnTxt:React.PropTypes.string.isRequired,//按钮文本
        f_rightClick:React.PropTypes.func.isRequired,//右侧点击
        b_line:React.PropTypes.bool,//是否有线，默认无
        onChange:React.PropTypes.func,//输入文本改变
        b_disabled:React.PropTypes.bool,//按钮是否禁用
        o_params:React.PropTypes.object,//点击回调参数
	},
    getDefaultProps:function(){
        return {s_inputType:"text"};
    },
    componentDidMount:function(){
        this.getValue = function(){
            return this.refs.inputRef ? this.refs.inputRef.value : "";
        };
        this.setValue = function(s_value){
            if(this.refs.inputRef){
                this.refs.inputRef.value = s_value || "";
            }
        };
        if(this.props.s_inputType.toLowerCase() === "number"){
            this.refs.inputRef.setSelectionRange = null;
        }
    },
    onChangeHandler:function(){
        if(this.props.onChange){
            this.props.onChange(this.getValue());
        }
    },
    getInitialState : function(){
        return {
            s_btnTxt:this.props.s_btnTxt,
            b_disabled:this.props.b_disabled,
        };
    },
    render:function(){
        var s_classSet = "";
        var s_right = this.props.s_right;
        s_classSet = classSet("labelBtn",{"base-after-line":this.props.b_line});
        var e_btnEl = this.state.b_disabled ? <input type="button" onClick={this.props.f_rightClick} disabled value={this.state.s_btnTxt}/> :<input type="button" onClick={this.props.f_rightClick} value={this.state.s_btnTxt}/>;
        return (
            <div className="inputWithBtn">
                <div className={s_classSet}>
                    <label>{this.props.s_left}</label>
                    <input onChange={this.onChangeHandler} ref="inputRef" type={this.props.s_inputType} placeholder={s_right} />
                    {e_btnEl}
                </div>
            </div>
        );
    }
});
module.exports = LabelInput;
