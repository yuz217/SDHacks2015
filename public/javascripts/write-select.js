myApp.controller('writeSelectCtrl', function($scope) {
	console.log('writeSelectCtrl');
	$scope.stories = [];
	$.get("http://45.55.4.115:3000/getStories", {}, function(data)
	{
		//var parsed = JSON.parse(data);

		var parsed = data;
		for (var i = 0; i < parsed.length; i++)
		{
			var obj = parsed[i];

			if(!obj.isComplete) {
				$scope.stories.push({
					storyID:obj.storyID,
					numUsers:obj.numUsers,
					firstSentence:obj.firstSentence
				});
			}
		}

		$scope.$digest();
	});

		$scope.goToWriteStory = function(id)
	{
		console.log("Going to write story" + id);
		window.location = "/write/story?storyID=" + id;
	}
});
