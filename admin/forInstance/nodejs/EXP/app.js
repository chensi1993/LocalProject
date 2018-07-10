/**
 * Created by admin on 2018/5/29.
 */
var express = require('express');//引入第三方框架
var path = require('path');
var bodyParser = require('body-parser');//表单传参时引入第三方框架

var app = express();//实例化对象

//配置表单提交插件
//bodyParser.json()数据json处理；bodyParser.urlencoded():参数加密处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//表单传参，post请求
app.post('/d',function(req,res){
    var name = req.body.name;
    var age = req.body.age;
    console.log(name);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          66
    var info = {
        name:name,
        age:age
    };
    if(name && age){
        stu.unshift(info);
        res.status(200).json({success:true,msg:"添加成功"});
    }else{
        res.status(200).json({success:false,msg:"添加失败"});
    }
});


//路由传参，传到服务器
var  stu = [
    {name:'www',age:20},
    {name:'rr',age:3},
    {name:'ttt',age:40}
];
app.get('/c/:id',function(req,res){
    var id = req.params.id;
    if(id >= 0 && id < stu.length){
        var info = stu[id];
        res.status(200).json({success:true,msg:'',obj:info});

    }else{
        res.status(200).json({success:false,msg:'查无此人',obj:{}});
    }
});

app.all('/b',function(req,res){ //get和post都能请求
    res.send('这是数据');
});

app.post('/b',function(req,res){
    res.status(200).send('这是post请求');
});

app.get('/a',function(req,res){ //客户端请求以路径'/a'进行请求并且以get方式请求，执行后边的回调函数
    //res.status(200).send('这是get回来的数据');//返回字符串

    var stu = {name:'www',age:20};
    //res.status(200).json(stu);
    res.status(200).json({success:true,obj:stu});


});

//配置默认的访问页面,静态目录
app.use(express.static(path.join(__dirname,'www'))); //配置默认访问页面

//配置访问路径
app.use('/list',function(req,res){
    res.status(200).sendFile(path.join(__dirname,'www','list.html'))
});

//配置错误页面
//*代表所有的文件,可省略不写
app.use('*',function(req,res){
    res.status(200).sendFile(path.join(__dirname,'www','err','404.html'));
});


//监听服务器
app.listen(3000,function(err){
    if(err){
        console.log("监听失败");
        throw err;
    }
    console.log("服务器开启成功，端口号为3000");
});