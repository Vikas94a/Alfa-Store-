
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../App"

interface Review{
    comment:string,
    ratings:number
}

interface ProductView{
  thumbnail:string
    title:string,
    description:string, 
    price:number,
    availabilityStatus:string,
    reviews:Review[]
}

export default function ProductView(){
    const{id} =useParams()
    const[productView, setProductView]= useState<ProductView>({} as ProductView)
const contex = useContext(Context)
if(!contex){
    return <div>No data yet!</div>
}
const{api_Url, setLoading}= contex

useEffect(()=>{
    let mounted = true
    async function fetchData(){
        try{
            setLoading(true)
            const respond = await fetch(`${api_Url}/${id}`)
            if(!mounted) return
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
return()=>{
    mounted=false
}

}, [ ])

console.log(productView)

    return(
<div className="flex item-center mt-9 bg-zinc-100">
    <div className="flex item-center w-120 p-4 m-6 bg-white shodow-2xl rounded">
        <img className=" w-129 shadow-2xl-black" src={productView.thumbnail} alt={productView.title} />
    </div>
    <div className="flex flex-col mx-auto w-full">
     <div className="flex bg-white md:w-1/2">
        <div className="flex  justify-between w-full ">
        <h1 className="font-bold text-3xl">{productView.title}</h1>
        <span className="bg-green-100 p-1 rounded-full text-sm text-green-800 text-center ">{productView.availabilityStatus}</span>
        </div>

     </div>
    </div>
</div>
    )
}