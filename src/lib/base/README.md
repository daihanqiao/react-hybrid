## base.js文档
约定：变量名`f_`代表函数，`a_`代表数组，`n_`代表number，`i_`代表int，`o_`代表对象，`s_`代表字符串，`u_`代表可支持多种数据类型
### isApp
* 描述：是否为APP环境

### ready
* 参数：`f_callback`
* 返回；无
* 描述：页面所需JS加载完成后调用f_callback

### genDiffCls
* 参数：`s_cls`
* 返回：无
* 描述：组装className,可针对不同平台生成不同class name

### isNeedImmerse(APP有效)
* 参数：无
* 返回：bool
* 描述：是否需要设置沉浸式

### setImmerseBar(APP有效)
* 参数：`s_selector`,`n_paddingTop`
* 返回；无
* 描述：config.xml配置沉浸式时，`iOS 7+`以及`android 4.4+`对选择器为`s_selector`的元素增加`n_paddingTop`内上边距

### confirm
* 参数：`s_msg`,`f_callback`
* 返回；无
* 描述：带确认取消按钮的弹窗，提示内容`s_msg`，点击确定回调`f_callback`

### inputNotie
* 参数：`s_title`,`s_placeholder`,`f_okHandler`,`s_okLabel`（可选）,`s_cancelLabel`（可选）
* 返回：无
* 描述：带确定取消按钮和输入框的弹窗

### showProgress
* 参数：`s_title`（可选），`s_msg`（可选）
* 返回；无
* 描述：显示标题为`s_title`，内容为`s_msg`的loading（wap端参数无效）

### hideProgress
* 参数；无
* 返回；无
* 描述：隐藏loading

### toast
* 参数：`s_msg`
* 返回；无
* 描述：显示内容为`s_msg`的toast

### ajax
* 参数：`s_requestUrl`,`o_param`（默认null）,`f_callBack`（默认null）,`b_isNoShowProgress`（默认false）,`b_isNoHideProgress`（默认false）,`s_method`（默认post）,`f_errorCallBack`（默认null）
* 返回；无
* 描述：像地址为`s_requestUrl`发起一个method为`s_method`，参数为`o_param`的请求，请求成功回调`f_callBack`，请求失败回调`f_errorCallBack`；当`b_isNoShowProgress`为true时，发起请求不显示loading，当`b_isNoHideProgress`为true时，结束请求不隐藏loading

### getPageParams
* 参数：`s_keyStr`（可选）
* 返回：对象或值
* 描述：将上一页面传来的参数作为对象返回，当`s_keyStr`不为空时，获取参数中key为`s_keyStr`的值

### getPageName
* 参数：无
* 返回：string
* 描述：返回当前页面名字

### openWin
* 参数：`s_name`,`o_pageParam`（可选），`o_winParams`（可选，app使用）
* 返回：无
* 描述：打开页面，并传递参数`o_pageParam`

### closeWin
* 参数：`s_winName`（可选）
* 返回：无
* 描述：关闭页面；APP中关闭窗体名为`s_winName`的页面，`s_winName`为空则关闭当前页面

### sendEvt(APP有效)
* 参数：`s_name`,`o_params`（可选）
* 返回：无
* 描述：发送事件名为`s_name`的事件，可携带数据`o_params`

### addEvt(APP有效)
* 参数：`s_name`,`f_callBack`
* 返回：无
* 描述：监听事件名为`s_name`的事件，并回调`f_callBack`

### getLocalData
* 参数：`s_storageName`,`s_key`（可选）
* 返回：对象或值
* 描述：1、获取键名为`s_storageName`的本地数据；2、获取键名为`s_storageName`的本地数据中key为`s_key`的字段

### setLocalData
* 参数：`s_storageName`,`u_value`,`s_key`（可选）
* 返回：无
* 描述：1、将键名为`s_storageName`的本地数据设置为`u_value`；2、将键名为`s_storageName`的本地数据中的`s_key`字段设置为`u_value`

### removeLocalData
* 参数：`s_storageName`
* 返回：无
* 描述：清除键名为`s_storageName`的本地数据

### getDeviceId
* 参数：无
* 返回：string
* 描述：获取设备id

### checkMobile
* 参数：无
* 返回：bool
* 描述：校验是否为正确的手机号

### hideMobile
* 参数：`i_mobileNum`
* 返回：string
* 描述：将手机号`i_mobileNum`转成185*******1的格式

### download(APP有效)
* 参数：`s_path`,`f_callback`
* 返回：无
* 描述：下载路径为`s_path`的文件到本地，下载回调`f_callback`

### saveMediaToAlbum(APP有效)
* 参数：`s_path`,`f_callBack`
* 返回：无
* 描述：保存路径为`s_path`的图片视频到相册，完成回调`f_callBack`

### getAppVersion(APP有效)
* 参数：无
* 返回：无
* 描述：回去APP版本号

### getPicture(APP有效)
* 参数：`s_sourceType`(图片库：library，相机：camera，相册：album)，`f_callback`
* 返回：无
* 描述：通过系统相册，图片库或拍照获取图片

### genQrCode(APP有效)
* 参数：`s_url`，`f_callBack`
* 返回：无
* 描述：根据远程图片地址，生成二维码图片

### openScanner(APP有效)
* 参数：`f_callback`
* 返回：无
* 描述：打开扫描仪

### openScannerView(APP有效)
* 参数：`f_callback`
* 返回：无
* 描述：已frame的方式打开扫描仪

### getNumFormat
* 参数：`n_num`,`i_len`
* 返回：string
* 描述：对数字进行格式化，如0->0.00

### getTimeFormat
* 参数：`s_time`,`i_type`
* 返回：string
* 描述：格式化时间日期,s_time:秒数,i_type:0.输出年月日,1.输出时分秒,2.全部输出；输出格式:2016-03-21 14:21

### spliceObj
* 参数：`o_a`,`o_b`
* 返回：object
* 描述：将`o_b`的属性赋给`o_a`

### getSpliceStr
* 参数：`s_str`,`i_len`
* 返回：string
* 描述：截取`s_str`长度，超出`i_len`长度的部分用`...`代替

### getSysType
* 参数：无
* 返回：int
* 描述：获取系统类型：安卓或IOS，返回值为枚举:`ENUM_SYS_ANDROID`,`ENUM_SYS_IOS`

### getBrowserType
* 参数：无
* 返回：int
* 描述：获取浏览器类型

### setBackDisable(安卓APP有效)
* 参数：无
* 返回：无
* 描述：取消物理返回键

### openContacts(APP有效)
* 参数：无
* 返回：无
* 描述：打开系统通讯录选择联系人

### getScreenWidth
* 参数：无
* 返回：number
* 描述：获取设备宽度
