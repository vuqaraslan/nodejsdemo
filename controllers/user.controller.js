import { User } from "../models/user.model.js";
import appLog from "../appLog/applog.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    appLog.logError("getUsers",500,error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user){
      appLog.logError("getUserById",404,"User not found !");
      return res.status(404).json({ message: "User not found !" });
    } 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    appLog.logError("getUserById",200,error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    console.log("This is ME !");
    const me = req.user;
    console.log(me);
    // const user=await User.findById(req.params.id);
    // if (!me) return res.status(404).json({ message: "User not found !" });//burda buna da ehtiyac yoxdur hec,
    //cunki,protectedRoute-da ele accessToken varsa teyin edir cari useri req.user-e yoxdursa yeniden login
    //olmasini teleb edir.
    res.status(200).json(me);
  } catch (error) {
    res.status(500).json({ message: error.message });
    appLog.logError("getMe",500,error.message);
  }
};

export const createUser = async (req, res) => {
  const { name, surname, email, password, role } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      role: role, //eger post request-i atilanda role gonderilmese default olaraq user.model-de qeyd edildiyi kimi
      //user-role-da olacaq
    });
    const savedUser = await newUser.save();
    // const user=new User(req.body);
    //  const savedUser=await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
    appLog.logError("createUser",400,error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser){
      appLog.logError("updateUser",404,"User not found !");
      return res.status(404).json({ message: "User not found !" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
    appLog.logError("updateUser",400,error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser){
      appLog.logError("deleteUser",404,"User not found !");
      return res.status(404).json({ message: "User not found !" });
    }
    res.status(200).json({ message: "User deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    appLog.logError("deleteUser",500,error.message);
  }
};
