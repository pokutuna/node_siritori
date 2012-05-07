$(function() {
  var socket = io.connect();

  socket.on('connect', function(message) {
    console.log('connect');
  });

  socket.on('word', function(data) {
    var span = $('<span/>').text(data.word);
    $('#messages').append(span);
  });

  $('#word').bind('webkitspeechchange', function(e) {
    console.log(e);
    console.log(this.value);
    socket.emit('word', { word: this.value });
  });

});