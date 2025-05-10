import express from "express";
import { createTodo, deleteTodo, getMyTodos, getTodoById, getTodos, updateTodo } from "../controllers/todos.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router=express.Router();

//GET method
// router.get('/',(req,res)=>{
//     res.json({message:"(express) Todos GET request received !"});
// });
//all todos
router.get('/',getTodos);


//GET todo by id method
// router.get('/todo/:id',(req,res)=>{
//     const {id}=req.params;
//     res.json({message:`(express) Todos GET request to get todot by id ${id}`,data:todos.find(Todo=>Todo.id==id)});
// });
router.get('/todo/:id',getTodoById);

//My todos route
router.get('/my-todo',protectedRoute,getMyTodos);


//POST method
// router.post('/add',(req,res)=>{
//     const data =req.body;
//     res.json({message:"(express) POST request received !",data});
// });
router.post('/add',protectedRoute,createTodo);

//PUT method
// router.put('/edit/:id',(req,res)=>{
//     const {id}=req.params;
//     const data=req.body;
//     res.json({message:`(express) PUT request to update todos ${id}`,data});
// });
router.put('/edit/:id',protectedRoute,updateTodo);

//PATCH method
// router.patch('/patch/:id',(req,res)=>{
//     const {id}=req.params;
//     const data=req.body;
//     res.json({message:`(express) PATCH request to partially update todos ${id}`,data});
// });

//DELETE method
// router.delete('/delete/:id',(req,res)=>{
//     const {id}=req.params;
//     res.json({message:`(express) DELETE- request to remove todos ${id}`});
// });
router.delete('/delete/:id',protectedRoute,checkAdmin,deleteTodo);


export default router;