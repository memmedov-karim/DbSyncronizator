const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.set('strictQuery', true);
const ConnectToDb = async () => {
    try {
        const connection_url1 = {url:process.env.DB_CONNECTION_URL1,name:"connection_string_1"};
        const connection_url2 = {url:process.env.DB_CONNECTION_URL,name:"connection_string_0"};
        await mongoose.connect(connection_url2.url);
        console.log(`Server connected databese with - ${connection_url2.name} successfully`);
    } catch (error) {
        console.log("Server connection to database failed","error:",error.message);
    }
}
module.exports = ConnectToDb;