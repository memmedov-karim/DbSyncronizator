const {addscheduler} = require("../controller/scheduler");
const express = require("express");
const router = express.Router();

router.post('/api/v1/scheduler',addscheduler);

module.exports = router;