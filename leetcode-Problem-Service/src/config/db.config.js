const mongoose = require("mongoose");
const { ATLAS_DB_URL ,NODE_ENV } = require("./server.config");



async function connectToDB() {

    try {
        if(NODE_ENV == "devlopment" || NODE_ENV === "production")  {
            //console.log("DB link", ATLAS_DB_URL);
            
            await mongoose.connect(ATLAS_DB_URL)
        }
        
    } catch (error) {
        console.log('Unable to connect to the DB server');
        console.log(error)
    }
}



module.exports = connectToDB