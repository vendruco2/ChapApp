const mongoose = require('mongoose');
const colors = require("colors");

const connectDB = async () => { //connect to database
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { //connect to database
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline); //if connected, print this
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold); //if not connected, print this
        process.exit();
    }
};

module.exports = connectDB; 