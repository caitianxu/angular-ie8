angular.module('myDirectives', [])
  .directive('pop', [function () {
    return {
      restrict: 'ECAM',
      template: '<div class="message-tips">xxx</div>',
      replace: true,
      link: function(scope, el, attr){
        console.log('dir')
      }
    }
  }])