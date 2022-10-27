const { Router } = require("express");
const { get_all_rooms,post_create_room } = require("../controller/room.controller");
const {post_room_access} = require('../controller/auth.controller');
const router = Router();

router.get('/rooms',get_all_rooms);
router.post('/createRoom',post_create_room);
router.post('/getRoomAccess',post_room_access);

module.exports = router ; 