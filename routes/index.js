const { Router } = require("express");
const room = require("./room.routes");
const router = Router();

router.use('/api',room);

module.exports = router;