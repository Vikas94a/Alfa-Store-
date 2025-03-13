import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Context } from "../App";

export default function Pagination() {
  const context = useContext(Context);

  if (!context) {
    return <div>No data yet!</div>;
  }

  const { pagination } = context;

  return (
    <div className="flex justify-center w-full p-2 ">
      <button
        onClick={() => pagination(20)}
        className="bg-orange-500 text-white font-bold p-2 rounded"
      >
        Show More
        <FontAwesomeIcon className="ml-2" icon={faArrowDown} />
      </button>
    </div>
  );
}
