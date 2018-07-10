/**
 * Created by admin on 2018/5/24.
 */
var http = require('http');
var fs = require('fs');

//创建服务器
var myServer = http.createServer(function(req,res){ //req:客户端请求的变量，res:服务器给客户端写回内容的变量
    //console.log(req);
    //console.log(res);

    var myurl = req.url == '/'?'view/index.html':'view'+req.url;
    console.log(myurl);

    //判断文件是否存在
    if(fs.existsSync(myurl)){
        var html = fs.readFileSync(myurl);
        res.write(html);
    }else{
        var errhtml = fs.readFileSync('view/err/404err.html');
        res.write(errhtml);
    }


    //var html = fs.readFileSync('view/index.html','utf8');
    //res.write(html);
    res.end();
});

//监听服务器
myServer.listen('5050',function(err){
    if(err){
        console.log(err);
        throw err;
    }
    console.log('服务器开启，端口号为5050');
});
