var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
io.on('connection', function (socket) {
 
  socket.on('add-message', (message) => {

    let sender = message.sender_id
    let receiver = message.receiver_id
    let transaction_id = message.transaction_id
    let prefix = ""

    if(receiver < sender)
      prefix = receiver+"-"+sender
    else
      prefix = sender+"-"+receiver

    io.emit("message-"+transaction_id+"-"+prefix, {message: message.message, sender_id: message.sender_id, receiver_id: message.receiver_id, time: message.time})
  })
 
});

var port = process.env.PORT || 3002;

http.listen(port, function(){
  console.log("listening in http://localhost:" + port);
})