import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { Context } from "../App";

export default function SearchBar() {
  const context = useContext(Context);
  if (!context) {
    return <div>Loading....</div>;
  }
  const { searchBar, setSearchBar } = context;

 

  return (
    <div className="flex justify-center items-center border border-yellow-500 rounded w-96 h-8 ml-2.5">
      <input
        type="text"
        name="text"
        value={searchBar}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchBar(e.target.value)
        }
        placeholder="Search items with name...."
        className="w-88 h-8 focus:outline-none text-white "
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}
