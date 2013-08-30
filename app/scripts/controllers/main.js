'use strict';

angular.module('firebaseHackathonApp')
.controller('listCtrl', ['$scope', '$http', 'angularFire', '$routeParams', 'issues',
	function ($scope, $http, angularFire, $routeParams, issues) {
		$scope.issues = issues;
        $scope.$watch('repos', function(newVal, oldVal){
           if (newVal) {
               
                var labels = newVal[encode($routeParams.profile+'/'+$routeParams.project)];
                if (labels && labels.labels) {
                    
                    distribute(labels.labels);
                }
           }
        });
        
        function distribute(labels){
            angular.forEach(labels, function(label, i){
               angular.forEach(issues, function(issue){
                   if (i == issue.id) {
                       issue.meta_labels = label.labels;
                   }
               }) 
            });
        }
		$scope.key = encode($routeParams.profile+'/'+$routeParams.project);

		$scope.$watch('repos', function(newVal){
			if (newVal && !newVal[$scope.key])
				$scope.repos[$scope.key] = { issues: {}, labels: {}, options: {} };
		});

		$scope.save = function(issue) {
			if (!$scope.repos[$scope.key][issue.id])
				$scope.repos[$scope.key].labels[issue.id] = { labels: {}, totals: {} };
			var firebase = $scope.repos[$scope.key].labels[issue.id];
			firebase.labels[encode($scope.user.login)] = issue.meta_labels[encode($scope.user.login)];
		};

		$scope.isOwner = function() {
			return $scope.user && ($scope.user.login.toLowerCase() === $scope.key.substr(0,$scope. key.indexOf('%2F')).toLowerCase());
		};
        
        $scope.init = function(issue){
            if (!issue.meta_labels)
                issue.meta_labels = {};
        }
	}]);




function encode(val) {
	return encodeURIComponent(val).replace(/\./g, '%2E');
}

function decode(val) {
	return decodeURIComponent(val);
}