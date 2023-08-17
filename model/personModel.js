const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  
    firstName: {
        type: String,
        required: [true, "First name is required"],
      },
    
      lastName: {
        type: String,
        required: [true, "Last name is required"],
      },
    
      email: {
        type: String,
        required: [true, "Email is required"],
      },
    
      phoneNumber: {
        type: Number,
        required: [true, "Number is required"],
      },
    
      hobbies: {
        type: String,
        required: [true, "Hobbies is required"],
      },
    
      education: {
        type: String,
        required: [true, "education is required"],
      },

      gender:{
        type:String,
        required:[true, "Gender is required"]
      }



  
});

const personModel = mongoose.model("person", personSchema);

module.exports = personModel;
