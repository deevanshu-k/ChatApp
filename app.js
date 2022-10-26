require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const router = require('./routes');
const bodyparser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/v1', router);

app.get('/', (req, res) => {
    res.send('<h1>Backend for ChatApp</h1>');
});

io.on("connection", async (socket) => {
    let id = await socket.id;
    socket.join(id);
    socket.on("join", (data) => {
        if (data.room) {
            let token = data.token;
            jwt.verify(token, process.env.SECRECT_KEY, async (err, decodedToken) => {
                if (err) {
                    console.log(data.user);
                    io.to(id).emit(`${data.room}-UNAUTHORISED`);
                }
                else {
                    socket.join(decodedToken.room);
                    io.to(decodedToken.room).emit(`${decodedToken.room}-newuser`, data);
                    console.log(decodedToken);
                }
            })

        }
        else {
            socket.join('globalRoom');
            console.log('UserNAme => ',data.user);
            io.to('globalRoom').emit('globalRoom-newuser', data);
        }

    });

    socket.on('message', (data) => {
        let userName = data.userName ? data.userName : '';
        let message = data.message ? data.message : '';
        let room = data.room ? data.room : 'globalRoom';
        socket.to(room).emit(`${room}-newmessage`, {
            userName,
            message
        })
    })

    socket.on("leave",(data) => {
        let room = data.room;
        let user = data.user;
        socket.leave(room);
    })

    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

});

http.listen(port, () => {
    console.log('Listening on port', port);
})