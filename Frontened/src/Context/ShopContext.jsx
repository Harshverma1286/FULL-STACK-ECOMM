import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const shopcontext = createContext();

const Shopcontextprovider = ({children})=>{

    const currency = '$';
    const delivery_fee = 10;

    const [search,setsearch] = useState('');
    const [showsearch,setshowserach] = useState(false);

    const[cartitems,setcartitems] = useState({});


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
    }

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setsearch,
        showsearch,
        setshowserach,
        cartitems,addtocart,getcartcount
    }


    return(
        <shopcontext.Provider value={value}>
            {children}
        </shopcontext.Provider>
    )
}

export default Shopcontextprovider;