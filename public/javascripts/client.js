$(function() {
  var socket = io.connect();

  socket.on('connect', function(message) {
    console.log('connect');
  });

  socket.on('word', function(data) {
    var span = wrapWord(data.word);
    $('#messages').append(span);
  });

  socket.on('users', function(data) {
    $('#users').empty().text(data.count);
  });

  $('#word').bind('webkitspeechchange', function(e) {
    console.log(this.value);
    socket.emit('word', { word: this.value });
  });

  var wrapWord = function(word) {
    var span = $('<span/>').addClass('word');
    var prefix = word.slice(0, word.length - 1);
    var last = $('<span/>').addClass('last').text(word.slice(-1));
    span.text(prefix);
    span.append(last);
    return span;
  };

});