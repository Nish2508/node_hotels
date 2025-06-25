const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// POST route to add a person
router.post('/', async (req,res) => { // async useed bcz we hv a db operation ahead which is gonna take time
    try{
        const data = req.body;  // Assuming the request body contains the person data (parsed)

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data); 

        // Save the new person to the database
        const response = await newPerson.save(); // await - wait until the operation (saving) is performed
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){  // this block starts executing the moment "response" stores error
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})     

// GET method to get the Person detail
router.get('/', async (req,res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
    res.status(200).json(data);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
        }
})

router.get('/:workType', async (req,res) => {
    try{
        const workType = req.params.workType;  // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req,res) => {
    try{
        const personId = req.params.id;            // Extract the person's id from the URL parameter
        const updatedPersonData = req.body;        // id ko hum json wala data k saath bhi bhej skte the lekin preferred way yeh h ki id is sent through url and baaki jo data update krna h woh through json

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document - updated document will be lastly stored in the "response" var
            runValidators: true, // Run Mongoose validation - reuired, defualt etc fields will be checked automatically
        });

        // let say the id is invalid
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log("Data Updated");
        res.status(200).json(response);

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log("Data Deleted");
        res.status(200).json({message: 'Person Deleted Successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;