/**
 * Created by Administrator on 2018/2/26 0026.
 */
var SETDOMAIN = 'cn';
var HOST = 'http://wk-singlegoods-api.99114.' + SETDOMAIN;

var SHOP = 'http://webmobile.99114.' + SETDOMAIN;   //测试
// var SHOP = 'http://m.99114.' + SETDOMAIN;            //正式
var CENTER_URL="http://membercenterha.99114."+SETDOMAIN;

var goodsAttrResult = [];
// 商品规格arr
var goodsAttrResult1 = [
    { name: '品牌', position: 'goodsAttr_01' },
    { name: '包装方式', position: 'goodsAttr_02' },
    { name: '净含量', position: 'goodsAttr_03' },
    { name: '生产日期', position: 'goodsAttr_04' },
    { name: '保质期', position: 'goodsAttr_05' },
    { name: '产品类别', position: 'goodsAttr_06' },
    { name: '生产厂家', position: 'goodsAttr_07' },
    { name: '产品规格', position: 'goodsAttr_08' }
];
//爆款-苹果单页
var goodsAttrResult2 = [
    { name: '品种', position: 'goodsAttr_01' },
    { name: '果径', position: 'goodsAttr_02' },
    { name: '等级', position: 'goodsAttr_03' },
    { name: '口感', position: 'goodsAttr_04' },
    { name: '成熟度', position: 'goodsAttr_05' }
];
//爆款-茶叶单页
var goodsAttrResult3 = [
    { name: '品牌', position: 'goodsAttr_01' },
    { name: '产品类别', position: 'goodsAttr_02' },
    { name: '是否进口', position: 'goodsAttr_03' },
    { name: '净含量（规格）', position: 'goodsAttr_04' },
    { name: '保质期', position: 'goodsAttr_05' },
    { name: '原产地', position: 'goodsAttr_06' },
    { name: '等级', position: 'goodsAttr_07' }
];
//爆款-机械单页
var goodsAttrResult4 = [
    { name: '产品名称', position: 'goodsAttr_01' },
    { name: '工作压力', position: 'goodsAttr_02' },
    { name: '型号', position: 'goodsAttr_03' },
    { name: '品牌', position: 'goodsAttr_04' },
    { name: '工作台与压板距离', position: 'goodsAttr_05' }
];

// 获取地址栏某个字段值
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/**
 *爆款数据统计==》类似埋点
 * @param templateType:模板类型
 * @param actionType: 1:模板浏览量(点击预览图 selectTemplate);2:模板使用量(点击生成模板);3:模板分享量4、电话呼叫次数
 */
function pagePoint(templateType,actionType) {

    var memberToken = window.localStorage.getItem("memberToken");

    if (null == memberToken) {
        memberToken = 0 + this.uuid();
        window.localStorage.setItem("memberToken", memberToken);
    }

    var memberId = window.localStorage.getItem("memberId");

    if (null != memberId) {
        memberToken = memberId;
    }

  $.ajax({
    type: "GET",
    async: true,
    url: CENTER_URL + '/baokuanBuryingPoint',
    data: {templateType: templateType,actionType: actionType,shopId: getUrlParam("memberId"),memberId:memberToken,singleTemplateNo: getUrlParam("singlePageIdTemplateNo")},
    contentType: "application/json",
    dataType: "text",
    success: function (data) {
      console.log("模仿埋点成功")
    },
    complete: function () {
      console.log("complete")
    },
    error: function () {
      console.log("模仿埋点失败")
    }
  });
}

