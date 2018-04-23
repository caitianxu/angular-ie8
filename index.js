require("./src/app_directives.js");
require("./src/app_services.js");
window.myApp = myApp = angular.module("app", [
    "myDirectives",
    "myServices",
    "oc.lazyLoad",
    "ui.router"
]).run(["$rootScope", "services", function ($rootScope, services) {
    console.log("main root")
    console.log(services)
}]);

/**
 * http 拦截器
 */
myApp.factory("authInterceptor", ["$rootScope", "$q", "$window", function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                console.log("session out")
            }
            return $q.reject(rejection);
        },
        response: function (response) {
            if (response.code == 600) {
                console.log("session out")
            }
            return response;
        }
    };
}]);

/**
 * 添加拦截器
 */
myApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
});

/**
 * 主控制器
 */
myApp.controller("mainController", ["$rootScope", "$scope", function ($rootScope, $scope) {
    console.log("main")
}]);

/**
 * 模块加载拦截器
 */
myApp.run(["$rootScope", "$state", "$window", function ($rootScope, $state, $window) {
    //开始加载新页面
    $rootScope.$on("$stateChangeStart", function (event, toState, fromState, fromParams) {
        console.log("$stateChangeStart")
    });
    //页面加载成功
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        console.log("$stateChangeSuccess")
    });
    //页面加载失败
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        console.log("$stateChangeError")
    });
}]);
/**
 * 路由配置
 */
myApp.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
    myApp.controller = $controllerProvider.register;
    myApp.directive = $compileProvider.directive;
    myApp.filter = $filterProvider.register;
    myApp.factory = $provide.factory;
    myApp.service = $provide.service;
    myApp.constant = $provide.constant;
    var version = (new Date()).getTime();
    //默认页面
    $urlRouterProvider.when("", "/login");
    //不规则页面
    $urlRouterProvider.otherwise("/error");
    //登录
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "./controllers/login/page.html?v=" + version,
        controller: "loginController",
        resolve: {
            loadMyCtrl: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["./controllers/login/page.css?v=" + version, "./controllers/login/page.js?v=" + version])
            }]
        }
    });
    //错误页面
    $stateProvider.state("error", {
        url: "/error",
        templateUrl: "./controllers/error/page.html?v=" + version,
        resolve: {
            loadMyCtrl: ["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load(["./controllers/error/page.cssv=" + version])
            }]
        }
    });
});