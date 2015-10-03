$(document).ready(function() {
  $('#modal-username').modal(options);
  var from = $("#username").val();
  console.log(from);
});

var options = {
  backdrop: 'static',
  show: true,
  keyboard: false
}