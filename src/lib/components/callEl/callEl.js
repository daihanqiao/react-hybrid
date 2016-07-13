/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-12 17:15:39
* 拨打电话组件
*/

'use strict';
var CallEl = React.createClass({
    propTypes:{
        mobile:React.PropTypes.string.isRequired,
    },
    callPhone:function(){
        if(this.props.mobile){
            Base.call(this.props.mobile);
        }
    },
    render:function(){
        var el = null;
        if(Base.isApp){
            el = <a onClick={this.callPhone}>
                {this.props.children}
            </a>;
        }else{
            var s_mobile = this.props.mobile;
            if(s_mobile){
                el = <a href={"tel:"+s_mobile}>
                    {this.props.children}
                </a>;
            }else{
                el = <a>
                    {this.props.children}
                </a>;
            }
        }
        return  el;
    }
});
module.exports = CallEl;
