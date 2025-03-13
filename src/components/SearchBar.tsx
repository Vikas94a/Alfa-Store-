import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

export default function SearchBar(){
    const[searchBar, setSearchBar]= useState<string>()

    return(
        <div className="flex justify-center items-center border border-yellow-500 rounded w-96 h-8">
            <input type="text"
            name="text"
            value={searchBar}
            onChange={((e:React.ChangeEvent<HTMLInputElement>)=>setSearchBar(e.target.value))}  
            placeholder="Search items with name...." 
            className="w-88 h-8 focus:outline-none text-white "         />
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </div>
    )
}