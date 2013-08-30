'use strict';

angular.module('firebaseHackathonApp', ['ngRoute', 'ngAnimate', 'firebase', 'ui.keypress'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/:profile/:project', {
        templateUrl: 'views/main.html',
        controller: 'listCtrl',
        resolve: {
          issues: function($http, $route){
            var API_BASE = 'https://api.github.com/';
            var issues_url = API_BASE + 'repos/' + $route.current.params.profile + '/' + $route.current.params.project + '/issues';
            return $http.get(issues_url).then(function(response){
                return response.data;
            });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(['angularFireAuth', '$rootScope', 'angularFire', function(angularFireAuth, $rootScope, angularFire){
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
