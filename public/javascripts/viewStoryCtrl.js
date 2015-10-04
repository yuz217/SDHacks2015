myApp.controller('viewStoryCtrl',function($scope)
{
	console.log('viewStoryCtrl');
	//$scope.stories = [];
	/*$.get("http://45.55.30.181:3000/getStories", {}, function(data)
	{
		//var parsed = JSON.parse(data);

		var parsed = data;
		for (var i = 0; i < parsed.length; i++)
		{
			var obj = parsed[i];
			if (obj.isComplete)
			{
				$scope.stories.push({
				storyID:obj.storyID,
				time:obj.time,
				views:obj.views,
				firstSentence:obj.firstSentence
				});
			}
		}

		$scope.$digest();
	})*/
})