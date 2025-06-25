const mongoose = require('mongoose');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,  // should be of this type or else mongoose will throw error
        required: true // means this field is reqd anyhow or else mongoose will throw error
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],  // inhi teeno mein se ek hoga work otherwise database mein store nhi hoga
        required: true   // mandatory
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true  // unique to each of the document
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }
});

// Create Person Model - Now we make a MODEL using the SCHEMA we hv made, using this MODEL we perform all the DB operations - Create, Read, Update & Delete
const Person = mongoose.model('Person', personSchema);
module.exports = Person;