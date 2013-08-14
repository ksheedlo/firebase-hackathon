'use strict';

angular.module('firebaseHackathonApp')
  .controller('listCtrl', ['$scope', '$http', 'angularFire',
    function ($scope, $http, angularFire) {
      var API_BASE = 'https://api.github.com/';
    var profile = 'angular';
    var project = 'angular.js';
    var issues_url = API_BASE + 'repos/' + profile + '/' + project + '/issues';
      $scope.issues = [];
      $scope.get_issues = function() {

        $http.get(issues_url).success(function(data) {
          $scope.issues = data;
        });
      };
      $scope.get_issues();
      var key = profile+'@@'+project;
      key = key.replace(/\./g, ',');
      $scope.save = function(issue) {
      	if (!$scope.repos[key])
      		$scope.repos[key] = {};
      	if (!$scope.repos[key][issue.id])
      		$scope.repos[key][issue.id] = {};
      	$scope.repos[key][issue.id][$scope.user.login] = issue.public_tags;
      };
    }]);
