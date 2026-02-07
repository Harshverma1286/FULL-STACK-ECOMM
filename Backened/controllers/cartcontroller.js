import usermodel from '../models/usermodel'

const addtocart = async (req,res)=>{
    try {
        const {userId , itemId,size} = req.body;

        const userdata = await usermodel.findById(userId);

        let cartdata = await userdata.cartData;

        if(cartdata[itemId]){
            if(cartdata[itemId][size]){
                cartdata[itemId][size]+=1;
            }
            else{
                cartdata[itemId][size] = 1;
            }
        }
        else{
            cartdata[itemId]={};
            cartdata[itemId][size] = 1;

        }

        await usermodel.findByIdAndUpdate(userId,{cartdata});

        res.json({sucess:true,message:"added to cart"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


const updatecart = async(req,res)=>{
    try {
        const {userId,itemId,size,quantity} = req.body;
    
        const userdata = await usermodel.findById(userId);
    
        let cartdata = await userdata.cartData;
    
        cartdata[itemId][size] = quantity;
    
        await usermodel.findByIdAndUpdate(userId,{cartdata});
    
        res.json({success:true,message:"added to cart"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


const getusercart = async(req,res)=>{
    try {
        const {userId} = req.body;

        const userdata = await usermodel.findById(userId);

        let cartData = await userdata.cartData;

        res.json({success:true,cartData});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


export{addtocart,updatecart,getusercart};