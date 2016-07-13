## 组件文档

### apposeBtn
* 描述：并列按钮
* 用法：
```
<ApposeBtn s_leftLabel="分享" s_rightLabel="保存" f_leftClick={this.leftHandler} f_rightClick={this.rightHandler}/>
```

### blockBtn
* 描述：块状按钮
* 用法：
```
<BlockBtn onClick={this.onClick} s_label="提交" />
```

### blockInput
* 描述：块状输入框，支持右侧带按钮
* 用法：
```
(带右侧按钮):<BlockInput ref="codeInput" s_placeholder="请输入验证码" f_clickHandle={this.f_codeClickHandler} b_haveBtn={true}  s_btnTxt="获取验证码"/>
(块状输入框):<BlockInput ref="newMobileNum" s_placeholder="请输入新的手机号码" />
```

### bottomTap
* 描述：底部tab
* 用法：
```
BottomTap.create(function(index){alert(index)},[{s_label:"首页",s_icon:require('shouye_1Img'),s_activeIcon:require('shouyeImg')},{s_label:"会员",s_icon:require('huiyuan_1Img'),s_activeIcon:require('huiyuanImg')},{s_label:"我的",s_icon:require('wode_1Img'),s_activeIcon:require('wodeImg')}]);
```

### foldItem
* 描述：折叠Item
* 用法：
```
<FoldItem key={index} o_params={{"id":item.org_msg_id}} f_callBack={self.f_readyHander} i_state = {parseInt(item.is_readed)} s_title={item.content.slice(0,10)} s_content={item.content} />
```

### imageSlider
* 描述：轮播组件
* 用法：
```
<ImageSlider a_imageList={[url,url,url]} f_clickHandler={function(){}}/>
```

### labelInput
* 描述：文本输入组件（支持右侧右箭头，右侧文本按钮功能）
* 用法：
```
<LabelInput s_left="密码：" s_right="请输入您的密码" b_isInput={true} s_inputType="password" />
```

### loader
* 描述：加载loading
* 用法：
```
Loader.show();
Loader.hide();
```

### scrollBottomCom
* 描述：上拉刷新组件
* 用法：
```
<scrollBottomCom f_scrollCallBack={function(el){alert(1)}}/>
```

### tabBtnGroup
* 切换按钮组
* 用法：
```
<TabBtnGroup f_callBack={clickHandler} a_controlItems={['item1','item2']}/>
```

### toast
* toast提示
* 用法：
```
Toast.show();
```

### topBar
* 顶部bar
* 用法：
```
TopBar.create('首页');
```

### radio
* radio组件
* 用法：
```
<Radio radioTxt="黄钻级别" s_value="1" f_changeHandler={this.radioHandler}/>
```

### radioList
* 单选列表组件(图片+文字+单选)
* 用法：
```
<RadioList a_list={[{s_img:require('wxLogoImg'),s_label:"微信支付",b_default:true,s_value:"1"},{s_img:require('wxLogoImg'),s_label:"支付宝",s_value:"2"}]}/>
```
