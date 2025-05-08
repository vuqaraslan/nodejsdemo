import express from "express";

const router=express.Router();


//GET method
router.get('/',(req,res)=>{
    res.json({message:"(express) Users GET request received !"});
});

//GET user by id method
router.get('/user/:id',(req,res)=>{
    const {id}=req.params;
    res.json({message:`(express) GET request to get user by id ${id}`});
});


//POST method
router.post('/add',(req,res)=>{
    const data =req.body;
    res.json({message:"(express) POST request received !",data});
});

//PUT method
router.put('/edit/:id',(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    res.json({message:`(express) PUT request to update users ${id}`,data});
});

//PATCH method
router.patch('/patch/:id',(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    res.json({message:`(express) PATCH request to partially update users ${id}`,data});
});

//DELETE method
router.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    res.json({message:`(express) DELETE- request to remove users ${id}`});
});

export default router;