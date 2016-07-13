/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 10:23:32
* app头部bar组件
* 用法：
* TopBar.create('标题');
* TopBar.create('标题',o_params);
*/

'use strict';
require("topBarCss");
var e_appBarCon = null;
module.exports = {
    //标题，左边ICON回调，左边ICON，右边ICON，右边ICON点击回调
    //o_params:{s_leftIcon:左边icon(false为没有左icon,不传默认为backIconImg)，f_leftClick:左边icon点击,s_rightIcon:右边icon,s_rightLabel:右边为文字,f_rightClick:右边icon点击,s_color:背景颜色,s_titleColor:标题颜色}
    create:function (s_title,o_params) {
        if(Base.getBrowserType() === Base.ENUM_BROWSER_WX){
            return;
        }
        if(!e_appBarCon){
            e_appBarCon = document.createElement('header');
            e_appBarCon.className="base-top";
            var e_documentBody = document.body;
            e_documentBody.insertBefore(e_appBarCon, e_documentBody.firstChild);
            Base.setImmerseBar('header');
            Base.setImmerseBar('.base-container',64);
        }
        renderDom(s_title,o_params);
    },
    updateTopBar:function(s_title,o_params){
        if(!e_appBarCon){
            return;
        }
        renderDom(s_title,o_params);
    }
};
function renderDom(s_title,o_params){
    document.title=s_title;
    o_params = o_params || {};
    e_appBarCon.style.backgroundColor = o_params.s_color || "#f7f7f7";
    var s_titleColor = o_params.s_titleColor || "#000";
    var e_leftIconEl = null;
    var s_leftIcon = o_params.s_leftIcon;
    if(s_leftIcon !== false){
        s_leftIcon = s_leftIcon || require('backIconImg');
    }
    if(s_leftIcon){
        var f_onClick = function(){
            var f_leftClick = o_params.f_leftClick || Base.closeWin;
            f_leftClick();
        };
        e_leftIconEl = <div className="leftIcon" onClick={f_onClick}><img className="base-fl leftIcon" onClick={f_onClick} src={s_leftIcon} ></img></div>;
    }

    var e_rightIconEl = null;
    var s_rightIcon = o_params.s_rightIcon;
    var s_rightLabel = o_params.s_rightLabel;
    var f_rightClick = o_params.f_rightClick;
    if(s_rightIcon){
        e_rightIconEl = <span className="base-fr rightIcon" onClick={f_rightClick}>
            <img src={s_rightIcon}></img>
        </span>;
    }else if(s_rightLabel){
        e_rightIconEl = <button onClick={f_rightClick} className="btn-link base-fr">
            {s_rightLabel}
        </button>;
    }
    ReactDOM.render(
        <div className="topBar">
            {e_leftIconEl}
            {e_rightIconEl}
            <h1 className="topTitle" style={{color:s_titleColor}}>{s_title}</h1>
        </div>,
        e_appBarCon
    );
}
