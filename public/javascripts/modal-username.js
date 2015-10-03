$(document).ready(function() {
  $('#modal-username').modal(options);
  //var from = $("#username").val();
  //console.log(from);
  $('#submit').on('click', function(e) {
    var from = $("#username").val();
    console.log(from);
    $('#modal-username').modal('hide');
  })
});

var options = {
  backdrop: 'static',
  show: true,
  keyboard: false
}