var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app)
var twitter = require('ntwitter');
var io = require('socket.io').listen(server);

server.listen(3000);

var twit = new twitter({
  consumer_key: "ZXBzQETVbHH8oVKrik7rng",
  consumer_secret: "qcLCXcT5XZhxnc7jql0bY6i1IbLiRguq3mtGnMSPrjo",
  access_token_key: "296987742-kBkxIav20YmiaH54ZdYPKaUeBT9cI60ejUcsyVOP",
  access_token_secret: "m7D6jHIsywzRf9REBsyzgJT0CTxtvpugtdwFFivHk"
});

twit.stream('statuses/filter', { track: ['love', 'hate'] }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.volatile.emit('tweet', { 
      user: data.user.screen_name, 
      text: data.text
    });
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
