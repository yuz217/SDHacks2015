var myApp = angular.module('fin', []);

myApp.controller('ReadCtrl',function($scope)
{
	console.log('ReadCtrl');
	$.get("http://45.55.30.181:3000/getStories", {}, function(data)
	{
		//var parsed = JSON.parse(data);

		var parsed = data;
		$scope.stories = [];
		for (var i = 0; i < parsed.length; i++)
		{
			var obj = parsed[i];
			$scope.stories.push({
				storyID:obj.storyID,
				time:obj.time,
				views:obj.views,
				firstSentence:obj.firstSentence
			});

		}

		$scope.$digest();
	})

	$scope.goToStory = function(id)
	{
		console.log("Going to story" + id);
		window.location = "/read/story?storyID=" + id;
	}
})
