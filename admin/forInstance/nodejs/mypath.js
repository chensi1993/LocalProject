/**
 * Created by admin on 2018/5/25.
 */
//    处理文件路径
var path = require('path');
console.log(__dirname);//__dirname:系统参数，物理路径，当前文件夹
console.log(__filename);//__filename：当前路径

var a=path.join('www','err','404.html'); //join:连接
console.log(a);

