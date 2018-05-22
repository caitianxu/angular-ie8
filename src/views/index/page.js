myApp.controller("indexController", function ($rootScope, $scope, services, $timeout, $state) {
  console.log('this is index page')
  services["_data_list_json"] = function (param, type) {
    return $rootScope.serverAction('http://react-china.org/top.json', param, type);
  }
  $scope.param = {
    taskName: null,
    type: null
  };
  $scope.dataList = [];
  var list = window.sessionStorage.getItem("DATALIST");
  if (list && list != "") {
    angular.forEach(JSON.parse(list), function (element) {
      $scope.dataList.push({
        title: element.title,
        id: element.id,
        state: element.state
      });
    });
  } else {
    services._data_list_json({
      order: 'default',
      _: 1526955151301
    }).success(function (res) {
      angular.forEach(res.topic_list.topics, function (item) {
        $scope.dataList.push({
          title: item.title,
          id: $scope.dataList.length,
          state: 0
        });
      })
    })
  }
  $scope.submitTask = function () {
    if ($scope.param.taskName && $scope.param.taskName != "") {
      $scope.dataList.push({
        title: $scope.param.taskName,
        id: $scope.dataList.length,
        state: 0
      });
      $scope.param.taskName = null;
    }
  }
  $scope.$watch('dataList', function (new_f, old_f) {
    window.sessionStorage.setItem("DATALIST", JSON.stringify(new_f));
  }, true);
  $scope.myFilter = function (item) {
    if ($scope.param.type === null) {
      return true;
    } else {
      return item.state === $scope.param.type
    }
  }
})