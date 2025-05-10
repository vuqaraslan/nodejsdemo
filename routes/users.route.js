import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { createUser, deleteUser, getMe, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router=express.Router();


//GET method
// router.get('/',(req,res)=>{
//     res.json({message:"(express) Users GET request received !"});
// });
router.get('/',getUsers);

//GET user by id method
// router.get('/user/:id',(req,res)=>{
//     const {id}=req.params;
//     res.json({message:`(express) GET request to get user by id ${id}`});
// });
router.get('/user/:id',protectedRoute,getUserById);

//GET Me - own side method
// router.get('/me',protectedRoute,(req,res)=>{
//     const user=req.user;
//     res.status(200).json({message:`(express) My user data >> ${user}`});
// });
router.get('/me',protectedRoute,getMe);


//POST method
// router.post('/add',(req,res)=>{
//     const data =req.body;
//     res.json({message:"(express) POST request received !",data});
// });
router.post('/add',protectedRoute,checkAdmin, createUser);

//PUT method
// router.put('/edit/:id',(req,res)=>{
//     const {id}=req.params;
//     const data=req.body;
//     res.json({message:`(express) PUT request to update users ${id}`,data});
// });
router.put('/edit/:id',protectedRoute,checkAdmin, updateUser);

//PATCH method
// router.patch('/patch/:id',(req,res)=>{
//     const {id}=req.params;
//     const data=req.body;
//     res.json({message:`(express) PATCH request to partially update users ${id}`,data});
// });

//DELETE method
// router.delete('/delete/:id',(req,res)=>{
//     const {id}=req.params;
//     res.json({message:`(express) DELETE- request to remove users ${id}`});
// });
router.delete('/delete/:id',protectedRoute,checkAdmin,deleteUser);

export default router;