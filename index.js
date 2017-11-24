var http = require('http');
var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', function(req, res, next) {
  res.sendFile(__dirname+"/dist/index.html");
});


var server = http.createServer(app);
var io = require('socket.io')(server);
var users = {};

io.on('connection', function (socket) {
    socket.emit('msg', { msg: 'Welcome bro!' });
    socket.on('msg',function(msg){
      console.log("msg you")
    	socket.emit('msg', { msg: "you sent : "+msg });
    })

    socket.on("new user", function (data) {
          if (data in users) {
           // callback(false)
          } else {
           // callback(true)
            socket.nickname = data;
            //nickname as key and saving socket
            users[socket.nickname] = socket;
            updatenames()
          }
    })

    function updatenames() 
    {
      io.sockets.emit("usernames", Object.keys(users))
    }
    socket.on("disconnect", function (data) {
        if (!socket.nickname) return false
        delete users[socket.nickname]
        updatenames()
    })
  //recive message from client
  socket.on('send message', function (data, callback) {
    //console.log(data)
    if (data) {
      console.log(socket.nickname)
      if(data.name=="All"){
          socket.broadcast.emit('new message', {
              msg: data.message,
              nickname: socket.nickname
            })
        return false
      }     
      
          if (data.name in users) {            
            users[data.name].emit('new message', {
              msg: data.message,
              nickname: socket.nickname
            })
          } else if (data.message == "") {
            callback("Error!: No message, please enter message")
          } else {
            callback("Error!: user does not exits")
          }

        } else {
          callback("Error!: user does not exits")
      }
  })

  // if(msg.substr(0,3)=="/w "){
    //   console.log("whisper!")
    //   //users[name].emit('new message',{msg:data,nickname:socket.nickname})
    // }
    // else{
    //     socket.broadcast.emit('new message',{msg:data,nickname:socket.nickname})
    // }
    //console.log(data)
    //sending res to every one
    //socket.emit("new message",data)
    //sending res to every one except me using broadcast 

});

server.listen(155,function(){
  console.log("Server is running on port: 155")
});