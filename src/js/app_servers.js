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