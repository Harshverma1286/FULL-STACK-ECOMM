import ordermodel from "../models/ordermodels.js"
import usermodel from '../models/usermodel.js'
const placeorder = async(req,res)=>{
    try {
        const {userId,items,amount ,address} = req.body;

        const orderdata = {
            userId,
            items,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const neworder = await new ordermodel(orderdata);

        await neworder.save();

        await usermodel.findByIdAndUpdate(userId,{cart:{}});

        res.json({success:true,message:"order placed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}// using COD method


const placeorderstripe = async(req,res)=>{

}//using stripe

const placeorderrazorpay = async(req,res)=>{

}//using razorpay

const allorders = async(req,res)=>{

}// all order for admin panel

const userorders = async(req,res)=>{
    try {
        const {userId} = req.body;

        const orders = await ordermodel.findById({userId});

        res.json({success:true,orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}//all orders for frontened

const updatestatus = async(req,res)=>{

}// only admins

export {placeorder,placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus}