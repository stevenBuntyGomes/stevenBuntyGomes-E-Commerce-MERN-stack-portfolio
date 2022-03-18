const app = require('./app');
// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connect_database = require('./config/database');
const processNested = require('express-fileupload/lib/processNested');
// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({path: 'backend/config/config.env'});
}
// connecting to database
connect_database();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// updated for production purpose
app.listen(process.env.PORT,() => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// console.log(youtube);
// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
});


// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`error: ${err.message}`);
    console.log(`shutting down server due to error`);

    server.close(() => {
        process.exit(1);
    });
});