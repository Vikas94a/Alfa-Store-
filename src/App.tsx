import { createContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

interface AppContext{
  api_Url:string,
loading:boolean,
setLoading:(value:boolean)=>void,
error:string|null,
setError:(value:string|null)=>void,
productData:any []
pagination:(value:number)=>void
}

export const Context= createContext<AppContext|null>(null)

function App() {

const api_Url =`https://dummyjson.com/products`

const[limit, setLimit]= useState<number>(30)
const[skip, setSkip]=useState<number>(30)
const[loading, setLoading]=useState<boolean>(false)
const[error, setError]=useState<string|null>(null)
const[productData, setProductData]=useState<[]>([])


useEffect(()=>{

  async function  fetchData () {
try{
setLoading(true)
const respond= await fetch(`${api_Url}?limit=${limit}&skip=${skip}`)
if(respond.ok){
  const data = await respond.json()
  // console.log(data.products)
  setProductData(data.products)
}

}catch(error){
  console.log(error)
}finally{
  setLoading(false)
}
  }
fetchData()
  
}, [skip,limit])


function pagination(number:number){
  setLimit(limit+number)
  setSkip(limit+number)
}

  return (
    <>
    <Context.Provider
    value={{
      api_Url,
      loading,
    setLoading,
    error,
    setError,
    productData,
pagination
  } }
    >
    <NavBar/>
    <Outlet/>
    <Footer/>
    </Context.Provider>
    
    </>
  )
}

export default App
