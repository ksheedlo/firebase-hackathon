'use strict';

angular.module('firebaseHackathonApp')
  .controller('list', ['$scope', '$http', 'angularFire', 'angularFireAuth',
    function ($scope, $http, angularFire, angularFireAuth) {
      var API_BASE = 'https://api.github.com/';

      $scope.issues = [];
      $scope.get_issues = function() {
        var profile = 'angular';
        var project = 'angular.js';
        var issues_url = API_BASE + 'repos/' + profile + '/' + project + '/issues';

        $http.get(issues_url).success(function(data) {
          $scope.issues = data;
        });
      };
    }]);
