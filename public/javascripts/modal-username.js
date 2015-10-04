$(document).ready(function() {
  $('#modal-username').modal(options);
  //var from = $("#username").val();
  //console.log(from);
  $('#submit').on('click', function(e) {
    // val function gets value from textbox
    var username = $("#username").val();
    // Set cookie to username in order to keep track of anonymous name
    if(username.length > 0) {
      document.cookie = username; 
    }
    else {
      document.cookie = "Anonymous";
    }
    console.log(document.cookie);
    
    // Hide the dialog pop up after entering name
    $('#modal-username').modal('hide');
  })
});

var options = {
    backdrop: 'static',
    show: true,
    keyboard: false
}
