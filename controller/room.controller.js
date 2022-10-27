const {rooms} = require('../models');

module.exports.post_create_room = async (req,res) => {
    try {
        let id = Date.now();
        let room = req.body.room;
        let users = JSON.stringify([]);
        let password = req.body.password;
        if(id && room && users && password){
            let a = await rooms.findOne({
                where:{
                    name : room
                }
            });
            if(a){
                throw {e:"EXIST",m:"Room already exists!"}
            }
            let data = await rooms.create({
                id,
                name : room,
                users,
                password
            })
            res.status(200).json({
                status: "1",
                data: {
                    id : data.id,
                    room : data.name
                },
                error: {
                    error: '',
                    message: ''
                }
            });
        }
        else {
            throw {e:'NOT_ABLE_TO_CREATE',m:"Room not created!"}
        }
        
    } catch (error) {
        console.log('room.controller ERROR => ',error);
        res.status(500).json({
            status: "0",
            data: "",
            error: {
                error: error.e ? error.e :'SERVER_ERROR',
                message: error.m ? error.m : 'Something went wrong!'
            }

        });
    }
}

module.exports.get_all_rooms = async (req,res) => {
    try {
        let allRooms = await rooms.findAll({attributes: ['id', 'name']});
        if (allRooms[0] == undefined) {
            throw 'NO_ROOM_FOUND';
        }
        res.status(200).json({
            status: "1",
            data: allRooms,
            error: {
                error: '',
                message: ''
            }
        });
    } catch (error) {
        console.log('room.controller ERROR => ',error);
        res.status(500).json({
            status: "0",
            data: "",
            error: {
                error: 'SERVER_ERROR',
                message: error ? error : 'Something went wrong!'
            }

        });
    }
}