// const express=require('express');

import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import todosRoute from './routes/todos.route.js';
import usersRoute from './routes/users.route.js';
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";

dotenv.config();// Node.js layihələrində .env adlı fayldakı konfiqurasiya dəyişənlərini 
// (məsələn, gizli API açarları, verilənlər bazası bağlantı məlumatları və s.) prosesə (process.env) avtomatik
// olaraq yükləmək üçün istifadə olunur.

// console.log(process.env.MONGO_URI);

const app=express();
// const port=3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/todos',todosRoute);
app.use('/api/users',usersRoute);
app.use('/api/auth',authRoute);

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb connected : '+conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDb : '+error.message);
        process.exit(1);//1 means there was an error, 0 means success
    }
};

//START the server
app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
    connectDB();
});


//PRODUCTS endpoints
//http://localhost:3000/api/products - GET ALL PRODUCTS
//http://localhost:3000/api/products/product/:id - GET PRODUCT BY ID
//http://localhost:3000/api/products/add - ADD PRODUCT
//http://localhost:300/api/products/edit/:id - EDIT PRODUCT
//http://localhost:300/api/products/patch/:id - PATCH PRODUCT
//http://localhost:300/api/products/delete/:id - DELETE PRODUCT


//USERS endpoints
//http://localhost:3000/api/products - GET ALL USERS
//http://localhost:3000/api/products/product/:id - GET USER BY ID
//http://localhost:3000/api/products/add - ADD USER
//http://localhost:300/api/products/edit/:id - EDIT USER
//http://localhost:300/api/products/patch/:id - PATCH USER
//http://localhost:300/api/products/delete/:id - DELETE USER
