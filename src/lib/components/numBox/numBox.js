/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:34:33
* 数量选择框
* 用法：
* <NumBox />
* <NumBox i_value={1} i_min={1} i_max={100}/>
*/

'use strict';
require('numBoxCss');
var NumBox = React.createClass({
    propTypes:{
        i_value:React.PropTypes.number,//当前值
        i_min:React.PropTypes.number,//最小值
        i_max:React.PropTypes.number,//最大值
    },
    getInitialState:function(){
        return {i_value:this.props.i_value || 1};
    },
    getDefaultProps:function(){
        return {i_min:1,i_max:Number.MAX_VALUE};
    },
    leftClick:function(){
        var i_value = parseInt(this.state.i_value);
        var i_newValue = Math.max(i_value - 1,this.props.i_min);
        this.setState({i_value:i_newValue});
    },
    rightClick:function(){
        var i_value = parseInt(this.state.i_value);
        var i_newValue = Math.min(i_value + 1,this.props.i_max);
        this.setState({i_value:i_newValue});
    },
    inputChange:function(e){
        var i_value = parseInt(this.refs.input.value) || parseInt(this.props.i_min);
        var i_newValue = Math.min(i_value,this.props.i_max);
        i_newValue = Math.max(i_value,this.props.i_min);
        this.setState({i_value:i_newValue});
    },
    componentDidUpdate:function(prevProps,prevState){
        if(this.props.f_callBack && prevState.i_value !== this.state.i_value){
            this.props.f_callBack(this.state.i_value);
        }
    },
    render:function(){
        return (
            <div style={this.props.style} className="numBox" >
                <button onClick={this.leftClick} className="numbox-btn-minus" type="button">-</button>
                <input ref="input" value={this.state.i_value} className="numbox-input" type="text" onChange={this.inputChange}/>
                <button onClick={this.rightClick} className="numbox-btn-plus" type="button">+</button>
            </div>
        );
    }
});
module.exports = NumBox;
