const { Router } = require("express");
const { get_all_rooms } = require("../controller/room.controller");
const {post_room_access} = require('../controller/auth.controller');
const router = Router();

router.get('/rooms',get_all_rooms);
router.post('/getRoomAccess',post_room_access);

module.exports = router ; 