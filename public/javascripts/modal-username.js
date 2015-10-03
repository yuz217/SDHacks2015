$(document).ready(function() {
    $('#modal-username').modal(options);
    //var from = $("#username").val();
    //console.log(from);
    $('#submit').on('click', function(e) {
        var username = $("#username").val();
        // Set cookie to username in order to keep track of anonymous name
        document.cookie = username;
        console.log(document.cookie);
        //document.getElementById('nameofuser').textContent = document.cookie;

        // Hide the dialog pop up after entering name
        $('#modal-username').modal('hide');
    })
});

var options = {
    backdrop: 'static',
    show: true,
    keyboard: false
}
