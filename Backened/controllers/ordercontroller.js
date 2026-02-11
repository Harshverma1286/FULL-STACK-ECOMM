
import ordermodel from "../models/ordermodels.js"
import usermodel from '../models/usermodel.js'
import Stripe from 'stripe';
import razorpay from 'razorpay'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayinstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

const currency = "inr";
const Delivery_charges = 10;

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
    try {
        const {userId,items,amount,address} = req.body;

        const {origin}  = req.headers;

        const orderdata = {
            userId,
            items,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }

        const neworder = await new ordermodel(orderdata);

        await neworder.save();

        const lineitems = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        lineitems.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery_charges"
                },
                unit_amount:Delivery_charges*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${neworder._id}`,
            lineitems,
            mode:'payment'
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}//using stripe

const verifystripe = async(req,res)=>{

    const {orderId,success,userId} = req.body;

    try {
        if(success==="true"){
            await ordermodel.findByIdAndUpdate(orderId,{payment:true});

            await usermodel.findByIdAndUpdate(userId,{cartData:{}});

            res.json({success:true});
        }
        else{
            await ordermodel.findByIdAndDelete(orderId);

            res.json({success:false});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const placeorderrazorpay = async(req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;

        const orderdata = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }

        const neworder = new ordermodel(orderdata);

        await neworder.save();

        const options = {
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:neworder._id.toString(), 
        }

        await razorpayinstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
        })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}//using razorpay


const verifyrazorpay = async(req,res)=>{
    try {
        const {userId,razorpay_orderid} = req.body;

        const orderinfo = await razorpayinstance.orders.fetch(razorpay_orderid);

        if(orderinfo.status ==="paid"){
            await ordermodel.findByIdAndUpdate(orderinfo.receipt,{payment:true});
            await ordermodel.findByIdAndUpdate(userId,{cartData:{}});

            res.json({success:true,message:"payment successfull"});
        }

        else{
            res.json({success:false,message:"payment failed"});
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const allorders = async(req,res)=>{
    try {
        const orders = await ordermodel.find({});
        res.json({success:true,orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
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
    try {
        const {orderId,status} = req.body;

        await ordermodel.findByIdAndUpdate(orderId,{status});

        res.json({success:true,message:'Status updated'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}// only admins

export {placeorder,placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus,verifystripe,verifyrazorpay}