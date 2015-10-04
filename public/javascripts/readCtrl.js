var myApp = angular.module('fin', []);

myApp.controller('ReadCtrl',function($scope)
{
	console.log('ReadCtrl');
	$.get("http://45.55.30.181:3000/getStories", {}, function(data)
	{
		//var parsed = JSON.parse(data);

		var parsed = data;
		var count = 0;
		for (var i = 0; i < parsed.length; i++)
		{
			var obj = parsed[i];
			if (obj.isComplete)
			{
				count = count + 1;
				console.log(count);
				switch(count)
				{
					case 1:
						$scope.firstSentence = obj.firstSentence;
						$scope.firstTime = obj.time;
						$scope.firstViews = obj.views;
						break;
					case 2:
						$scope.secondSentence = obj.firstSentence;
						$scope.secondTime = obj.time;
						$scope.secondViews = obj.views;
						break;
					case 3:
						$scope.thirdSentence = obj.firstSentence;
						$scope.thirdTime = obj.time;
						$scope.thirdViews = obj.views;
						break;
					case 4:
						$scope.fourthSentence = obj.firstSentence;
						$scope.fourthTime = obj.time;
						$scope.fourthViews = obj.views;
						break;
					case 5:
						$scope.fifthSentence = obj.firstSentence;
						$scope.fifthTime = obj.time;
						$scope.fifthViews = obj.views;
						break;
					case 6:
						$scope.sixthSentence = obj.firstSentence;
						$scope.sixthTime = obj.time;
						$scope.sixthViews = obj.views;
						break;
				}
			}
		}

		$scope.$digest();
	})
	
	$scope.goToStory = function(id)
	{
		console.log("Going to story" + id);
		window.location = "/viewStory?storyID=" + id;
	}
})
