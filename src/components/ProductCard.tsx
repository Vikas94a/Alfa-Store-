import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../App";





export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail:string;
}




export default function ProductCard({id, title, description, price, rating, thumbnail}: Product) {

  const context = useContext(Context)

  if(!context){
    return <div>Loading....</div>
  }

  const{cartItems,setCartItems}= context

  function addItemToCart(){
    const existingProduct = cartItems.find((item)=> item.id === id)
    if(existingProduct){
      setCartItems(cartItems.map((item)=> item.id === id? {...item, quantity:item.quantity+1}: item))
    }else setCartItems([...cartItems, {id, thumbnail, title, price, quantity:1}])
localStorage.setItem("savedData", JSON.stringify(cartItems))
  }

console.log(cartItems )


  return (
    <div
      className="flex flex-col items-center p-4 w-80  bg-zinc-200 mt-5 rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl "
      key={id}
    >
      <Link to={`/${id}`} className="flex flex-col items-center w-full">
        <img
          className="w-full h-48 object-cover rounded-lg  shadow-2xl"
          src={thumbnail}
          alt={title}
        />
        <p className="font-bold text-xl p-2 text-center  truncate w-full">{title}</p>
        <p className="text-blue-500 text-center line-clamp-2">{description}</p>
      </Link>
      <div className="flex justify-between w-full p-2 mt-2">
        <strong className="text-red-600">NOK: {price}</strong>
        <p>
          {rating > 4 ? <span>⭐⭐⭐</span> : <span>⭐⭐⭐⭐⭐</span>}
        </p>
      </div>
      <button onClick={addItemToCart} className="bg-blue-600 px-4 py-2 text-white font-semibold  rounded hover:bg-green-400">
        Buy
      </button>
    </div>
  );
}
