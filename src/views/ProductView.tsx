
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../App"

interface ProductView{
    images:string,
    title:string,
    description:string, 
    price:number,
    availabilityStatus:string,
    reviews:[]
}

export default function ProductView(){
    const{id} =useParams()
    const[productView, setProductView]= useState<ProductView[]>([])
const contex = useContext(Context)
if(!contex){
    return <div>No data yet!</div>
}
const{api_Url, setLoading}= contex

useEffect(()=>{
    async function fetchData(){
        try{
            setLoading(true)
            const respond = await fetch(`${api_Url}/${id}`)
            if(respond.ok){
                const data = await respond.json()
                setProductView(data)

            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    fetchData()
}, [id])

console.log(productView)

    return(
<div className="flex mt-9">
    <div>
        <img className="h-129 w-129" src={productView.images} alt={productView.title} />
    </div>
    <div>
        <div className="flex flex-col justify-center items-center m-12">
        <h2 className="text-3xl font-bold">{productView.title}</h2>
        <strong className="mt-8 text-red-600">{productView.availabilityStatus}</strong>
        <p className="mt-8 text-zinc-400 w-96">{productView.description}</p>
        <p className="text-red-600">Price {productView.price} NOK</p>
        </div>
        <div>
            
        </div>
    </div>
</div>
    )
}