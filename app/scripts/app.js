'use strict';

angular.module('firebaseHackathonApp', ['ngRoute', 'ngAnimate', 'firebase'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['angularFire', 'angularFireAuth', '$rootScope', function(angularFire, angularFireAuth, $rootScope){
    var url = 'https://github-issues.firebaseio.com/';
    angularFire(url, $rootScope, 'firebase', {});
    angularFireAuth.initialize(url, { scope: $rootScope, name: 'user'});
    $rootScope.login = function() {
      angularFireAuth.login('github');
    };
    $rootScope.logout = function() {
      angularFireAuth.logout();
    };
  }]);
