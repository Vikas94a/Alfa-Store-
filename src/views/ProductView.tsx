import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";

interface Review {
  comment: string;
  ratings: number;
}

interface ProductView {
  images: string;
  title: string;
  description: string;
  price: number;
  availabilityStatus: string;
  reviews: Review[];
  rating?: number;
}

export default function ProductView() {
  const { id } = useParams();
  const [productView, setProductView] = useState<ProductView>(
    {} as ProductView
  );
  const contex = useContext(Context);
  if (!contex) {
    return <div>No data yet!</div>;
  }
  const { api_Url, setLoading } = contex;

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        const respond = await fetch(`${api_Url}/${id}`);
        if (!mounted) return;
        if (respond.ok) {
          const data = await respond.json();
          setProductView(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  console.log(productView);

  return (

    // product view image 
    
    <div className="min-h-screen w-full  flex item-center mt-9 bg-zinc-100">
      <div className="flex item-center h-[500px] w-full p-4 m-6 bg-white shodow-2xl  object-cover rounded">
        <img
          className=" w-129 shadow-2xl-black"
          src={productView.images}
          alt={productView.title}
        />
      </div>


{/* product discription */}


      <div className="flex flex-col mx-auto w-full mt-7 ">
        <div className="flex flex-col justify-between p-4 bg-white w-120 rounded shadow-2xs">
          <div className="flex  justify-between w-full ">
            <h1 className="font-bold text-3xl text-black font-serif">{productView.title}</h1>
            <span className="bg-green-100 p-1 rounded-full text-sm text-green-800 text-center ">
              {productView.availabilityStatus}
            </span>
          </div>
          <div className="">
            <div className="flex items-center space-x-2 ">
              <span className="text-yellow-400 text-2xl">
                {"★".repeat(Math.floor(productView.rating || 0))}
                {"☆".repeat(5 - Math.floor(productView.rating || 0))}
              </span>
              <span className="text-gray-500 text-xl">({productView.rating})</span>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="font-bold font-sans text-center">Description</h2>
            <p className="text-zinc-400 mt-3 text-center">{productView.description}</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between" >
              <span className="text-xl font-bold pl-1.5 text-red-600" >NOK  {productView.price}</span>
              <button className="bg-blue-500 text-white font-bold p-2 rounded">Add to Cart</button>
            </div>
          </div>
        </div>


{/* costumer review  */}
        <div className="bg-white  mt-4 p-6  w-120 shadow-lg">
          <h2 className="font-sans font-bold">Costumer Reviews</h2>
          <div>
            {productView.reviews?.length ? (
              productView.reviews.map((review, index) => (
                <div key={index}>
                  <div>
                    <span>
                      {"⭐".repeat(Math.floor(review.ratings))}
                      {"⭐".repeat(5 - Math.floor(review.ratings))}
                    </span>
                    <span>({review.ratings})</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No Review Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
