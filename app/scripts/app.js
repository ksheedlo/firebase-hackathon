'use strict';

angular.module('firebaseHackathonApp', ['ngRoute', 'ngAnimate', 'firebase'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'listCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['angularFire', 'angularFireAuth', '$rootScope', function(angularFire, angularFireAuth, $rootScope){
    var url = 'https://refridge.firebaseio.com/';
    angularFire(url, $rootScope, 'refridge', {});
    angularFireAuth.initialize(url, { scope: $rootScope, name: 'user'});
  }]);
