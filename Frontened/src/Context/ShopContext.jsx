import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const shopcontext = createContext();

const Shopcontextprovider = ({children})=>{

    const currency = '$';
    const delivery_fee = 10;

    const [search,setsearch] = useState('');
    const [showsearch,setshowserach] = useState(false);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setsearch,
        showsearch,
        setshowserach,
    }


    return(
        <shopcontext.Provider value={value}>
            {children}
        </shopcontext.Provider>
    )
}

export default Shopcontextprovider;