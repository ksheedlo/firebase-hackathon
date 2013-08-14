'use strict';

angular.module('firebaseHackathonApp', ['ngRoute', 'ngAnimate', 'firebase', 'ui.keypress'])
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
    var url = 'https://github-issues.firebaseio.com/repos';
    angularFire(url, $rootScope, 'repos', {});
    angularFireAuth.initialize(url, { scope: $rootScope, name: 'user'});
    $rootScope.login = function() {
      angularFireAuth.login('github');
    };
    $rootScope.logout = function() {
      angularFireAuth.logout();
    };
    $rootScope.$on("angularFireAuth:login", function(evt, user) {
      $rootScope.user = user;
    });
  }]);
