/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-12 17:47:08
* 文本组件，支持左侧带标题，右侧带箭头
* 用法：
* <LabelInput s_left="姓名：" s_right="代汉桥" b_after={true} b_line={true}/>
* <LabelInput s_left="姓名：" s_right="代汉桥" b_after={true} b_line={true}/>
* <LabelInput s_left="姓名：" s_right="请输入姓名" b_isInput={true} b_line={true}/>
* <LabelInput s_left="姓名：" s_right="请输入姓名" b_isInput={true} b_line={true}/>
*/

'use strict';
require('labelInputCss');
var classSet = require('classnames');
var LabelInput = React.createClass({
    propTypes : {
        s_left:React.PropTypes.string,//左label
        s_right:React.PropTypes.string,//右label
        b_isInput:React.PropTypes.bool,//是否为输入框
        s_inputType:React.PropTypes.string,//输入类型，默认text
        f_rightClick:React.PropTypes.func,//右侧点击
        b_after:React.PropTypes.bool,//是否有右箭头，默认无
        b_line:React.PropTypes.bool,//是否有线，默认无
        onClick:React.PropTypes.func,//label点击
        onChange:React.PropTypes.func,//输入文本改变
        b_right:React.PropTypes.bool,//是否靠右显示
        s_rightImg:React.PropTypes.string,//是否有右侧图片
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
            if(this.refs.rightEl){
                this.refs.rightEl.innerText = s_value || "";
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
    onClickHandler:function() {
        if(this.props.onClick){
            this.props.onClick(this.props.o_params);
        }
    },
    render:function(){
        var b_isInput = this.props.b_isInput;
        var e_labelEl = null;
        var s_classSet = "";
        var s_right = this.props.s_right;
        if(b_isInput){
            s_classSet = classSet({"base-after-line":this.props.b_line});
            var e_rightImg = this.props.s_rightImg ?  (<img onClick={this.props.f_rightClick} src={this.props.s_rightImg} />):"";
            e_labelEl = <div className={s_classSet} onClick={this.onClickHandler}>
                <label>{this.props.s_left}</label>
                <input onChange={this.onChangeHandler} ref="inputRef" type={this.props.s_inputType} placeholder={s_right} />
                {e_rightImg}
            </div>;
        }else{
            s_classSet = classSet("pdBottom6",{"base-after-line":this.props.b_line,"iconRight":this.props.b_after});
            var spanRight = classSet("base-ellipsis",{"base-fr base-mR10":this.props.b_right});
            e_labelEl = <div className={s_classSet} onClick={this.onClickHandler}>
                <label className="ovh">{this.props.s_left}</label>
                <span ref="rightEl" className={spanRight}>{s_right}</span>
            </div>;
        }
        return (
            <div className="labelInput">
                {e_labelEl}
            </div>
        );
    }
});
module.exports = LabelInput;
