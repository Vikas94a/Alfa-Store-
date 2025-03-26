import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { Link } from "react-router-dom";

export default function () {
  const [category, setCategory] = useState<string[]>([]);

  const context = useContext(Context);

  if (!context) {
    return <div>No data yet!</div>;
  }
  const { loading, setLoading, api_Url } = context;

  useEffect(() => {
    async function fetchDataCtegory() {
      try {
        setLoading(true);
        const respond = await fetch(`${api_Url}/category-list`);
        const data = await respond.json();
        setCategory(data);
       
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDataCtegory();
  }, []);

//   console.log(category)

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (category.map((option, index)=>{
        return(
            <ul key={index} >
<Link to={`/category/${option}`}>
                <li  className="text-white cursor-pointer hover:text-red-500">{option.charAt(0).toUpperCase()+ option.slice(1)}</li>
                </Link>
            </ul>
        )
      })
          )
        }
    </>
  );
}
