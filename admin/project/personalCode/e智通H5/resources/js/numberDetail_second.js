/**
 * Created by admin on 2018/4/3.
 */
//$(function(){
//    //页面加载时显示条形码
//    createBarcode('div128','1234567890123456789012345678','C');
//});

$(function(){
    JsBarcode("#barcode3", "12345678901234567890", {
        format: "CODE128",
        width:2,
        height:80,
        displayValue:true,
        fontSize:16
    });
    //code128();
});


//function code128(){
//    $("#bcTarget").empty().barcode("1234567890123456789012345678", "code128",{barWidth:1, barHeight:60,showHRI:true});
//    //$("#bcTarget").empty().barcode("699F795F3B557D80E053376010AC21C3", "code128",{barWidth:1, barHeight:60,showHRI:true});
//}
