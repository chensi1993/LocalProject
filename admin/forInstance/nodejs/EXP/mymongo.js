/**
 * Created by admin on 2018/6/8.
 */
//引入mongoose数据库
var mongoose = require("mongoose");

//1、连接数据库，成功、失败调用回调函数
mongoose.connect("mongodb://172.16.96.149:27017/mydb",function(err){  //
    if(err){
        console.log("连接数据库失败");
        throw err;
    }
    console.log("连接数据库成功");
});

//2、创建模型，即当前程序里边要和数据库里边的内容进行连接，连接是以什么结构进行连接
var stuTable = new mongoose.Schema({  //创建一个模型，并规定属性是什么数据类型
    name:String,
    age:Number
});

//3、关联，即程序里边的模型和数据库表中的表进行关联操作
var stuinfo = mongoose.model('stu',stuTable,'stu');  //第一个参数：当第三个参数没写时，会与数据库表中这个表加s的表连接；第二个参数：模型对象；第三个参数：表明要与数据库当中的哪一个表进行关联

//前三步是准备工作


//查询
stuinfo.find({},function(err,list){
    console.log(list)
});

//更改、添加
stuinfo.update({name:'www'},{$set:{age:999}},function(err){  //第一个参数：查询条件，第二个参数：更改的信息，第三个参数和第四个参数：boole类型
    if(err){
        console.log("修改失败");
        throw err;
    }
    console.log("修改成功")
});

stuinfo.update({name:'tom'},{$set:{age:100}},{multi:true,upsert:true},function(err){  //第一个参数：查询条件；第二个参数：更改的信息；第三个参数和第四个参数：boole类型；multi:true：修改多条记录；upsert:true：条件不存在，添加一条新记录
    if(err){
        console.log("修改失败");
        throw err;
    }
    console.log("修改成功")
});

//删除
stuinfo.remove({name:'www'},function(err){ //第一个参数：没写的话，参数所用的数据；写的话，删除该条件下的数据
    if(err){
        console.log("删除失败");
        throw err;
    }
    console.log("删除成功")

});

//创建表，表存在向表中添加，表不存在创建一个新表
stuinfo.create({name:'zzz',age:70},function(err){
    if(err){
        console.log("创建失败");
        throw err;
    }
    console.log("创建成功")
});