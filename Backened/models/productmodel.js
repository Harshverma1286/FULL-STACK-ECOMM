import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:Array,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
    },
    sizes:{
        type:Array,
        required:true
    },
    Bestseller:{
        type:Boolean,
    },
    date:{
        type:Number,
        required:true
    }
});

const productmodel = mongoose.model.product || mongoose.model("product",productschema);

export default productmodel;