var myApp = angular.module('fin', []);

myApp.controller('ReadCtrl',function($scope)
{
	console.log('ReadCtrl');
	$scope.firstStory = "Justin used to eat meatballs everyday until...";
	$scope.firstDate = "3 minutes ago";
	$scope.firstViews = "69 Views";
})
