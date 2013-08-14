'use strict';

angular.module('firebaseHackathonApp')
  .controller('listCtrl', ['$scope', '$http', '$routeParams', 'angularFire', 'angularFireAuth',
    function ($scope, $http, $routeParams, angularFire, angularFireAuth) {
      var API_BASE = 'https://api.github.com/';

      $scope.issues = [];
      $scope.get_issues = function() {
        var profile = $routeParams.profile;
        var project = $routeParams.project;
        var issues_url = API_BASE + 'repos/' + profile + '/' + project + '/issues';

        $http.get(issues_url).success(function(data) {
          $scope.issues = data;
        });
      };
      $scope.get_issues();
    }]);
