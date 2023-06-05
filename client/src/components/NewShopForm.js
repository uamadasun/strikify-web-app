import React, { useState, useContext } from "react";
import { API, BEARER } from "../constant";
import axios from "axios";
import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewShopForm = (props) => {
  const [showModal, setShowModal] = useState(false);
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [shop, setShop] = useState({owner:user})

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value)
    setShop((prevState) => ({ ...prevState, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log('form submitted')
    
          e.preventDefault();
          setLoading(true);
        
          axios
            .post(
              `${API}/shops`,
              { data: shop },
              {
                headers: {
                  Authorization: `${BEARER} ${getToken()}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              navigate(`/shops/${res.data.data.id}`);
            })
            .catch((err) => {
              console.log(err.response);
            })
            .finally(() => {
              setLoading(false);
            });
    
  }
  return (
    <>
      <button
        className="bg-yellow-300 btn py-0 w-max btn-sm  text-black active:bg-yellow-600 font-bold uppercase text-sm  rounded shadow hover:bg-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create New Shop
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold text-black">
                    New Shop
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-8 pb-auto flex-auto">
                  <form>
                    <div>
                      <label htmlFor="shop_name" className="sr-only ">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        name="shop_name"
                        id="shop_name"
                        className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Shop Name..."
                        required
                        onChange={handleInputChange}
                      />
                      <input
                        type="hidden"
                        name="owner"
                        id="owner"
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 ">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-yellow-300 border-yellow-300 px-8 hover:shadow text-black active:bg-black hover:bg-white font-bold uppercase text-sm rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btn btn-sm"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default NewShopForm;
