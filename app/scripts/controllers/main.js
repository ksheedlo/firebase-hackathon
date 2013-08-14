'use strict';

angular.module('firebaseHackathonApp')
  .controller('MainCtrl', ['$scope', 'angularFire', 'angularFireAuth', 
    function ($scope, angularFire, angularFireAuth) {
      var API_BASE = 'https://api.github.com/';

      $scope.issues = [];
      $scope.get_issues = function() {
        var profile = 'angular';
        var project = 'angular.js';
        var issues_url = API_BASE + profile + '/' + project + '/issues';

        $http.get(issues_url).success(function(data) {
          $scope.issues = data;
        });
      };
    }]);
