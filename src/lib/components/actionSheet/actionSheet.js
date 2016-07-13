/*
* @Author: daihanqiao
* @Date:   2016-02-24 11:02:38
* Copyright (c) 2016 by daihanqiao. All Rights Reserved.
* 从下弹出的仿IOS选择器
* 用法：
* <ActionSheet ref="actionSheet" a_list={[{s_title:'拍照',f_onClick:function(){console.log('拍照')}},{s_title:'从相册选择',f_onClick:function(){console.log('从相册选择')}}]}/>
* this.refs.actionSheet.toggle();
*/
'use strict';
require('actionSheetCss');
var e_divBg = null;
var classSet = require('classnames');
var ActionSheet = React.createClass({
    propTypes:{
        a_list:React.PropTypes.array.isRequired,
    },
    componentWillUnmount:function(){
        if(e_divBg){
            e_divBg.removeEventListener('click');
            e_divBg.parentNode.removeChild(e_divBg);
        }
    },
    f_cancel:function(){
        this.toggle();
    },
    b_show:false,
    toggle:function(){
        var self = this;
        if(!e_divBg){
            e_divBg = document.createElement('div');
            e_divBg.className = "base-mask base-hide";
            document.body.appendChild(e_divBg);
            e_divBg.addEventListener('click',function(){
                self.toggle();
            });
        }
        self.b_show = !self.b_show;
        this.refs.actionSheet.classList.toggle("actionSheet-active");
        e_divBg.className = classSet("base-mask",{"base-hide":!self.b_show,"actionSheet-active-bg":self.b_show});
    },
    render:function(){
        var e_item = this.props.a_list.map(function(item,key){
            return <li key={key} onClick={item.f_onClick} className="base-after-line base-line-left">
                        {item.s_title}
                    </li>;
        });
        return <div ref="actionSheet" className="actionSheet">
                <ul>
                    {e_item}
                </ul>
                <ul>
                    <li onClick={this.f_cancel}>
                        <b>取消</b>
                    </li>
                </ul>
            </div>;
    }
});
module.exports = ActionSheet;
