/**
 * Created by admin on 2018/5/23.
 */
var fs = require('fs');//文件
//1.写(会把原来的内容清除掉)
//同步写
//第一个参数：地址，第二个参数：内容，第三个参数：文本格式
var res = fs.writeFileSync('www/w1.txt','第一个文字','utf8');
console.log(res);
console.log("111");

//异步写
//第一个参数：地址，第二个参数：内容，第三个参数：文本格式，第四个参数：回调函数
fs.writeFile('www/t1.txt','66666','utf8',function(err){
    console.log(err);
    if(err){
        console.log("写入失败");
        throw  err;
    }
    console.log("写入成功");
});
console.log("222");

//2.读
//同步读
var data = fs.readFileSync('www/w1.txt','utf8');
console.log(data);

//异步读
fs.readFile('www/t1.txt','utf8',function(err,data){
    console.log(err);
    //console.log(data.toString());
    if(err){
        console.log("读错了");
        throw err;
    }
    //console.log(data.toString());
    console.log(data);
});

//3.文件是否存在
var res1 = fs.existsSync('www/index.html');
console.log(res1);

fs.exists('www/w1.txt',function(res){
    console.log(res);
});

//4.向文件后边追加文件
//同步追加
var res2= fs.appendFileSync('www/log.txt','这是日志文件'+ new Date(),'utf8');
console.log(res2);

//异步追加
fs.appendFile('www/log.txt','\n 这是异步的数据'+ new Date(),function(err){
    if(err){
        console.log('添加失败');
        throw err;
    }
    console.log('添加成功')

});

//5.文件监听（文件发生改变时使用的函数）
fs.watchFile('www/t1.txt',function(a,b){
    console.log("a="+a);
    console.log("b="+b);
});


