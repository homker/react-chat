var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

const PORT = 6001;

app.get('/',function(req,res){
    console.log('get get');
    res.redirect("http://127.0.0.1:3000");
});

io.on('connection',function(socket){
   console.log('connections');
    socket.on('chat Message',function(msg){
        console.log(msg);
        io.emit('chat Message',msg)
    });
});



http.listen(PORT,function(){
   console.log('web serve work on '+ PORT);
});