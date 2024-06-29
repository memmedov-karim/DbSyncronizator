const express = require('express');
const {errorHandler} = require('./middleware/errorHandler.js')
const dotenv = require('dotenv');
const  ConnectToDb  = require('./db/db.js');
const routes = require('./routes');
const { setupMiddlewares } = require('./middlewares');
const { setupServer } = require('./serverSetup');
const {getdatafromconnectionstring} = require("./helper/mongocollectionsrelation.js")
dotenv.config();
const app = express();
// Setup middlewares
setupMiddlewares(app);
// Routers
app.use(routes);
app.use(errorHandler);
ConnectToDb();

//getdatafromconnectionstring(process.env.DB_CONNECTION_URL,"jobs").then(dt=>console.log(dt))
// t("663f9083534690478ff758d7");
// Setup server and cluster
setupServer(app);