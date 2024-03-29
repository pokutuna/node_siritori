
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(9393, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});



// socket.io
var io = require('socket.io').listen(app);
var count = 0;
var lastWord = 'しりとり';

io.sockets.on('connection', function(socket) {
  console.log('connect: ' + socket.id);
  count++;
  io.sockets.emit('users', { count: count });
  socket.emit('word', { word: lastWord });

  socket.on('word', function(data) {
    console.log(data);
    lastWord = data.word;
    io.sockets.emit('word', data);
  });

  socket.on('disconnect', function() {
    console.log('disconnect');
    count--;
    socket.broadcast.emit('users', { count: count });
  });
});
