/**
 * Created by admin on 2018/6/28.
 */
//var express = require('express');
//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//
//var app = express(); //实例化对象
//
////配置表单提交插件
//app.use(cookieParser());
//app.use(bodyParser.urlencoded({extended:false}));
//
////处理目录的get请求
//app.get('/',function(req,res){
//
//    app.sendFile('public/main.html');
//    console.log('main page is required');
//});
//
////处理login的get请求
//app.get('/add',function(req,res){
//    app.sendFile('public/add.html');
//    console.log('add page is required');
//});
//
////处理login的post请求
//app.post('/login',function(req,res){
//    name = req.body.name;
//    pwd = req.body.pwd;
//    console.log(name+'--'+pwd) ;
//    res.status(200).send(name+'--'+pwd) ;
//});


/* cookie的读取和存储 */
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

// 获取cookie记录
app.get('/',function (req,res) {
    var arr = [];
    for (var key in req.cookies){
        // console.log(req.cookies[key])
        for(var i = 0;i < req.cookies[key].length;i++){
            arr.push(decodeURI(req.cookies[key][i]))
        }

    }
    res.send('浏览记录' + arr)
});

// 存储cookie  eg:http://127.0.0.1:3000/trip?area=杭州
app.get('/trip',function (req,res) {
    // 获取区域
    var area = encodeURI(req.query.area);
    // 读取该区域的cookie值，我们以数组形式存储 eg:[‘browsercookie‘]
    var areaCookie = req.cookies.area || [];

    areaCookie.push(area);
    // console.log(areaCookie)
    // maxAge失效时间 以毫秒为单位
    res.cookie(area,areaCookie,{maxAge:15 * 60 * 1000,httpOnly:true});
    res.send(decodeURI(area) + '旅游')
});
//app.listen(3000);

// 监听3030端口
//var server=app.listen(3030) ;
app.listen(3030,function(err){
    if(err){
        console.log("监听失败");
        throw err;
    }
    console.log("服务器开启成功，端口号为3030");
});