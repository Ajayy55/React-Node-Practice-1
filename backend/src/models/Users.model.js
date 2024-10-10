import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    gender:{
        type:String,
        enum:['male','female','others'],
    },
    qualification:{
        type:[],
    }

},{timestamps:true})

export const User=new mongoose.model("User",userSchema);