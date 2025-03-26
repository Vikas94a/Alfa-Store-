import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Product } from "./components/ProductCard";


export interface Cart {
  id: number;
  thumbnail: string
  title: string;
  price: number;
  quantity: number;
}

interface AppContext {
  api_Url: string;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  productData: Product[];
  pagination: (value: number) => void;
  searchBar: string;
  setSearchBar: (value: string) => void;
  cartItems: Cart[];
  setCartItems: React.Dispatch<React.SetStateAction<Cart[]>>;
  updateQuantity: (id: number, operation: "increase" | "decrease") => void;
}

export const Context = createContext<AppContext | null>(null);

function App() {
  const api_Url = `https://dummyjson.com/products`;

  const [limit, setLimit] = useState<number>(30);
  const [skip, setSkip] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<Product[]>([]);
  const [searchBar, setSearchBar] = useState<string>("");
  const [cartItems, setCartItems] = useState<Cart[]>(() => {
    const savedItems = localStorage.getItem("savedData");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  function updateQuantity(id: number, operation: "increase" | "decrease") {
    setCartItems((prevItem) =>
      prevItem.map((item) => {
        if (item.id === id) {
          const newQuantity =
            operation === "increase" ? item.quantity + 1 : item.quantity - 1;
          return {
            ...item,
            quantity: Math.max(0, newQuantity),
          };
        }
        return item;
      })
    );
  }

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      try {
        setLoading(true);
        if(!mounted) return
        const respond = await fetch(`${api_Url}?limit=${limit}&skip=${skip}`);
        if (respond.ok) {
          const data = await respond.json();
          // console.log(data.products)
          setProductData(data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
return()=>{
  mounted=false 
}

  }, [api_Url, skip, limit]);

  function pagination(number: number) {
    setLimit(limit + number);
    setSkip(limit + number);
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
          pagination,
          searchBar,
          setSearchBar,
          cartItems,
          setCartItems,
          updateQuantity,
        }}
      >
        <NavBar />
        <Outlet />
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
