myApp.controller('viewStoryCtrl',function($scope)
{
	console.log('viewStoryCtrl');
	$scope.sentences = [];
	$scope.finished = false;
	$scope.notFinished = true;
	
	$scope.fullStory = "";
	
	var storyID = window.location.search.slice(9);
		
	$.get("http://45.55.30.181:3000/getSentences", {storyID: storyID}, function(data)
	{
		//var parsed = JSON.parse(data);
		for (var i = 0; i < data.length; i++)
		{
			var obj = data[i];
			$scope.sentences.push({
				sentence:obj.sentence,
				author:obj.author	
			});
			
			$scope.fullStory += obj.sentence;
		}
		
		$scope.fullStory += " FiN.";
		
		$scope.curSentence = $scope.sentences[0];

		$scope.$digest();
	});
	
	$scope.clicked = function()
	{
		$scope.sentences.shift();
		
		if ($scope.sentences.length == 0)
		{
			$scope.finished = true;
			$scope.notFinished = false;
		}
		else
		{
			$scope.curSentence = $scope.sentences[0];	
		}
				
		//$scope.$digest();

	}
})