var result = {};
(function() {

    pagePoint(0,5);

    // 通过地址栏isShare判断是否需要显示遮罩层
    $('#shareWrap').css('display', 'none');//暂时页面加载隐藏遮罩层
    /*if(Boolean(getUrlParam('isShare'))) {
        $('html,body').css({ height: 'auto','overflow-y': 'auto','overflow-x': 'hidden'});
        //$('body').css({ height: 'auto', overflow: 'auto' });
        $('#shareWrap').css('display', 'none');
    } else {
        $('html,body').css({ height: '100%', overflow: 'hidden' });
        //$('body').css({ height: '100%', overflow: 'hidden' });
        $('#shareWrap').css('display', 'flex');
    }*/
    // 获取微信分享配置config参数
    window.onload = function () {
        //判断浏览器
        var timestamp = "";
        var nonceStr = "";
        var signature = "";
        var url = window.location.href;
        var html = $.ajax({
            type: "post",
            dataType: "json",
            // url: "http://webmobile.99114." + SETDOMAIN + "/wxShare/getSign",
            url: "http://m.99114.com/wxShare/getSign",
            data: { url: url },
            async: false
        }).responseText;
        var datahtml = {};
        if (html != "") {
            datahtml = eval("(" + html + ")");
        }
        wx.config({
            //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: datahtml.appid, // 必填，公众号的唯一标识
            timestamp: datahtml.time, // 必填，生成签名的时间戳
            nonceStr: datahtml.nonce, // 必填，生成签名的随机串
            signature: datahtml.sign,// 必填，签名，见附录1
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    };
    // 获取商品信息
    $.ajax({
        url: HOST + '/getSinglePageByGoodsid?goodsId=' + getUrlParam('goodsId')  + '&singlePageId=' + getUrlParam('singlePageId'),
        success: function(res) {
            //console.log('获取商品信息', res);
            if(res.code == '0000') {
                result = res.respBody;
                console.log("result.goodsImgUrl",result.goodsImgUrl);
                wxShare(result.goodsImgUrl,result.goodsName);
                // 商品信息
                document.title = result.goodsName;
                $('#goodsName').text(result.goodsName);
                $('#goodsImgUrl').attr('src', result.goodsImgUrl);
                result.promotionPrice != null ? $('#promotionPrice').text(result.promotionPrice) : $('#goodsPrice').text(result.goodsPrice);
                $('#goodsPrice').text(result.goodsPrice);
                $('.goodsUnit').text('/' + result.goodsUnit);
                $('#secondGoodsImgUrl').attr('src', result.secondGoodsImgUrl);
                var flagUlrStatus = getUrlParam('singlePageIdTemplateNo');
                switch(flagUlrStatus){
                    case "1": goodsAttrResult = goodsAttrResult1;break;
                    case "2": goodsAttrResult = goodsAttrResult2;break;
                    case "3": goodsAttrResult = goodsAttrResult3;break;
                    case "4": goodsAttrResult = goodsAttrResult4;break;
                    default:break;
                }
                // 商品规格处理
                var goodsAttr = Boolean(result.goodsAttr) ? JSON.parse(result.goodsAttr) : [];
                for(var i = 0, len = goodsAttr.length; i < len; i++) {
                    for(var j = 0, leng = goodsAttrResult.length; j < leng; j++) {
                        if(goodsAttr[i].name == goodsAttrResult[j].name) {
                            if(goodsAttr[i].userdata != '') {
                                $('#' + goodsAttrResult[j].position).attr('value', goodsAttr[i].userdata);
                            } else {
                                for(var k = 0, lengt = goodsAttr[i].detail.length; k < lengt; k++) {
                                    if(goodsAttr[i].detail[k].checked == 'checked') {
                                        $('#' + goodsAttrResult[j].position).attr('value', goodsAttr[i].detail[k].detail);
                                    }
                                }
                            }
                        }
                    }
                }
                // 店铺详情
                $('#shopImgUrl').attr('src', result.shopImgUrl);
                $('#corporationName').text(result.corporationName);
                $('#credit').css('display', result.credit ? 'inline-block' : 'none');
                $('#factory').css('display', result.factory ? 'inline-block' : 'none');
                $('#bcp').css('display', result.bcp ? 'inline-block' : 'none');
                $('.memberLevel').eq(result.memberLevel).css('display', 'inline-block');
                $('#tel').attr('href', 'tel:' + result.tel);
            }
        }
    });

     // 立即购买 按钮
    $('#buyNow').click(function() {
        window.location.href = CENTER_URL+"/tempPage?templateNo="+getUrlParam('singlePageIdTemplateNo')+"&templateType=0&goBack="+encodeURIComponent(SHOP + '/index/' + getUrlParam('memberId') + '/pd' + getUrlParam('goodsId') + '.html');
    });
    //点击打电话
    $("#tel").click(function(){
        pagePoint(0,4);
    });
    // 分享 按钮
    $('#share').click(function() {
        $('html,body').css({ height: '100%',overflow: 'hidden' });
        //$('body').css({ height: '100%', overflow: 'hidden' });
        $('#shareWrap').css('display', 'flex');
    });
    $('#shareWrap').click(function() {
        $('html,body').css({ height: 'auto','overflow-y': 'auto','overflow-x': 'hidden'});
        //$('body').css({ height: 'auto', overflow: 'auto' });
        $('#shareWrap').css('display', 'none');
        //$("html,body").animate({ scrollTop: $('.outBox').height() }, 0);
    });


    // 微信自定义分享
    function wxShare(goodsImgUrl,desc) {
        //pictureUrl:当前页面信息图片，如果没有默认dan_logo.png
        // var pictureUrl = 'http://baokuan.99114.cn/images/dan_logo.png';
        var pictureUrl = goodsImgUrl;
        if(pictureUrl == null || pictureUrl == '' || typeof(pictureUrl) == "undefined") {
            pictureUrl = "http://zt.99114.com/latform/test/images/dan_logo.png";     //修改 必须是绝对路径
        } else {
            var urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            var pictureUrl2 = urlReg.exec(pictureUrl);
            if(pictureUrl2 == "static.99114.cn" || pictureUrl2 == "static.99114.com") {
                pictureUrl = "http://zt.99114.com/latform/test/images/dan_logo.png";  //修改 必须是绝对路径
            }
        }
        var share_config = {
            "share": {
                imgUrl: goodsImgUrl,//'http://baokuan.99114.cn/images/dan_logo.png',//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
                title: '热销传奇 网库精选',      //分享卡片标题
                link: window.location.href + '&isShare=true',   //分享出去后的链接，这里可以将链接设置为另一个页面。
                desc: desc,       //摘要,如果分享到朋友圈的话，不显示摘要。
                'success':function(){           //分享成功后的回调函数
                    $('#shareWrap').click();
                },
                'cancel': function () {
                    $('#shareWrap').click();
                }
            }
        };
        wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.onMenuShareAppMessage(share_config.share); //分享到好友
            wx.onMenuShareTimeline(share_config.share);   //分享到朋友圈
            wx.onMenuShareQQ(share_config.share);         //分享到手机QQ
            wx.onMenuShareWeibo(share_config.share);      //分享到微博
        });
    }
}());
