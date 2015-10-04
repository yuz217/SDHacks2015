myApp.controller('StoryCtrl', function($scope, $sce) {
    var socket = io();

    $scope.message = "";
    $scope.messageList = [];

    $scope.time = 15;

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

    socket.on('emit time', function(time){
        if(begin) {
            $scope.$apply(function() {
                $scope.time = time
            });
        }
    });

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

                addSentence($scope.messageList[$scope.messageList.length]);
                // load into database: $scope.messageList[$scope.messageList.length]

                messageCounter++;
            }
            else {
                loadDatabase();
                // CALL DATABASE LOAD HERE and then start
            }
            $('#inputArea').prop('disabled', false);
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

    function addSentence(sentence) {
        $.get("http://45.55.30.181:3000/addSentence", {storyID: 100, sentence: sentence, author: document.cookie }, function(data) {

        });
    }
});
