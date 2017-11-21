var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(155,function(){
  console.log("server running on port 155");
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

nicknames=[];
io.on('connection', function (socket) {
  socket.on("new user",function(data,callback){
    if(nicknames.indexOf(data)!=-1){
      callback(false)
    }
    else{
      callback(true)
      socket.nickname=data;
      nicknames.push(socket.nickname);
      updatenames()
    }

  })
function updatenames(){
  io.sockets.emit("usernames",nicknames)
}

  socket.on("disconnect",function(data){
    if(!socket.nickname) return false
      nicknames.splice(nicknames.indexOf(socket.nickname),1)
    updatenames()
  })




//recive message from client
socket.on('send message',function(data){
  console.log(data)
  //sending res to every one
  //socket.emit("new message",data)
  //sending res to every one except me using broadcast 
  socket.broadcast.emit('new message',data)
})


  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

});