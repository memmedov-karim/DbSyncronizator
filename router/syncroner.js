const {saveuser,useraddnewdbscronizator} = require("../controller/syncroner");
const express = require("express");
const router = express.Router();

router.post('/api/v1/user',saveuser);
router.post('/api/v1/user/syncronizator',useraddnewdbscronizator);

module.exports = router;