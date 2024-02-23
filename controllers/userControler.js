import UserSchema from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import { comparePassword, generateToken, verifyToken } from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import fs from "fs";
//create user
export const createUser = async (req, res) => {
  const { name, dob, email, password, role } = req.body;
  const image = req.file.filename;

  if (!name || !email || !password || !role) {
    const path = `Public/images/${req.file.filename}`;
    fs.unlinkSync(path);
    return res.status(400).send("name, email, password are required !!");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      name,
      dob: new Date(dob),
      email,
      password: hashedPassword,
      image,
      role,
    });

    if (newUser) {
      return res.status(200).json({
        message: `New User ${name}  has been created successfully!`,
        User: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    const path = `Public/images/${req.file.filename}`;
    fs.unlinkSync(path);
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
// get all user
export const showAllUsers = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const users = await UserSchema.find()
      .skip(offset)
      .limit(parseInt(pageSize));

    return res.status(200).json({ Users: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// get one user by ID
export const showOneUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserSchema.findById(id);

    if (user) {
      return res.status(200).json({ User: user });
    } else {
      return res.status(404).send(`User ${id} does not exist!`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// update the user


export const updateUser = async (req, res) => {
  const id = req.params.id;
  const {

    name,
    role,
  } = req.body;

  try {
    const existingUser = await UserSchema.findById(id);
    if (!existingUser) {
      const path = `Public/images/${req.file.filename}`;
      fs.unlinkSync(path);
      return res.status(404).json({ error: "user not found" });
    }

    if (name) existingUser.name = name;
    if (role) existingUser.role = role;
  
    // if (image) existingUser.image = image;

    console.log(existingUser.image)

    const oldImagePath = `Public/images/${existingUser.image}`;

    // console.log(oldImagePath)

    if(req.file){
      console.log(req.file.filename)
      existingUser.image = req.file.filename;
    

      fs.unlinkSync(oldImagePath,(err)=>{
        if(err){
          return res.status(500).json({error:`error deleting the image`})
        }
      })
    }
    
    // console.log("Old Image Path:", oldImagePth);

    
    await existingUser.save();

    // console.log(existingUser)

    return res.status(200).json(existingUser);
  } catch (error) {
    console.error(error);
    const imagePath = `Public/images/${req.file.filename}`
    fs.unlinkSync(imagePath)
    return res.status(500).json({ error: error.message });
  }
};



// delete user



export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserSchema.findById(userId);

    console.log(deletedUser)

    if (!deletedUser) {
      return res.status(404).json({ error: `user Not found` });
    }

    const imagePath = `Public/images/${deletedUser.image}`;
    fs.unlinkSync(imagePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting Product" });
      }
    });

    await UserSchema.deleteOne({ _id: userId });

    return res.status(200).json({ message: "user deleted seccessfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//login user

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("heyyy");
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ err: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    console.log("Entered password:", password);
    console.log("Hashed password from database:", user.password);
    console.log("Is password valid?", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ err: "Invalid password" });
    }

    try {
      const token = generateToken(user);
      const decodedd = verifyToken(token);

      if (!token) {
        console.log("Token generation failed");
        return res.status(500).json({ error: "Token generation failed" });
      }

      console.log("Generated token:", token);
      // console.log("Token Payload:", jwt.decode(token));
      res
      .cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "user logged in successfully", payload: decodedd });
      // res.Cookies("token", token, { httpOnly: true, sameSite: "Strict" }).json({ user, token });
    } catch (tokenError) {
      console.error("Error during token generation:", tokenError);
      return res.status(500).json({ error: "Internal Server Error during token generation" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// to sure logedin
export const loggedInUser = (req, res) => {
  res.json("loged from user controller" + { user: req.user });
};

//Logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
