/**
 * Created by admin on 2018/7/19.
 */
$(function(){
    $(".layui-logo-a").hover(function()
    {
        console.log("dd");
        $(this).find(".layui-logo-ul").show();
    },function()
    {
        $(this).find(".layui-logo-ul").hide();
    })
});