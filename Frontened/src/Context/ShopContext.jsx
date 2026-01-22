import { createContext } from "react";
import { products } from "../assets/assets";

export const shopcontext = createContext();

const Shopcontextprovider = ({children})=>{

    const currency = '$';
    const delivery_fee = 10;

    const value = {
        products,
        currency,
        delivery_fee
    }


    return(
        <shopcontext.Provider value={value}>
            {children}
        </shopcontext.Provider>
    )
}

export default Shopcontextprovider;