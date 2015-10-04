myApp.controller('StoryCtrl', function($scope, $sce) {
    var socket = io();

    $scope.message = "";
    $scope.messageList = [];

    var votesList;
    var messageCounter = 0;

    var begin = false;

    $('#inputArea').prop('disabled', true);

    $scope.sendMessage = function() {
        socket.emit('chat message', $scope.message, document.cookie);
        $scope.message = "";
        $('#inputArea').prop('disabled', true);
        $('#sendButton').prop('disabled', true);
        $('#sendButton').addClass("btn-default");
        $('#sendButton').removeClass("btn-primary");
    };

    $scope.vote = function(index) {
        if(begin) {
            $('#vote' + index).prop('disabled', true);
            $('#vote' + index).removeClass("btn-default");
            $('#vote' + index).addClass("btn-success");
            socket.emit('vote', index);
        }
    };

    socket.on('emit message', function(msg, author){
        if(begin) {
            $scope.$apply(function() {
                $scope.messageList.push({ msg: msg, votes: 0, author: author });
            });
        }
    });

    socket.on('emit start vote', function() {
        if(begin) {
            $scope.$apply(function() {
                $('#inputArea').prop('disabled', true);
                $('#sendButton').prop('disabled', true);
                $('#sendButton').addClass("btn-default");
                $('#sendButton').removeClass("btn-primary");
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

                if($scope.messageList[$scope.messageList.length-1] != null)
                    addSentence($scope.messageList[$scope.messageList.length-1]);

                messageCounter++;
            }
            else {
                setTimeout(loadDatabase, 1000)
            }
            $('#inputArea').prop('disabled', false);
            $('#sendButton').prop('disabled', false);
            $('#sendButton').addClass("btn-primary");
            $('#sendButton').removeClass("btn-default");
        });
        socket.emit('start vote timer');
        begin = true;
    });

    function loadDatabase() {
        $.get("http://45.55.30.181:3000/getSentences", {storyID: 100}, function(data)
        {
            messageCounter = data.length;
            for (var i = 0; i < data.length; i++)
            {
                var obj = data[i];
                $scope.messageList.push({
                    msg: obj.sentence,
                    votes: 0
                });
            }

            $scope.$digest();
            $("#messageList div button").remove();
        });
    }

    function addSentence(message) {
        $.get("http://45.55.30.181:3000/addSentence", {storyID: 100, sentence: message.msg, author: message.author }, function(data) {

        });
    }
});
