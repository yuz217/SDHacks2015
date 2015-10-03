myApp.controller('socketCtrl', function($scope, $sce) {
    var socket = io();

    $scope.message = "";
    $scope.messagesListSafe = "";

    var messagesList = [];
    var votesList = [];
    var count = 0;

    $scope.sendMessage = function() {
        //console.log($scope.message);
        socket.emit('chat message', $scope.message);
    };

    socket.on('emit message', function(msg){
        messagesList.push(msg);
        $scope.$apply(function() {
            postMessages();
        });
    });

    $scope.end = function() {
        messagesList.splice(1, messagesList.length);
        postMessages();
    };

    function postMessages() {
        var messagesHtmlList = [];
        for(var i = 0; i < messagesList.length; i++) {
            votesList.push("vote" + count);
            var voteNum = "vote" + i;
            messagesHtmlList.push("<li><button id='" + voteNum + "'>Vote" + i + "</button></li>");
        }
        $scope.messagesListSafe = $sce.trustAsHtml(messagesHtmlList.join(''));
        console.log(votesList[0]);
    }
});
