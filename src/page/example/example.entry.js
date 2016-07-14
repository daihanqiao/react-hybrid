'use strict';
Com.ready(function(){
    var TopBar = require('topBar');
    TopBar.create("example",{});
    require("exampleCss");
    var ActionSheet = require('actionSheet');
    var ApposeBtn = require('apposeBtn');
    var ApposeFixedBtn = require('apposeFixedBtn');
    var BlockBtn = require('blockBtn');
    var BlockInput = require('blockInput');
    var BlockTitle = require('blockTitle');
    var imgSrc = require('ad_mobile_5Img');
    var CheckBox = require('checkBox');
    var FoldItem = require('foldItem');
    var LabelInput = require('labelInput');
    var MediaItem = require('mediaItem');
    var mediaIcon = require('index_mediaImg');
    var NumBox = require('numBox');
    var PopPicker = require("popPicker");
    var data = require('cityData');
    var InputWithBtn = require('inputWithBtn');
    var RadioList = require('radioList');
    var Slider = require('slider');
    var radioImg1 = require('discountFlag_1Img');
    var radioImg2 = require('discountFlag_2Img');
    var TabBtnGroup = require('tabBtnGroup');
    //页面组件
    var PageEl = React.createClass({
        componentDidMount:function(){
            PopPicker.setData(data,3);
        },
        _clickAppose:function(){
            console.log('ApposeBtn');
        },
        _click:function(){
            console.log('点击');
        },
        _checkHandler:function(value){
            console.log(value);
        },
        _sendMsg:function(){
            console.log("发送验证码成功");
        },
        _mediaClick:function(){
            console.log("mediaClick");
        },
        _openActionSheet:function(){
            this.refs.actionSheet.toggle();
        },
        _foldItemHandler:function(params){
            console.log(params);
        },
        _popPickerHandler:function(){
            PopPicker.show(function(items){
                console.log(items);
            })
        },
        _changeTab:function(value){
            console.log(value);
        },
        render:function(){
            var a_list = [imgSrc,imgSrc];
            var e_slide = a_list.map(function(item,index){
                return <li key={index}><img src={item} /></li>
            })
            return (
                <div className="example">
                    <TabBtnGroup f_callBack={this._changeTab} i_currentItem={1} a_controlItems={["type1","type2","type3"]} />
                    <button className="base-button base-mT20" onClick={this._openActionSheet}>
                        打开actionSheet
                    </button>
                    <ActionSheet ref="actionSheet" a_list={[{s_title:'拍照',f_onClick:function(){console.log('拍照')}},{s_title:'从相册选择',f_onClick:function(){console.log('从相册选择')}}]}/>
                    <ApposeBtn s_leftLabel="确定" s_rightLabel="取消" f_leftClick={this._clickAppose} f_rightClick={this._clickAppose}/>
                    <div className="base-mT20"></div>
                    <ApposeFixedBtn s_leftLabel="fixed确定" s_rightLabel="fixed取消" f_leftClick={this._clickAppose} f_rightClick={this._clickAppose}/>
                    <BlockBtn s_label="块级按钮" onClick={this._click}/>
                    <BlockInput s_placeholder="请输入姓名"/>
                    <BlockInput s_placeholder="请输入验证码" f_clickHandle={this._sendMsg} b_haveBtn={true} s_btnTxt="发送验证码"/>
                    <BlockTitle s_title="blockTitle标题" b_after={true} onClick={this._click}>
                        内容
                        <img src={imgSrc}/>
                    </BlockTitle>
                    <div className="base-mT20"></div>
                    <CheckBox s_label="checkBox文本" f_changeHandler={this._checkHandler}/>
                    <div className="base-mT20"></div>
                    <FoldItem i_state={1} s_title="foldItem1">
                        123456
                    </FoldItem>
                    <FoldItem i_state={1} s_title="foldItem2" o_params={{"id":1}} f_callBack={this._foldItemHandler}>
                        123456
                    </FoldItem>
                    <div className="base-mT20"></div>
                    <LabelInput s_left="姓名：" s_right="代汉桥" b_after={true} b_line={true}/>
                    <LabelInput s_left="姓名：" s_right="代汉桥" b_after={true} b_line={true}/>
                    <LabelInput s_left="姓名：" s_right="请输入姓名" b_isInput={true} b_line={true}/>
                    <LabelInput s_left="姓名：" s_right="请输入姓名" b_isInput={true} b_line={true}/>
                    <MediaItem s_img={mediaIcon} s_label="我全都有" b_after={true} b_line={true} />
                    <MediaItem s_img={mediaIcon} s_label="我没有箭头" b_line={true} />
                    <MediaItem s_img={mediaIcon} s_label="我没有线" b_after={true} />
                    <MediaItem s_img={mediaIcon} onClick={this._mediaClick} s_label="我可以点击" b_after={true} b_line={true} />
                    <div className="base-mT20"></div>
                    <NumBox/>
                    <div className="base-mT20"></div>
                    <button className="base-button base-mT20" onClick={this._popPickerHandler}>
                        打开PopPicker
                    </button>
                    <div className="base-mT20"></div>
                    <InputWithBtn s_left="姓名" s_right="代汉桥" s_btnTxt="发送" f_rightClick={this._sendMsg}/>
                    <div className="base-mT20"></div>
                    <RadioList a_list={[{s_img:radioImg1,s_label:"微信支付",b_default:true,s_value:"1"},{s_img:radioImg2,s_label:"支付宝",s_value:"2"}]}/>
                    <Slider i_time={3}>
                       {e_slide}
                    </Slider>
                    <div className="base-mT20"></div>
                </div>
             );
        }
    });
    //请求数据
    Com.getNormal({act:"example",op:"example"},function(res){
        if(res.code === 0){
            ReactDOM.render(<PageEl data={res.data}/>,document.getElementById('pageCon'));
        }else{
            Com.toast(res.msg);
        }
    });
});
