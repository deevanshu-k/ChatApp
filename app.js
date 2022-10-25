require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const router = require('./routes');
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://127.0.0.1:4200']  // https://deevanshu-k.github.io
    }
});
const corsOptions = {
    origin: 'http://127.0.0.1:4200',
    optionsSuccessStatus: 200
};

const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use('/v1',router);

app.get('/', (req, res) => {
    res.send('<h1>Backend for ChatApp</h1>');
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
    console.log('Listening on port', port);
})