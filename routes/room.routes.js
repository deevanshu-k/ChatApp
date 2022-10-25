const { Router } = require("express");
const { get_all_rooms } = require("../controller/room.controller");
const router = Router();

router.get('/rooms',get_all_rooms);

module.exports = router ; 