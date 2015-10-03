var myApp = angular.module('fin', []);

myApp.controller('writeSelectCtrl', function($scope) {
	console.log('writeSelectCtrl');
	$scope.stories = [];
	$.get("http://45.55.30.181:3000/getStories", {}, function(data)
	{
		//var parsed = JSON.parse(data);

		var parsed = data;
		for (var i = 0; i < parsed.length; i++)
		{
			var obj = parsed[i];
			if (!obj.isComplete)
			{
				$scope.stories.push({
				storyID:obj.storyID,
				numUsers:obj.numUsers,
				firstSentence:obj.firstSentence
				});
			}
		}

		$scope.$digest();
	})
});