import React, { useState, useContext } from "react";
import { API, BEARER } from "../constant";
import axios from "axios";
import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";
import {shops, setShops } from '../pages/Dashboard'
import { ShopContext } from "../App";
import { useNavigate } from "react-router-dom";

const NewShopForm = (props) => {
    const {displayForm, setDisplayForm} = props;
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const [shop, setShop] = useState({shop_owner:user.username});
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
      .post(`${API}/shops`,{data: shop}, {headers: {
        Authorization:`Bearer ${getToken()}`
      }})
      .then((res) => {
        console.log(res);
        setShops({...shops, res})
        navigate(`/success/shop`)
      })
      .catch((err) => {
        console.log(err.response);
      });
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          <div>
            
            <div className="mt-2">
              <input
                id="shop_name"
                name="shop_name"
                type="text"
                autoComplete="shop_name"
                required
                placeholder="Shop Name..."
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <input
              id="shop_owner"
              name="shop_owner"
              type="hidden"
              required
              value={user.username}
            />
          </div>

          <div className="flex mx-auto w-1/2 justify-center align-middle gap-2">
            <button
              type="submit"
              className={
                loading
                  ? "hidden"
                  : "btn block rounded-lg px-auto py-auto text-base font-semibold leading-7 bg-yellow-300 text-black hover:text-black hover:bg-zinc-300"
              }
            >
              Create Shop
            </button>
            <button onClick={()=>{setDisplayForm(!displayForm)}} className="btn block rounded-lg px-auto py-auto text-base font-semibold leading-7">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewShopForm;
