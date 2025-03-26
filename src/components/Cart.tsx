
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";





export default function Cart (){

    const context = useContext(Context)

    if(!context){
        return <div>Loading.....</div>
    }

    const{cartItems} = context



    return(
        <div className="">
            <Link to={"/cartview"}>
        <FontAwesomeIcon className="text-yellow-500 text-2xl absolute top-6 right-5.5 cursor-pointer hover:text-3xl " icon={faShoppingCart}/>
        <span className="text-yellow-50 absolute bg-amber-500 w-6 h-6 rounded-4xl top-2 right-5 text-center font-bold ">{cartItems.length}</span>
        </Link>
        </div>
    )
}