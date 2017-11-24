var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(155, function () {
  console.log("server running on port 155");
});


function handler(req, res) {
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


users = {};
io.on('connection', function (socket) {
  socket.on("new user", function (data, callback) {
    if (data in users) {
      callback(false)
    } else {
      callback(true)
      socket.nickname = data;
      //nickname as key and saving socket
      users[socket.nickname] = socket;
      updatenames()
    }

  })

  function updatenames() {
    io.sockets.emit("usernames", Object.keys(users))
  }

  socket.on("disconnect", function (data) {
    if (!socket.nickname) return false
    delete users[socket.nickname]
    updatenames()
  })


  //recive message from client
  socket.on('send message', function (data, callback) {
    console.log(data)
    if (data) {
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

 

    
  })
    socket.on('msg',function(msg){
          console.log("msg service")
          socket.emit('msg', { msg: "you sent : "+msg });
      })


});
