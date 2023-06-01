import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewShopForm from "./NewShopForm";

const NewShopButton = () => {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <div>
      <div className={displayForm ? "hidden" : ""}>
        <button
          className="relative inline-block px-4 py-2 font-medium group"
          onClick={() => setDisplayForm(!displayForm)}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-yellow-300 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-yellow-300"></span>
          <span className="relative text-black font-semibold group-hover:text-black">
            Add a New Shop
          </span>
        </button>
      </div>
      <div className={displayForm ? "" : "hidden"}>
        <NewShopForm
          displayForm={displayForm}
          setDisplayForm={setDisplayForm}
        />
      </div>
    </div>
  );
};

export default NewShopButton;
