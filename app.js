require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://192.168.43.178:4200']
    }
});

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('<h1>App Running</h1>');
});

io.on("connection", (socket) => {
    let room1 = '123456789'
    socket.on("join", (data) => {
        socket.join(room1);
        io.emit('newuser', data);
    });

    socket.on('message',(data) => {
        let userName = data.userName? data.userName: '';
        let message = data.message ? data.message: '';
        socket.broadcast.emit('newmessage',{
            userName,
            message
        })
    })

    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

});

http.listen(port, () => {
    console.log('Listening on port', process.env.port);
})