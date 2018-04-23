angular.module('myServices', []).factory('services', ['$http', '$rootScope', function ($http, $rootScope) {
    /**
     * 服务端请求模板
     * @param url 服务端请求url
     * @param param 请求参数
     * @param ajaxType post\get,默认是post
     * @param needFormPostCfg 是否需要表单提交参数
     * @returns {*}
     */
    $rootScope.serverAction = function (url, param, ajaxType, needFormPostCfg) {
        var type = ajaxType;
        if (type == null || type == "") {
            type = "POST";
        }
        if (!param) {
            param = {
                token: $rootScope.token
            };
        }
        if (type == "GET") {
            if ($.param(param)) {
                url = url + "?" + $.param(param);
            }
            return $http({
                method: 'GET',
                url: url
            }).error(function (data, state) {
                console.log("系统错误:" + url.replace("?", "") + state);
            })
        }
        else {
            var _postCfg = {};
            if (needFormPostCfg) {
                _postCfg = {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: function (d) {
                        return $.param(d);
                    }
                };
            }
            var loading = layer.load(1);
            return $http.post(url, param, _postCfg).error(function (data, state) {
                console.log("系统错误:" + url.replace("?", "") + state);
                layer.close(loading);
            }).success(function (res) {
                if (res.code == 600) {
                    $rootScope.sessionOut();
                }
                layer.close(loading);
            })
        }
    }
    var serviceAPI = {
        //退出登录
        _logup: function (param) {
            return $rootScope.serverAction(ctxPath + '/admin/logout', param, "POST");
        },
        //用户登录信息-登录
        _login: function (param) {
            return $rootScope.serverAction(ctxPath + '/admin/login', param, "POST");
        },

    };
    return serviceAPI;
}])