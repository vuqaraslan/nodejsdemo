import { Todo } from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  // const { accessToken } = req.cookies;
  // if (!accessToken) {
  //   return res.status(401).json({ success: false, message: "No refresh token provided !" });
  // }
  // jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) {
  //     return res.status(403).json({ success: false, message: "Invalid refresh token !" });
  //   }
  //   res.json({ accesstoken: newAccessToken });
  // });

  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTodos=async (req,res)=>{
  const me = req.user;
  // console.log(me);
  try {
    const myTodos = await Todo.find({author:me.id}).populate("author","name surname email");
    res.status(200).json(myTodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found !" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const me = req.user;
  const {title,description}=req.body;
  // const todo = new Todo(req.body);
  const todo=new Todo({
    title,
    description,
    author:me.id
  });
  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found !" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found !" });
    res.status(200).json({ message: "Todo deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
