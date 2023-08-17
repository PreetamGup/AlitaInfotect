const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors")
const userModel = require("./model/userModel")
const personModel= require("./model/personModel")
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

app.post('/api/addperson',async(req, res)=>{

     try{
        const newUser = new personModel(req.body);
        await newUser.save();
        res.status(201).send({
          message: "Added Successfully",
          success: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: `Person adding Controller ${error.message}`,
        });
      }
})

app.get('/api/alldata',async(req, res)=>{

    try {
        const allPerson= await personModel.find({});
        console.log(allPerson)

        res.status(200).json({
            message: "Fetch Success",
            success: true,
            allPerson,
        })
        
    } catch (error) {
        res.status(404).send({
            success: false,
            message: `Fetchin error ${error.message}`,
        })
    }

   
})


app.delete("/api/person/:id",async(req, res)=>{
    try {  
        await personModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Person deleted",
            success:true
        })

    } catch (error) {
        res.status(400).json({
            message:'Some error',
            success:false
        })
    
    }
})



// listen port
const port = 8080;
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})