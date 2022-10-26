const { where } = require("sequelize");
const { rooms } = require("../models");
const { createToken } = require("../services/auth.service");


module.exports.post_room_access = async (req, res) => {
    try {
        const pwd = req.body.password ? req.body.password : '';
        const room = req.body.room ? req.body.room : '';
        const userName = req.body.userName ? req.body.userName : '';
        let data = await rooms.findOne({
            where: {
                name: room,
                password: pwd
            }
        });
        if (data == undefined) {
            throw "Wrong Password !"
        }
        let users = JSON.parse(data.users) || [];
        if (!users.includes(userName) && userName){
            users.push(userName);
            await rooms.update(
                { users: JSON.stringify(users) },
                {
                    where: {
                        name: room
                    }
                }
            );
        };
        const token = createToken(room, userName);
        res.status(200).send({
            status: "1",
            token: token,
            userName: userName,
            error: {
                error: '',
                message: ''
            }

        })
    } catch (error) {
        res.status(500).send({
            status: "0",
            token: "",
            userName: req.body.userName,
            error: {
                error: 'SERVER_ERROR',
                message: error
            }

        });
        console.log(error);
    }
}