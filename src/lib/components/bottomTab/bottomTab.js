/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-12 17:15:05
* 底部tab
* BottomTab.create(function(index){},[{s_label:"首页",s_icon:require('shouye_1Img'),s_activeIcon:require('shouyeImg')},{s_label:"会员",s_icon:require('huiyuan_1Img'),s_activeIcon:require('huiyuanImg')},{s_label:"我的",s_icon:require('wode_1Img'),s_activeIcon:require('wodeImg')}]);
*/
'use strict';
require('bottomTabCss');
var BottomTabItem = React.createClass({
	propTypes : {
		f_handleChange : React.PropTypes.func.isRequired,//点击回调
		s_label : React.PropTypes.string.isRequired,//tab文字
		i_index : React.PropTypes.number.isRequired,//tab索引
		s_icon: React.PropTypes.string.isRequired,//tab图标
		s_activeIcon: React.PropTypes.string.isRequired,//tab激活图标
		b_active:React.PropTypes.bool.isRequired,//是否为激活状态
	},
	f_clickHandler:function(){
		document.title = this.props.s_label;
		this.props.f_handleChange(this.props.i_index);
	},
	render : function(){
		var s_tabIcon = this.props.s_icon;
		var s_activeCls = "";
		if(this.props.b_active){
			s_tabIcon = this.props.s_activeIcon;
			s_activeCls = "active";
		}
		return (
			<a className={s_activeCls} onClick={this.f_clickHandler}>
				<img className="bTab-topImg" src={s_tabIcon}/>
				<span>{this.props.s_label}</span>
			</a>
		);
	}
});
var BottomTab = React.createClass({
	propTypes : {
		f_callBack : React.PropTypes.func,
		a_tabIcons : React.PropTypes.array.isRequired
	},
	f_handleChange : function(i_index){
		this.setState({i_curIndex:i_index});
		if(this.props.f_callBack){
			this.props.f_callBack(i_index);
		}
	},
	getInitialState:function(){
		return {i_curIndex:this.props.i_curIndex};
	},
	render:function(){
		var _self = this;
		var bottomEl = this.props.a_tabIcons.map(function(item,key){
			return <BottomTabItem key={key} f_handleChange={_self.f_handleChange} s_label={item.s_label} b_active={_self.state.i_curIndex === key} i_index={key} s_icon={item.s_icon} s_activeIcon={item.s_activeIcon}/>;
		});
		return (
			<div className="bottomTab">
				{bottomEl}
			</div>
		);
	}
});
var e_bottomTabEl = null;
module.exports = {
    create:function (f_callBack,a_tabIcons,i_curIndex) {
        if(!e_bottomTabEl){
			e_bottomTabEl = document.createElement('nav');
			document.body.appendChild(e_bottomTabEl);
			a_tabIcons = a_tabIcons || [];
        }
		i_curIndex = i_curIndex || 0;
		document.title = a_tabIcons[i_curIndex].s_label;
		ReactDOM.render(<BottomTab f_callBack={f_callBack} a_tabIcons={a_tabIcons} i_curIndex={i_curIndex}/>,e_bottomTabEl);
    },
	destroy:function(){
		if(e_bottomTabEl){
			ReactDOM.unmountComponentAtNode(e_bottomTabEl);
			if(e_bottomTabEl.parentNode){
				e_bottomTabEl.parentNode.removeChild(e_bottomTabEl);
			}
			e_bottomTabEl = null;
		}
	}
};
