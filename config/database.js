const mongoose = require("mongoose")


const uri = "mongodb+srv://grupp7:grupp7swe@airbean.slpvtll.mongodb.net/?retryWrites=true&w=majority&appName=airbean"

const connectMongoDB = async () => {

    try {
        await mongoose.connect(uri)
        console.log("Connected To DB")
    }catch(err){
        console.error(err);
        process.exit(1)

    }

}

module.exports = connectMongoDB;