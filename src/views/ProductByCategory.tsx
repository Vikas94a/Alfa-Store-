import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Context } from "../App";



export default function ProductByCategory(){
    const [productCategory, setProductsCategory]= useState<[]>([])
    const {option}=useParams()
    const context = useContext(Context)
if(!context){
    return <div>No data yet</div>
}
const { loading, setLoading, api_Url} = context

useEffect(()=>{
    async function fetchData() {
        try{
            setLoading(true)
            const respond = await fetch(`${api_Url}/category/${option}`)
            console.log(respond)
            if(respond.ok){
                const data = await respond.json()
                console.log(data)
                setProductsCategory(data.products)
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    fetchData()
},[option])


// console.log(productCategory)


    return(
        <div className="flex flex-wrap flex-1 justify-center items-center w-full h-auto space-x-4 ">
            {loading? ( <p>Loading....</p> ):(productCategory.map((products)=>{
                return(
                    <div key={products.id}>
                        <ProductCard
                                        id={products.id}
                                        title={products.title}
                                        description={products.description}
                                        price={products.price}
                                        images={products.images}
                                        rating={products.rating}
                                      />
                    </div>
                )
            })) }
        </div>
    )
}