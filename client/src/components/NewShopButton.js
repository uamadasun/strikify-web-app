import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewShopForm from "./NewShopForm";

const NewShopButton = () => {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <div>
      <div className={displayForm ? "hidden" : ""}>
        <button
          onClick={() => setDisplayForm(!displayForm)}
          className={
            displayForm
              ? "hidden"
              : " mx-auto my-5 block rounded-md bg-yellow-300 px-7 py-2.5 text-sm font-semibold leading-7 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          }
        >
          Add a New Shop
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
