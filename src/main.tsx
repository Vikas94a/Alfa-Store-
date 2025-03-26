import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import ErrorView from './views/ErrorView.tsx'
import HomeView from './views/HomeView.tsx'
import ProductByCategory from './views/ProductByCategory.tsx'
import ProductView from './views/ProductView.tsx'
import CartView from './views/CartView.tsx'

const router= createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorView/>,
    children:[
      {
        path:"/",
element:<HomeView/>
      },{
        path:"/category/:option",
        element:<ProductByCategory/>
      },{
        path:"/:id",
        element:<ProductView/>
      },{
        path:"/cartview",
        element:<CartView/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
