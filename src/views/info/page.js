

myApp.controller("infoController", function ($rootScope, $scope, services, $timeout, $state, $stateParams) {
  console.log('this is info page')
  console.log($stateParams)
  $scope.id = $stateParams.id;
  $scope.title = $stateParams.name;
})