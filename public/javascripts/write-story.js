myApp.controller('StoryCtrl', function($scope, $sce) {
    var socket = io();

    $scope.message = "";
    $scope.messageList = [];

    var votesList;
    var messageCounter = 0;

    var begin = false;

    $('#inputArea').prop('disabled', true);

    $scope.sendMessage = function() {
        socket.emit('chat message', $scope.message);
        $scope.message = "";
        $('#inputArea').prop('disabled', true);
    };

    $scope.vote = function(index) {
        if(begin) {
            $('#vote' + index).prop('disabled', true);
            $('#vote' + index).removeClass("btn-default");
            $('#vote' + index).addClass("btn-success");
            socket.emit('vote', index);
        }
    };

    socket.on('emit message', function(msg){
        if(begin) {
            $scope.$apply(function() {
                $scope.messageList.push({ msg: msg, votes: 0 });
            });
        }
    });

    socket.on('emit start vote', function() {
        if(begin) {
            $scope.$apply(function() {
                $('#inputArea').prop('disabled', true);
                votesList = [];
                $("#messageList div button").css("visibility", "visible");
                for(var i = 0; i < $scope.messageList.length - messageCounter; i++) {
                    votesList[i] = 0;
                }
            });
            socket.emit('end vote timer');
        }
    });

    socket.on('emit vote', function(index){
        if(begin) {
            $scope.$apply(function() {
                var adjustedIndex = index - messageCounter
                votesList[adjustedIndex] += 1;
                $scope.messageList[index].votes = votesList[adjustedIndex];
            });
        }
    });

    socket.on('emit end vote', function() {
        $scope.$apply(function() {
            if(begin) {
                $("#messageList div button").remove();
                var maxVotesIndex = votesList.indexOf(Math.max.apply(Math, votesList));
                $scope.messageList.splice(messageCounter + maxVotesIndex + 1, $scope.messageList.length - (maxVotesIndex+1));
                $scope.messageList.splice(messageCounter, maxVotesIndex);
                messageCounter++;
            }
            else {
                // CALL DATABASE HERE and then start
            }
            $('#inputArea').prop('disabled', false);
        });
        socket.emit('start vote timer');
        begin = true;
    });
});
