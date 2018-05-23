myApp.controller("infoController", function ($rootScope, $scope, services, $timeout, $state, $stateParams) {
  console.log('this is info page')
  console.log($stateParams)
  $scope.id = $stateParams.id;
  $scope.title = $stateParams.name;
  $scope.toconfirm = function () {
    $rootScope.pop.confirm('提示', $stateParams.name, function () {
      alert('你点击了确定1')
    }, function () {
      alert('你点击了取消1')
    })
  }
  $scope.showBox = false;
})