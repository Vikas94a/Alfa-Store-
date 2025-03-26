  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faStore } from "@fortawesome/free-solid-svg-icons";
  import { Link } from "react-router-dom";
  import SearchBar from "./SearchBar";
  import Menuoption from "./Menuoption";
  import Cart from "./Cart";


  export default function NavBar() {


    return (
      <div className="flex flex-wrap p-4 bg-zinc-700 shadow-2xl  ">
        <div className="flex justify-between items-center w-3xl  text-yellow-500">
<Link to={`/`}>
<div className="flex gap-3 justify-center items-center">
          <FontAwesomeIcon icon={faStore} />
          <h2 className="text-2xl ">ALFA Store</h2>
          </div>
          </Link>
          <div className=""> <SearchBar/></div>
        </div>
      <div className= "flex flex-wrap justify-center space-x-4 w-full p-2 mt-4"> <Menuoption/> </div>
        <div><Cart/></div>
      </div>
    );
  }
