myApp.controller('StoryCtrl', function($scope, $sce) {
    var socket = io();

    $scope.message = "";
    $scope.messageList = [];

    var votesList;
    var messageCounter = 0;

    $scope.sendMessage = function() {
        //console.log($scope.message);
        socket.emit('chat message', $scope.message);
        $scope.message = "";
    };

    socket.on('emit message', function(msg){
        $scope.$apply(function() {
            $scope.messageList.push({ msg: msg, votes: 0 });
        });
    });

    $scope.startVote = function() {
        votesList = [];
        $("#messageList div button").css("visibility", "visible");
        for(var i = 0; i < $scope.messageList.length - messageCounter; i++) {
            votesList[i] = 0;
        }
    };

    $scope.endVote = function() {
        $("#messageList div button").remove();
        var maxVotesIndex = votesList.indexOf(Math.max.apply(Math, votesList));
        $scope.messageList.splice(messageCounter + maxVotesIndex + 1, $scope.messageList.length - (maxVotesIndex+1));
        $scope.messageList.splice(messageCounter, maxVotesIndex);
        messageCounter++;
    };

    $scope.vote = function(index) {
        var adjustedIndex = index - messageCounter
        votesList[adjustedIndex] += 1;
        $scope.messageList[index].votes = votesList[adjustedIndex]
    };
});
