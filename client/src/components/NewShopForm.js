import React, { useState, useContext } from "react";
import { API, BEARER } from "../constant";
import axios from "axios";
import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";
import { shops, setShops } from "../pages/Dashboard";
import { ShopContext } from "../App";
import { useNavigate } from "react-router-dom";

const NewShopForm = (props) => {
  const { displayForm, setDisplayForm } = props;
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const [shop, setShop] = useState({ shop_owner: user.username });
  const [shops, setShops] = useContext(ShopContext);
  const navigate = useNavigate();

  // form handler for new shop
  const handleInputChange = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${API}/shops`,
        { data: shop },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setShops({ ...shops, res });
        navigate(`/shops/${res.data.data.id}`);
      })
      .catch((err) => {
        console.log(err.response);
      });
    setLoading(false);
  };

  return (
    
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div  className="flex flex-col items-center justify-center">
            <button
              onClick={() => {
                setDisplayForm(!displayForm);
              }}
              className=" hover:text-yellow-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="mt-2 w-auto">
              <input
                id="shop_name"
                name="shop_name"
                type="text"
                autoComplete="shop_name"
                required
                placeholder="Shop Name..."
                className="pl-2 rounded-md mx-auto border-0 w-full py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className={
                loading
                  ? "hidden"
                  : " mx-auto my-3 block btn btn-sm rounded-md bg-yellow-300 px-auto py-auto text-sm font-semibold leading-7 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
              }
            >
              Create Shop
            </button>
          </div>

        </form>
      </div>
    
  );
};

export default NewShopForm;
