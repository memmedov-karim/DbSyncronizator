const {test,test2,saveuser,addtest,fileupload} = require("../controller/test");
const {upload} = require("../middleware/fileUpload")
const express = require("express");
const router = express.Router();

router.get('/api/v1/test',test);
router.get('/api/v1/test2',test2)
router.get('/api/v1/user',saveuser);
router.post('/api/v1/file',upload.single("file"),fileupload)
router.post('/api/v1/addtest',addtest);
module.exports = router;