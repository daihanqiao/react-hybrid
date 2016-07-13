/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 09:11:48
* 图文item
* 用法：
* <MediaItem s_img={mediaIcon} s_label="我全都有" b_after={true} b_line={true} />
* <MediaItem s_img={mediaIcon} s_label="我没有箭头" b_line={true} />
* <MediaItem s_img={mediaIcon} s_label="我没有线" b_after={true} />
* <MediaItem s_img={mediaIcon} onClick={this._mediaClick} o_params={{a:1}} s_label="我可以点击" b_after={true} b_line={true} />
*/

'use strict';
require('mediaItemCss');
var classSet = require('classnames');
var MediaItem = React.createClass({
    propTypes : {
		onClick : React.PropTypes.func,//点击回调
		o_params : React.PropTypes.object,//点击参数
		s_img : React.PropTypes.string,//图标
		s_label: React.PropTypes.string.isRequired,//文字
        s_right: React.PropTypes.string,//右边文字
        b_after: React.PropTypes.bool,//是否有右箭头
        b_line:React.PropTypes.bool,//是否有底部线
	},
    clickHandler:function(){
        if(this.props.onClick){
            this.props.onClick(this.props.o_params);
        }
    },
    render:function(){
        var s_lines = classSet("mediaItem",{"base-after-line":this.props.b_line});
        var s_cls = classSet("mediaItem-body base-pdR10",{"base-iconRight":this.props.b_after});
        return (
            <div className={s_lines} onClick={this.clickHandler}>
                <a>
                    <img className="mediaItem-img base-fl" src={this.props.s_img} />
                    <div className={s_cls}>
                        <span>{this.props.s_label}</span>
                        <span className="base-fr">{this.props.s_right || ""}</span>
                    </div>
                </a>
            </div>
        );
    }
});
module.exports = MediaItem;
