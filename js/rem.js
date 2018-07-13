window.onresize= function () {
    if(window.devicePixelRatio==1){
        window.location.reload()
    }
}
var pixelRatio = 1 / window.devicePixelRatio;
if(window.devicePixelRatio>1){
    //通过js动态设置视口(viewport)
    document.write('<meta name="viewport" content="width=device-width, user-scalable=no,initial-scale='+pixelRatio+',minimum-scale='+pixelRatio+',' +
        'maximum-scale='+pixelRatio+'" />');
    // 获取html节点
    var html = document.getElementsByTagName('html')[0];
    // 获取屏幕宽度
    var pageWidth = html.getBoundingClientRect().width;
    // 屏幕宽度 / 固定数值 = 基准值
    html.style.fontSize = pageWidth / 37.5 + "px";
}else{
    document.write('<meta  name="viewport" content="width=device-width,initial-scale=0.25,minimum-scale=0.25,maximum-scale=0.25">');
    var html = document.getElementsByTagName('html')[0];
    // 获取屏幕宽度
    html.style.maxWidth = 1000+'px'
    html.style.fontSize = 26.7 + "px";
    html.style.margin = "0 auto";
}
