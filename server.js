const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors")
const userModel = require("./model/userModel")
const jwt = require('jsonwebtoken')

// mongoDB connection
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors())

const JWT_SECRET="alitaInfotect7891888886"

app.post("/api/login", async(req, res)=>{
    try {

        if(!req.body.username || !req.body.password){
            return res.status(404).send({
                message: " Email or Password Required",
                success: false,
            });
        }


        const user = await userModel.findOne({ username: req.body.username });
        if (!user) {
          return res.status(200).send({
            message: "User Not Found",
            success: false,
          });
        }

        if(user.password!= req.body.password){
          
            return res.status(200).send({
                message: "Invalid Email or Password",
                success: false,
            });
            
        }


        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: 300,
        });
        res.status(200).send({
          message: "Login Success",
          success: true,
          token,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: `Error in LonginController ${error.message}`,
        });
      }


})

app.post("/api/register", async(req, res)=>{

    try {
        const existedUser = await userModel.findOne({ username: req.body.username });
        if (existedUser) {
          return res.status(200).send({
            message: "User already exists",
            success: false,
          });
        }
    
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({
          message: "Registered Successfully",
          success: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: `register Controller ${error.message}`,
        });
      }
})

// listen port
const port = 8080;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})