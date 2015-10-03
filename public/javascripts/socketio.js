myApp.controller('socketCtrl', function($scope, $sce) {
    var socket = io();

    $scope.message = "";
    $scope.messagesListSafe = "";

    var messagesList = [];

    $scope.sendMessage = function() {
        //console.log($scope.message);
        socket.emit('chat message', $scope.message);
    };

    socket.on('emit message', function(msg){
        $scope.$apply(function() {
            messagesList.push("<li>" + msg + "</li>");
            $scope.messagesListSafe = $sce.trustAsHtml(messagesList.join(''))
        });
    });
});
