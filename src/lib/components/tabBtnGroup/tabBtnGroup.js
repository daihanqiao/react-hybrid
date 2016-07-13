/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:49:12
* tab按钮组
* 用法：
* <TabBtnGroup f_callBack={this.clickHandler} i_currentItem={1} a_controlItems={["type1","type2","type3"]} />
*/

'use strict';
var classSet = require('classnames');
require('tabBtnGroupCss');
var TabControlItem = React.createClass({
    propTypes : {
        f_clickHandler: React.PropTypes.func.isRequired,//点击回调
		i_index : React.PropTypes.number.isRequired,//item索引
		s_itemName : React.PropTypes.string.isRequired,//item标题
        b_active: React.PropTypes.bool.isRequired,//是否为激活状态
	},
    f_clickHandler:function(){
        this.props.f_clickHandler(this.props.i_index);
    },
    render:function(){
        var b_active = this.props.b_active;
        var s_className = classSet("item",{
            "active":b_active,
        });
        return (
            <a className={s_className} onClick={this.f_clickHandler}>
                {this.props.s_itemName}
            </a>
        );
    }
});
var TabBtnGroup = React.createClass({
    propTypes : {
        f_callBack: React.PropTypes.func.isRequired,//点击回调
		i_currentItem : React.PropTypes.number,//当前索引
		a_controlItems : React.PropTypes.array.isRequired,//item组
	},
    f_itemClickHandler:function(i_index){
        this.setState({i_currentItem: i_index});
        this.props.f_callBack(i_index);
    },
    getInitialState:function(){
        return {i_currentItem:this.props.i_currentItem || 0};
    },
    componentWillReceiveProps:function(nextProps){
        if(this.props.i_currentItem !== nextProps.i_currentItem){
            this.setState({i_currentItem:nextProps.i_currentItem});
        }
    },
    render:function(){
        var o_itemStyle = {backgroundColor:"#fff"};
        var s_itemClassName = "";
        var o_progressStyle = {
            zIndex: 1,
            height: 2,
            transition: "transform 0.5s",
            WebkitTransition: "transform 0.5s",
        };
        o_progressStyle.width = parseFloat(100/this.props.a_controlItems.length).toFixed(3)+"%";
        o_progressStyle['transform'] = "translate3d("+100*this.state.i_currentItem+"%, 0px, 0px) translateZ(0px)";
        o_progressStyle['WebkitTransform'] = "translate3d("+100*this.state.i_currentItem+"%, 0px, 0px) translateZ(0px)";
        var _self = this;
        var e_items = this.props.a_controlItems.map(function(item,key){
            return <TabControlItem key={key} s_itemName={item} b_active={key===_self.state.i_currentItem} i_index={key} f_clickHandler={_self.f_itemClickHandler} />;
        });
        return (
            <div className="tabBtnGroup">
                <div className="segmented-control" style={o_itemStyle}>
                    {e_items}
                </div>
                <div className="line" style={o_progressStyle}></div>
            </div>
        );
    }
});
module.exports = TabBtnGroup;
