/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 11:42:58
* 轮播组件
* 用法：
* var a_list = [imgSrc,imgSrc];
* var e_slide = a_list.map(function(item,index){
*    return <li key={index}><img src={item} /></li>
* })
* <Slider i_time={3}>
*    {e_slide}
* </Slider>
*/
'use strict';
require('sliderCss');
var lory = require('lory.js').lory;
var Timing = require('timing');
var classSet = require('classnames');
var loryImgFunc = function(self){
    if(React.Children.count(self.props.children) <=1){
        return null;
    }
    Timing.stop();
    if(self.o_slide){
        self.o_slide.reset();
        self.o_slide.destroy();
    }
    var e_node = ReactDOM.findDOMNode(self);
    self.o_slide =  lory(e_node, {infinite: 1});
    var i_time = self.props.i_time;
    if(i_time){
        Timing.start(Number.MAX_VALUE/1000,function(){
            self.o_slide.next();
        },i_time);
    }
    if(self.props.b_bullet){
        e_node.addEventListener('after.lory.slide', function(e){
            self.setState({i_active:e.detail.currentSlide-1});
        });
    }
};
var Slider = React.createClass({
    getInitialState: function() {
        return {i_active: 0};
    },
    componentDidMount:function(){
        loryImgFunc(this);
    },
    componentDidUpdate:function(){
        loryImgFunc(this);
    },
    componentWillUnmount:function(){
        Timing.stop();
        if(this.o_slide){
            this.o_slide.destroy();
        }
    },
    b_startLory:false,
    propTypes: {
        i_time: React.PropTypes.number,//是否自动轮播
        b_bullet: React.PropTypes.bool,//是否需要底部页面指示器
        e_adorn : React.PropTypes.element,//装饰元素
    },
    render:function(){
        var self = this;
        //轮播元素
        var e_items = null;
        e_items = this.props.children;
        var e_bullet = [];
        if(this.props.b_bullet){
            for(var i = 0,len=e_items.length;i<len;i++){
                var s_activeCls = classSet("bullet",{'active':(i===self.state.i_active)});
                e_bullet.push(<span key={i} className={s_activeCls}></span>);
            }
        }
        return (
            <div key={Math.random()} className="slider">
                <div ref="sliderFrame" className="js_frame">
                    <ul ref="sliderUl" className="js_slides">
                        {e_items}
                    </ul>
                    <div className="pagination">
                        {e_bullet}
                    </div>
                </div>
                {this.props.e_adorn}
            </div>
        );
    }
});
module.exports = Slider;
