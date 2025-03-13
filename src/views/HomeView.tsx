import { useContext } from "react";
import { Context } from "../App";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

export default function HomeView() {
  const context = useContext(Context);
  if (!context) {
    return <div>No data yet!</div>;
  }

  const { productData, loading } = context;

  // console.log(productData);

  return (
    <div>
    <div className="flex flex-wrap flex-1 justify-between items-center p-5 w-full ">
      {loading ? (
        <p>Loading....</p>
      ) : (
        productData.map((products) => {
          return (
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
          );
        })
      )}
    </div>
    <Pagination/>
    </div>
  );
}
