/**
 * Created by Administrator on 2017/11/4 0004.
 */
window.onload = function () {
  //判断浏览器
  var timestamp = "";
  var pictureUrl = 'http://baokuan.99114.cn/images/dan_logo.png';
  var nonceStr = "";
  var signature = "";
  var url = window.location.href;
  var html = $.ajax({
    type: "post",
    dataType: "json",
    url: "http://webmobile.99114.cn/wxShare/getSign",
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

  //pictureUrl:当前页面信息图片，如果没有默认dan_logo.png
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
      imgUrl: pictureUrl,//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
      title: $('#goodsName').attr('value'),      //分享卡片标题
      link: url,   //分享出去后的链接，这里可以将链接设置为另一个页面。
      desc: $('meta[name="description"]').attr("content"),       //摘要,如果分享到朋友圈的话，不显示摘要。
      "success":function(){           //分享成功后的回调函数
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
};
