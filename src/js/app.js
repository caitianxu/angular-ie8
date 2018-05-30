window.myApp = angular.module("app", ["myDirectives", "myServices", "oc.lazyLoad", "ui.router"]);
myApp.run(["$rootScope", "services", "$sce", "pop",
  function ($rootScope, services, $sce, pop) {
    console.log('run')
    //自定义组件
    $rootScope.pop = pop;
    //全局公共变量
    $rootScope.isPro = PRODUCTION;
    $rootScope.ctxPath = PRODUCTION ? '' : '';
    $rootScope.token = null;
    $rootScope.uid = null;
    $rootScope.LoginUser = null;
    //开始加载新页面
    $rootScope.$on("$stateChangeStart", function (event, toState, fromState, fromParams) {
      console.log('load success:' + toState.name)
    });
    //页面加载成功
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {});
    //页面加载失败
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {});
  }
]);

//主控制器
myApp.controller("mainController", [
  "$rootScope",
  "$scope",
  "services",
  "$sce",
  "$state",
  "$timeout",
  function ($rootScope, $scope, services, $sce, $state, $timeout) {
    console.log('main')
  }
]);

//路由配置
myApp.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide",
  function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    myApp.controller = $controllerProvider.register;
    myApp.directive = $compileProvider.directive;
    myApp.filter = $filterProvider.register;
    myApp.factory = $provide.factory;
    myApp.service = $provide.service;
    myApp.constant = $provide.constant;
    console.log('config')

    //默认页面
    $urlRouterProvider.when("", "/index");
    //不规则页面
    $urlRouterProvider.otherwise("/error");
    //首页
    $stateProvider.state("index", {
      url: "/index",
      templateUrl: "./views/index/page.html",
      controller: "indexController",
      resolve: {
        loadMyCtrl: ["$ocLazyLoad", function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            PRODUCTION ? "./views/index/page.min.css" : "./views/index/page.css",
            PRODUCTION ? "./views/index/page.min.js" : "./views/index/page.js"
          ])
        }]
      }
    });
    //详情页
    $stateProvider.state("info", {
      url: "/info/:id&:name",
      templateUrl: "./views/info/page.html",
      controller: "infoController",
      resolve: {
        loadMyCtrl: ["$ocLazyLoad", function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            PRODUCTION ? "./views/info/page.min.css" : "./views/info/page.css",
            PRODUCTION ? "./views/info/page.min.js" : "./views/info/page.js"
          ])
        }]
      }
    });
    //错误页
    $stateProvider.state("error", {
      url: "/error",
      templateUrl: "./views/error/page.html",
      resolve: {
        loadMyCtrl: ["$ocLazyLoad", function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            PRODUCTION ? "./views/error/page.min.css" : "./views/error/page.css"
          ])
        }]
      }
    });
  }
]);