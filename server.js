// console.log('server file is running');


// 1.
// function add(a, b){
//     return a+b
// }


//2.
// var add = function(a, b){
//     return a+b;
// }


//3.
// var add = (a,b) => {return a+b;}


//4.
// var add = (a,b) => a+b;


// var res = add(123,7);
// console.log(res);


// (function(){
//     console.log('prince is added');
// })(); 




// CALLBACK FUNCN

/*function callback(){
    console.log('now adding is successfully completed');
}

const add = function(a, b, callback){
    var res = a+b;
    console.log('result: '+res);
    callback();
}

add(3,109309904,callback);
*/





// shortcut version

// const add = function(a, b, prince){
//     var res = a+b;
//     console.log('result: '+res);
//     prince();
// }

// // add(2,3,function(){                        //bahr likhne k bajay, inline fn likh liya
// //     console.log('add completed');
// // });

// add(2, 3, () => console.log('add completed'));  //even shorter - used often


/*
var fs = require('fs'); // means fs library is reqd
var os = require('os'); // both fs and os are already installed

var user = os.userInfo(); //inbuilt fn of os
console.log(user);
console.log(user.username);

fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', ()=>{
    console.log('file is created');
});

// it will add msg in the greeting.txt file if it already exists or else it will create one and add the text in it

console.log(os); //to see what fns can os perform
console.log(fs); //to see what fns can fs perform
*/


/*
const notes = require('./notes.js'); //imports content of notes.js in notes and displays 
var _ = require('lodash'); //why _ ? - it's like a convention, we can choose any other name too

console.log('server file is available')

var age = notes.age;
var result = notes.addNumber(age+18, 10);

console.log(age);
console.log('result is now '+result);

// use of lodash
var data = ["person", "person", 1, 2, 1, 2, 'name', 'age', '2'];
var filter = _.uniq(data); // separating unique data using lodash
console.log(filter);


console.log(_.isString(true));
*/


/*
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.name);

const objectToConvert = {name: "Alice", age: 25};
const json = JSON.stringify(objectToConvert);
console.log(json);

console.log(typeof json);
*/


const express = require('express')  // importing express pckg into our file

const app = express();  // app var stores a blueprint of how will we build our website -> app var now has all the functionality to make a server

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const Person = require('./models/person'); // isi k through saare DB operns krenge
const MenuItem = require('./models/MenuItem');

app.get('/', (req, res) => {
  res.send('Welcome to my Hotel... How can i help you? ')
})

// app.get('/chicken', (req, res) => {
//     res.send('sure sir, I would love to serve you Chicken')
// })

// app.get('/idli', (req, res) => {
//     var customized_idli={
//         name: 'rava idli',
//         size: '10 cm diameter',
//         is_sambar: true,
//         is_chutney: false
//     }
//     res.send(customized_idli)
// })


// POST route to add a person

// app.post('/person', async (req,res) => {    // post method se basically hume yeh pta chalta h ki data is send to server to save it in the database
    /*
    const data = req.body;  // Assuming the request body contains the person data (parsed)

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data); // therefore we pass the whole "data" directly, each field will get filled automatically
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;  // redundant 

    // Save the new person to the database
    newPerson.save((error, savedPerson) => {
        if(error){
            console.error('Error saving person data: ',error); 
            res.status(500).json({error: 'Internal Server Error'});
        }else{
            console.log('Data saved successfully');
            res.status(200).json(savedPerson);
        }
    })
    */

    // app.post('/person', async (req,res) => { // async useed bcz we hv a db operation ahead which is gonna take time
    //     try{
    //         const data = req.body;  // Assuming the request body contains the person data (parsed)

    //     // Create a new Person document using the Mongoose model
    //     const newPerson = new Person(data); 

    //     // Save the new person to the database
    //     const response = await newPerson.save(); // await - wait until the operation (saving) is performed
    //     console.log('data saved');
    //     res.status(200).json(response);
    //     }catch(err){  // this block starts executing the moment "response" stores error
    //         console.error(err);
    //         res.status(500).json({error: 'Internal Server Error'});
    //     }

    // })                

    // // GET method to get the Person detail

    // app.get('/person', async (req,res) => {
    //     try{
    //         const data = await Person.find();
    //         console.log('data fetched');
    //     res.status(200).json(data);
    //     }catch(err){
    //         console.error(err);
    //         res.status(500).json({error: 'Internal Server Error'});
    //     }
    // })

    // // POST method to add a Menu Item
    // app.post('/menu', async (req,res) => {
    //     try{
    //         const data = req.body;
    //         const newMenuItem = new MenuItem(data);
    //         const response = await newMenuItem.save();
    //         console.log('data saved');
    //         res.status(200).json(response);
    //     }catch(err){
    //         console.error(err);
    //         res.status(500).json({error: 'Internal Server Error'});
    //     }
    // })

    // // GET method to get the Menu Items
    // app.get('/menu', async (req,res) => {
    //     try{
    //         const data = await MenuItem.find();
    //         console.log('data fetched');
    //     res.status(200).json(data);
    //     }catch(err){
    //         console.error(err);
    //         res.status(500).json({error: 'Internal Server Error'});
    //     }
    // })

    // app.get('/person/:workType', async (req,res) => {
    //     try{
    //         const workType = req.params.workType;  // Extract the work type from the URL parameter
    //         if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
    //             const response = await Person.find({work: workType});
    //             console.log('response fetched');
    //             res.status(200).json(response);
    //         }else{
    //             res.status(404).json({error: 'Invalid work type'});
    //         }
    //     }catch(err){
    //         console.error(err);
    //         res.status(500).json({error: 'Internal Server Error'});
    //     }
    // })

    // Import the router files
    const personRoutes = require('./routes/personRoutes');
    const menuItemRoutes = require('./routes/menuItemRoutes');

    // Use the routers
    app.use('/person', personRoutes);
    app.use('/menu', menuItemRoutes);

    app.listen(3000, ()=>{
        console.log('listening on port 3000');
    }) // server port no. - 3000 => this line tells that 3000 port pe humara server active h 