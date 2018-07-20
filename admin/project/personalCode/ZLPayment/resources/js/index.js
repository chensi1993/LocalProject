/**
 * Created by chensi on 2018/7/19.
 */
var $,tab;
layui.config({
    base: 'resource/js/' //静态资源所在路径
}).use(['bodyTab','form','element','layer','jquery'],function(){
    var form = layui.form(),
        element = layui.element,
        layer = layui.layer,
        $ = layui.jquery;
        tab = layui.bodyTab({
        openTabNum : "50",  //最大可打开窗口数量
        url : "json/navs.json" //获取菜单json地址
    });



    //左侧用户信息划过用户认证展开显示
    $(".layui-logo-a").hover(function()
    {
        $(this).find(".layui-logo-ul").show();
    },function()
    {
        $(this).find(".layui-logo-ul").hide();
    });

    //隐藏左侧导航
    $(".layadmin-flexible").click(function(){
        $("#LAY_app").toggleClass("layadmin-side-shrink");

    })


});