'use strict';

angular.module('firebaseHackathonApp')
.controller('listCtrl', ['$scope', '$http', 'angularFire', '$routeParams',
	function ($scope, $http, angularFire, $routeParams) {
		var API_BASE = 'https://api.github.com/';
		var issues_url = API_BASE + 'repos/' + $routeParams.profile + '/' + $routeParams.project + '/issues';
		$scope.issues = [];
		$scope.get_issues = function() {

			$http.get(issues_url).success(function(data) {
				$scope.issues = data;
			});
		};

		$scope.get_issues();
		$scope.key = encode($routeParams.profile+'/'+$routeParams.project);

		$scope.$watch('repos', function(newVal){
			if (newVal && !newVal[$scope.key])
				$scope.repos[$scope.key] = { issues: {}, tags: {}, options: {} };
		});

		$scope.save = function(issue) {
			if (!$scope.repos[$scope.key][issue.id])
				$scope.repos[$scope.key][issue.id] = { labels: {}, totals: {} };
			var firebase = $scope.repos[$scope.key][issue.id];
			firebase.labels[encode($scope.user.login)] = issue.public_tags;
		};
	}]);




function encode(val) {
	return encodeURIComponent(val).replace(/\./g, '%2E');
}

function decode(val) {
	return decodeURIComponent(val);
}