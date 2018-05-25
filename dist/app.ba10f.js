webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1)
__webpack_require__(2)
__webpack_require__(3)
__webpack_require__(4)
__webpack_require__(5)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

window.myApp = angular.module("app", ["myDirectives", "myServices", "oc.lazyLoad", "ui.router"]);
myApp.run(["$rootScope", "services", "$sce", "pop",
  function ($rootScope, services, $sce, pop) {
    console.log('run')
    //自定义组件
    $rootScope.pop = pop;
    //全局公共变量
    $rootScope.isPro = true;
    $rootScope.ctxPath =  true ? '' : '';
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
myApp.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
  console.log('config')
  myApp.controller = $controllerProvider.register;
  myApp.directive = $compileProvider.directive;
  myApp.filter = $filterProvider.register;
  myApp.factory = $provide.factory;
  myApp.service = $provide.service;
  myApp.constant = $provide.constant;

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
          "./views/index/page.css",
          "./views/index/page.js"
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
          "./views/info/page.css",
          "./views/info/page.js"
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
        return $ocLazyLoad.load(["./views/error/page.css"])
      }]
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

angular.module('myDirectives', [])
  .directive('pop', function () {
    return {
      restrict: 'ECAM',
      template: '<div class="ng-pop" ng-if="pop.visible">' +
        '<div class="ng-pop-bg">' +
        '<div class="ng-pop-content">' +
        '<div class="ng-pop-title"><span ng-bind="pop.title"></span><label class="ng-pop-close iconfont icon-close" ng-click="pop.close()"></label></div>' +
        '<div class="ng-pop-text" ng-bind="pop.message"></div>' +
        '<div class="ng-pop-action">' +
        '<button class="btn" ng-click="pop.confirm_default()">确定</button>' +
        '<button class="btn btn-default" ng-if="pop.showCancel" ng-click="pop.cancel_default()">取消</button>' +
        '</div></div></div></div>',
      replace: true,
      link: function (scope, element, attr) {
        console.log('link')
      }
    }
  })
  .provider('pop', function () {
    document.body.appendChild(document.createElement('pop'));
    this.$get = function () {
      return {
        title: "提示",
        message: "消息内容",
        visible: false,
        showCancel: false,
        alert: function (title, message, confirm_back) {
          this.title = title;
          this.message = message;
          this.confirm_back = confirm_back;
          this.cancel_back = null;
          this.showCancel = false;
          this.visible = true;
        },
        confirm: function (title, message, confirm_back, cancel_back) {
          this.title = title;
          this.message = message;
          this.confirm_back = confirm_back;
          this.cancel_back = cancel_back;
          this.showCancel = true;
          this.visible = true;
        },
        close: function () {
          this.visible = false;
        },
        confirm_back: null,
        cancel_back: null,
        confirm_default: function () {
          this.close();
          if (this.confirm_back) {
            this.confirm_back();
          }
        },
        cancel_default: function () {
          this.close();
          if (this.cancel_back) {
            this.cancel_back();
          }
        }
      }
    }
  })
  .directive('dialog', function () {
    return {
      restrict: 'ECAM',
      template: '<div class="ng-dialog" ng-show="visible" ng-style="body"><div class="ng-dialog-bg" ng-class="{\'ng-dialog-bg-color\': !pmp.hideshade}">' +
        '<div class="ng-dialog-plan" ng-style="content">' +
        '<div class="ng-dialog-title" ng-if="!pmp.hidetitle"><label ng-bind="pmp.title"></label>' +
        '<ul>' +
        '<li class="top-action-min" ng-click="minmax()">' +
        '<span class="iconfont icon-minus" ng-hide="pmp.min"></span>' +
        '<span class="iconfont icon-block" ng-show="pmp.min"></span>' +
        '</li>' +
        '<li class="top-action-min" ng-click="maxmin()" ng-hide="pmp.min">' +
        '<span class="iconfont icon-arrawsalt" ng-show="!pmp.max"></span>' +
        '<span class="iconfont icon-shrink" ng-show="pmp.max"></span>' +
        '</li>' +
        '<li class="top-action-min" ng-click="closeDialog()"><span class="iconfont icon-close"></span></li>' +
        '</ul>' +
        '</div>' +
        '<div class="ng-dialog-content" ng-style="{\'height\': pmp.contentHeight + \'px\'}" ng-transclude></div>' +
        '<div class="ng-dialog-action" ng-if="!pmp.hideaction">' +
        '<button class="btn" ng-bind="pmp.confirmText"></button>' +
        '<button class="btn btn-default" ng-bind="pmp.cancelText"></button>' +
        '</div>' +
        '</div></div></div>',
      replace: true,
      transclude: true,
      scope: {
        visible: '=visible', //是否显示
        cancel: '&cancel', //取消回调
        confirm: '&confirm', //确认回调
      },
      link: function (scope, element, attr) {
        scope.pmp = {
          allWidth: document.body.clientWidth,
          allHeight: document.body.clientHeight,
          width: attr.width || 520,
          height: attr.height || 200,
          contentHeight: (attr.height || 200) - 100,
          top: 0,
          left: 0,
          title: attr.title || '',
          drag: attr.drag === 'true' ? true : false, //是否可以拖动
          hidetitle: attr.hidetitle === 'true' ? true : false, //隐藏标题栏
          hideaction: attr.hideaction === 'true' ? true : false, //隐藏操作栏
          hideshade: attr.hideshade === 'true' ? true : false, //隐藏遮罩层
          confirmText: attr.confirmtext || '确定',
          cancelText: attr.canceltext || '取消',
          max: attr.max === 'true' ? true : false, //是否全屏化窗口
          min: attr.min === 'true' ? true : false, //是否最小化窗口
        }
        //外层样式
        scope.body = {
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }
        //内容样式
        scope.content = {
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }
        //取消事件
        scope.cancelEvent = function () {
          scope.visible = false;
          scope.pmp.min = false;
        }
        //确认事件
        scope.confirmEvent = function () {
          scope.visible = false;
          scope.pmp.min = false;
        }
        //全屏化切换
        scope.maxmin = function () {
          scope.pmp.max = !scope.pmp.max;
          scope.pmp.min = false;
          scope.changeSize();
        }
        //最小化
        scope.minmax = function () {
          scope.pmp.min = !scope.pmp.min;
          scope.changeSize();
        }
        //重新计算定位
        scope.changeSize = function () {
          $('html').css("overflow", "hidden");
          scope.pmp.allWidth = document.body.clientWidth;
          scope.pmp.allHeight = document.body.clientHeight;
          if (scope.pmp.max) {
            scope.pmp.width = scope.pmp.allWidth;
            scope.pmp.height = scope.pmp.allHeight;
            scope.pmp.left = 0;
            scope.pmp.top = 0;
          } else {
            $('html').css("overflow", "");
            scope.pmp.width = attr.width || 520;
            scope.pmp.height = attr.height || 200;
            scope.pmp.left = (scope.pmp.allWidth - scope.pmp.width) / 2;
            scope.pmp.top = (scope.pmp.allHeight - scope.pmp.height) / 2;
          }
          scope.pmp.contentHeight = scope.pmp.height - 100;
          if (scope.pmp.hidetitle) scope.pmp.contentHeight += 45;
          if (scope.pmp.hideaction) scope.pmp.contentHeight += 55;
          //没有遮罩
          if (scope.pmp.hideshade) {
            scope.body = {
              width: scope.pmp.width + 'px',
              height: scope.pmp.height + 'px',
              top: scope.pmp.top + 'px',
              left: scope.pmp.left + 'px',
            }
            scope.content = {
              width: scope.pmp.width + 'px',
              height: scope.pmp.height + 'px',
              left: 0,
              top: 0
            }
          } else {
            scope.body = {
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }
            scope.content = {
              width: scope.pmp.width + 'px',
              height: scope.pmp.height + 'px',
              top: scope.pmp.top + 'px',
              left: scope.pmp.left + 'px',
            }
          }
          //最小化
          if (scope.pmp.min) {
            scope.body = {
              width: '280px',
              height: '45px',
              bottom: 0,
              left: 0,
              top: 'auto'
            }
            scope.content = {
              width: '100%',
              height: 0,
              top: 0,
              left: 0,
            }
          }
        }
        //关闭
        scope.closeDialog = function () {
          scope.visible = false;
        }
        //初始化状态
        scope.changeSize();
        //窗口监控
        jQuery(window).resize(function () {
          if (scope.visible) {
            scope.$apply(function () {
              scope.changeSize();
            })
          }
        });
        //监控显示
        scope.$watch('visible', function (n) {
          if (n) {
            scope.pmp.min = false;
            scope.changeSize()
          };
        })
      }
    }
  })

/***/ }),
/* 5 */
/***/ (function(module, exports) {

angular.module("myServices", []).factory('services', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
   * 服务端请求模板
   * @param url 服务端请求url
   * @param param 请求参数
   * @param ajaxType post\get,默认是post
   */
  var serverAction = $rootScope.serverAction = function (url, param, type) {
    param = param ? param : {};
    type = type || 'GET';
    param['uid'] = $rootScope.uid;
    param['token'] = $rootScope.token;
    if (type == "GET") {
      if (typeof param === 'object') {
        url = url + "?" + $.param(param);
      }
      return $http.get(url);
    } else {
      var _postCfg = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        transformRequest: function (d) {
          return $.param(d, true);
        }
      };
      return $http.post(url, param, _postCfg);
    }
  }

  var api = {
    //退出登录
    _logup: function (param, type) {
      return serverAction($rootScope.ctxPath + '/logout', param, type);
    },
    //用户登录
    _loginQQ: function (param, type) {
      return serverAction($rootScope.ctxPath + '/login', param, type);
    },
    //用户信息
    _getUserInfo: function (param, type) {
      return serverAction($rootScope.ctxPath + '/getUserInfoByUid', param, type);
    }
  }
  console.log('server')
  return api;
}])

/***/ })
],[0]);