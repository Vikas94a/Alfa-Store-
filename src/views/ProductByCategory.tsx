import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Context } from "../App";


interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    rating: number;
}


export default function ProductByCategory(){
    const [productCategory, setProductsCategory]= useState<Product[]>([])
    const {option}=useParams()
    const context = useContext(Context)
if(!context){
    return <div>No data yet</div>
}
const { searchBar, setLoading, api_Url} = context

let newUrl:string;

if(searchBar){
newUrl=`${api_Url}/search?q=${searchBar}`
}else   newUrl=`${api_Url}/category/${option}`

  

console.log(newUrl)

useEffect(()=>{
 let mounted = true;
    async function fetchData() {
        try{
            setLoading(true)
            const respond = await fetch(newUrl)
            if(!mounted) return
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
    return()=>{
        mounted=false 
      }
},[option, searchBar])


// console.log(productCategory)


    return(
        <div className="min-h-screen flex flex-wrap flex-1 justify-center items-center w-full h-auto space-x-4 ">
            {productCategory?.length === 0? ( <p>Loading....</p> ):(productCategory.map((products)=>{
                return(
                    <div key={products.id}>
                        <ProductCard
                                        id={products.id}
                                        title={products.title}
                                        description={products.description}
                                        price={products.price}
                                        thumbnail={products.thumbnail}
                                        rating={products.rating}
                                      />
                    </div>
                )
            })) }
        </div>
    )
}