import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const shopcontext = createContext();

const Shopcontextprovider = ({children})=>{

    const currency = '$';
    const delivery_fee = 10;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search,setsearch] = useState('');
    const [showsearch,setshowserach] = useState(false);

    const[cartitems,setcartitems] = useState({});

    const [products,setproducts] = useState([]);

    const [token,settoken] = useState('');

    const navigate = useNavigate();


    const addtocart = async(itemid,productsize)=>{

        if(!productsize){
            toast.error('select product size');
            return; 
        }

        let cartdata = structuredClone(cartitems);


        if(cartdata[itemid]){
            if(cartdata[itemid][productsize]){
                cartdata[itemid][productsize]+=1;
            }
            else{
                cartdata[itemid][productsize] = 1;
            }
        }
        else{
            cartdata[itemid] = {};
             cartdata[itemid][productsize] = 1;
        }

        setcartitems(cartdata);


        if(token){
            try {
                await axios.post(backendUrl,'/api/v1/carts/addtocart',{itemid,size},{headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getcartcount = ()=>{
        let count = 0;

        for(const items in cartitems){
            for(const item in cartitems[items]){
                try {
                    if(cartitems[item]>0) count+=cartitems[items][item];
                } catch (error) {
                    
                }
            }
        }
        return count;
    }

    const updatequantity = async(itemid,size, quantity)=>{
        let cartdata = structuredClone(cartitems);

        cartdata[itemid][size] = quantity;

        setcartitems(cartdata);

        if(token){
            try {
              await axios.post(backendUrl,'/api/v1/carts/updatecart',{itemid,size,quantity},{headers:{token}})  
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getcartamount = ()=>{
        let totalamount = 0;

        for (const items in cartitems){
            let iteminfo = products.find((product)=> product._id===items);
            for(const item in cartitems[items]){
                try {
                   if(cartitems[items][item]>0){
                    totalamount+= iteminfo.price* cartitems[items][item];
                   } 
                } catch (error) {
                    console.log(error);
                    toast.error(error.message); 
                }
            }
        }
        return totalamount;
    }

    const getproductdata = async()=>{
        try {
            const response = await axios.get(backendUrl+'/api/v1/products');
            if(response.data.success){
                setproducts(response.data.products)
            }
            else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getusercart = async(token)=>{
        try {
            const response = await axios.post(backendUrl,'/api/v1/carts/getusercart',{},{headers:{token}});

            if(response.data.success){
                setcartitems(response.data.cartdata);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            settoken(localStorage.getItem('token'));
            getusercart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setsearch,
        showsearch,
        setshowserach,
        cartitems,
        addtocart,
        getcartcount,
        updatequantity,
        getcartamount,
        navigate,
        getproductdata,
        token,
        settoken,
        backendUrl,
        setcartitems,cartitems
    }


    return(
        <shopcontext.Provider value={value}>
            {children}
        </shopcontext.Provider>
    )
}

export default Shopcontextprovider;