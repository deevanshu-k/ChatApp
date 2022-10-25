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
app.use('/v1', router);

app.get('/', (req, res) => {
    res.send('<h1>Backend for ChatApp</h1>');
});

io.on("connection", (socket) => {
    // let globalRoom = '000000'
    socket.on("join", (data) => {
        if (data.room) {
            socket.join(data.room);
            io.to(data.room).emit(`${data.room}-newuser`,data);
        }
        else {
            socket.join('globalRoom');
            io.to('globalRoom').emit('globalRoom-newuser', data);
        }

    });

    socket.on('message', (data) => {
        let userName = data.userName ? data.userName : '';
        let message = data.message ? data.message : '';
        let room = data.room ? data.room : 'globalRoom';
        socket.broadcast.emit(`${room}-newmessage`, {
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