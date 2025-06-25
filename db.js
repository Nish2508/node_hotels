const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' // hotels is the database that we are creating
//upon establishing connection, a db named hotels will be crated automatically

// Set up MongoDB connection 

// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,      //this param means - earlier the url (db server url) used to be something else, now it's a new one so we set it true otherwise we might get a warning
//     useUnifiedTopology: true
// }) -> these two params are not reqd now as they are automatically handled in the mongodb nodejs driver version 4.0.0 & above

mongoose.connect(mongoURL);


// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection - "db"
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {  
    console.log('Connected to MongoDB server');   // event listener will listen the 'connected' msg and print the text - 'connected' is predefined and understood by mongodb
});

db.on('error', (err) => {
    console.error('MongoDB connection error: ',err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');  // will be printed when db server is down - let say we stop the server and so this msg is printed
});

// Export the database connection
module.exports = db; // db - represents the mongodb connection - this is now needed to be imported in server.js file to run