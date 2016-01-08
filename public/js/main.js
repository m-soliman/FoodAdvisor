var angular = require('angular');
require('angular-route');

var app = angular.module('foodAdvisor', ['ngRoute']);

app.controller('homeCtrl', function(){

});

app.controller('loginCtrl', ['$scope', '$http', function($scope, $http){
  $scope.login = function() {
    $http.post("/login", {
      username: $scope.username,
      password: $scope.password
    }).then(function(response) {
      if (response.data.success) {
        alert('Yeah!');
      } else {
        alert('Buh!');
      }
    });
  }
}]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'partials/home',
    controller: 'homeCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/login',
    controller: 'loginCtrl'
  })
  .otherwise({
    redirectTo: '/home'
  });
}]);

//$httpProvider.responseInterceptors.push(require('./interceptors/authentication.js'));
