const express = require('express');
const router = express.Router();
const testRouter = require("./router/test");
const userRouter = require("./router/syncroner");
const schedulerRouter = require("./router/scheduler");
router.use(testRouter);
router.use(userRouter);
router.use(schedulerRouter);
module.exports = router;