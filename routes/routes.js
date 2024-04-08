const express = require('express');
const Model = require('../models/model');
const router = express.Router();

router.use(express.json()); //Very important

//POST Method
router.post('/post', async(req,res)=>{
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: "Name and age are required" });
    }

    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
})

//Get all Method
router.get('/getAll', async(req,res)=>{
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch{
        res.status(500).json({message: error.message});
    }
})

//Get by ID method
router.get('/getOne/:id', async(req,res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);
    }
    catch{
        res.status(500).json({message: error.message});
    }
})

//Update by ID Method
router.patch('/update/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new : true };

        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        res.send(result)
    }
    catch{
        res.status(400).json({message: error.message});
    }
})

//Delete by ID Method
router.delete('/delete/:id', async(req,res)=>{
    try {
        const id = req.params.id
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with name ${data.name} has been deleted successfully`)
    } catch {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;
