/*
* @Author: 代汉桥
* @Date:   2016-07-12 09:35:30
* @Last Modified by:   代汉桥
* @Last Modified time: 2016-07-13 10:43:24
* 滚动组件，支持上拉刷新，下拉刷新
* 用法：
* <Scroll f_pullUpScroll={this.pullUpScroll} >
*     <ul>
*         {e_list}
*     </ul>
* </Scroll>;
*/

"use strict";
var IScroll = require('iscroll-lite');
require('scrollCss');
//上拉组件
var BottomEl = React.createClass({
    getInitialState:function(){
        return {i_scrollType:0};
    },
    render:function(){
        var e_list = [];
        for(var i = 0;i<12;i++){
            e_list.push(<div key={i} className={"weui_loading_leaf weui_loading_leaf_"+i}></div>);
        }
        var e_item = null;
        if(this.props.i_scrollType===0){
            e_item = <div className="loadingBody">
                <span >上拉加载更多</span>
            </div>;
        }else if(this.props.i_scrollType===1) {
            e_item = <div className="loadingBody">
                <div className="weui_loading">
                    {e_list}
                </div>
                <span className="loadingInfo">正在加载</span>
            </div>;
        }else{
            e_item = <div className="loadingBody">
                <span >没有更多数据了</span>
            </div>;
        }

        return (
            <div className="scroll-bottom">
                {e_item}
            </div>
        );
    }
});
//下拉刷新组件
var TopEl = React.createClass({
    getInitialState:function(){
        return {i_scrollType:0};
    },
    render:function(){
        var e_list = [];
        for(var i = 0;i<12;i++){
            e_list.push(<div key={i} className={"weui_loading_leaf weui_loading_leaf_"+i}></div>);
        }
        var e_item = null;
        if(this.props.i_scrollType===0){
            e_item = <div className="scroll-bottom">
                        <div className="loadingBody">
                        <span >下拉刷新</span>
                        </div>
                    </div>;
        }else if(this.props.i_scrollType===1) {
            e_item = <div className="scroll-bottom">
                <div className="loadingBody">
                    <span >松开刷新</span>
                </div>
            </div>;
        }else if(this.props.i_scrollType===2){
            e_item = <div className="scroll-bottom">
                <div className="loadingBody">
                    <div className="weui_loading">
                        {e_list}
                    </div>
                    <span className="loadingInfo">正在刷新</span>
                </div>
            </div>;
        } else {
            e_item = null;
        }
        return (
            e_item
        );
    }
});
var Scroll = React.createClass({
    getInitialState:function(){
        return {i_scrollType:0,i_positiveUpType:3};
    },
    componentDidUpdate:function(prevProps,prevState){
        if(prevProps.children !== this.props.children){
            this.myScroll.refresh();
        }
    },
    //请求到数据调用
    endScroll:function(b_forbid){
        //设置能否滚动
        if(this.props.f_pullUpScroll){
            if(!b_forbid){
                this.i_requestState = 0;
                this.setState({i_scrollType:0});
            }else {
                this.i_requestState = 2;
                this.setState({i_scrollType:2});
            }
        }
        if(this.props.f_pullDownScroll){
            this.i_downRequestState = 0;
            this.setState({i_positiveUpType:3});
        }
    },
    componentWillUnmount:function(){
        this.myScroll.destroy();
    },
    i_requestState:0,//0:可请求，1:正在请求，2:禁止请求
    i_downRequestState:0,//0:可刷新，1:正在刷新，2:禁止刷新
    componentDidMount:function(){
        Base.setImmerseBar('.scroll-wrapper',20,1);
        var options = this.props.options || {};
        function iScrollClick(){
        	if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)){
                return false;
            }
        	if (/Chrome/i.test(navigator.userAgent)){
                return (/Android/i.test(navigator.userAgent));
            }
        	if (/Silk/i.test(navigator.userAgent)){
                return false;
            }
        	if (/Android/i.test(navigator.userAgent)) {
        	   var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
        	   return parseFloat(s[0]+s[3]) < 44 ? false : true;
            }
        }
        options['click'] = iScrollClick();
        options['bounce'] = true;
        this.myScroll =  new IScroll(this.refs.wrapper,options);
        var self= this;
        var b_pullDown = !!this.props.f_pullDownScroll;
        this.myScroll.on("scrollEnd",function(){
            if(self.i_requestState === 0 && this.maxScrollY === this.y){
                if(self.props.f_pullUpScroll){
                    self.i_requestState = 1;
                    self.setState({i_scrollType:1});
                    self.props.f_pullUpScroll(self);
                 }
            }
            if(self.i_downRequestState === 0 && this.y===0 ){
                if(b_pullDown && self.state.i_positiveUpType===1){
                    self.i_downRequestState = 1;
                    self.setState({i_positiveUpType:2});
                    self.props.f_pullDownScroll(self);
                }else {
                    self.setState({i_positiveUpType:3});
                }
            }
        });
        var b_hor = this.props.b_hor;
        this.myScroll.on('scrollStart',function(){
            if(!b_hor){
                if(this.directionY === -1 && !b_pullDown){
                    this.options.bounce = false;
                }else{
                    this.options.bounce = true;
                }
            }else{
                this.options.bounce = true;
            }
        });
        this.myScroll.on('scroll',function(){
            if(b_pullDown){
                if(this.y>0 && this.y <=50){
                    if(self.state.i_positiveUpType !==0){
                        self.setState({i_positiveUpType:0});
                    }
                }else if(this.y>50){
                    if(self.state.i_positiveUpType !==1){
                        self.setState({i_positiveUpType:1});
                    }
                }else {
                    if(self.state.i_positiveUpType !==3){
                        self.setState({i_positiveUpType:3});
                    }
                }
            }
        });
    },
    render:function(){
        var s_cls = this.props.b_hor ? "scroll-wrapper-hor" : "scroll-wrapper";
        var e_bottomEl = null;
        var e_topEl = null;
        if(this.props.f_pullUpScroll){
            e_bottomEl = <BottomEl i_scrollType={this.state.i_scrollType} />;
        }
        e_topEl = <TopEl i_scrollType={this.state.i_positiveUpType} />;
        return (
            <div className="scroll">
                <div ref="wrapper"  className={s_cls} style={this.props.style}>
                    <div className="sdd">
                        {e_topEl}
                        {this.props.children}
                        {e_bottomEl}
                    </div>
                </div>
            </div>
        );
    }
});
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function(){
        return Scroll;
    });
} else if(typeof module !== 'undefined' && module.exports){
    module.exports = Scroll;
} else{
    window.ScrollBottom = Scroll;
}
