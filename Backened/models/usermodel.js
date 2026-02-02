import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{},
        // we have used minimize false because databse will not recognize this default value so minimize: false will help in it
    }
},{minimize:false});

const usermodel = mongoose.model.user || mongoose.model('user',userschema);

export default usermodel;