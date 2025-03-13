  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faStore } from "@fortawesome/free-solid-svg-icons";
  import SearchBar from "./SearchBar";
  import Menuoption from "./Menuoption";


  export default function NavBar() {


    return (
      <div className="flex flex-wrap p-4 bg-black shadow-2xl ">
        <div className="flex justify-center items-center mr-10 space-x-4 text-yellow-500">
          <FontAwesomeIcon icon={faStore} />
          <h2 className="text-2xl ">ALFA Store</h2>
          <div> <SearchBar/></div>
        </div>
      <div className= "flex flex-wrap justify-center space-x-4 w-full p-2 mt-4"> <Menuoption/> </div>
        
      </div>
    );
  }
