import { Link } from "react-router-dom"


interface Product{
id:number,
title:string,
description:string,
price:number,
rating:number,
images:string
}

export default function (product:Product) {
  return (
    <Link to={`/${product.id}`}>
    <div  className="flex flex-col justify-center items-center p-6 w-95 h-118 bg-zinc-200 mt-5 rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl trasns"  key={product.id} >
      <img className="w-65 shadow-2xl" src={product.images} alt={product.title} />
      <p className="font-bold text-xl p-2" >{product.title}</p>
      <p className="text-blue-500">{product.description}</p>
      <div className="flex justify-between w-full p-2 mt-2">
        <strong className="text-red-600" >NOK: {product.price}</strong>
        <p>{product.rating >4 ? <span>⭐⭐⭐</span> : <span>⭐⭐⭐⭐⭐</span>}</p>
      </div>
    </div>
    </Link>
  );
}
