const {rooms} = require('../models');

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