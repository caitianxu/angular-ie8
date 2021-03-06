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