var myapp = angular.module('myapp',['ui.router']); //ui.router:引入的第三方框架
//console.log(myapp);

//配置
myapp.config(['$stateProvider','$urlRouteProvider',
    function($stateProvider,$urlRouterProvider){ //$stateProvider依赖项：对需要的路由进行配置；$urlRouteProvider依赖项：前面路由不满足时使用这个

    $stateProvider.state('home',{  //配置路由
        url:'/home',
        views:{
            head:{
                template:'<h1>头部的内容</h1>'
            },
            body:{
                //template:'<h1>主体的内容</h1>'
                templateUrl:''
            },
            foot:{
                template:'<h1>页面的内容</h1>'
            }
        }

    });
    $urlRouterProvider.otherwise('/home');

}]);