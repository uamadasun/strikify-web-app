import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();
  const [shop, setShop] = useState({ owner: user });
  console.log("User from dashboard: ", user)

  // Input change handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setShop((prevState) => ({ ...prevState, [e.target.name]: value }));
  };

// SUbmit handler 
  const handleSubmit = async (e) => {
    console.log("form submitted");
    console.log(shop)

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
  };

  // Fetch user's current shops
  const fetchShops = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/users/me?populate=*`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      });

      setShops(res.data.shops);
    } catch (error) {
      console.log("this is the error message", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (!user || loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-content">
      <div className="profile-pic">
        <UserProfilePic username={user.username} />
      </div>

      {/* CREATE SHOP FORM */}
      <div className="flex justify-center align-middle mt-40 mx-auto p-4 shop-form w-full gap-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div>
            <label htmlFor="shop_name" className="sr-only ">
              Shop Name
            </label>
            <input
              type="text"
              name="shop_name"
              id="shop_name"
              className="shop-input bg-white rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Shop Name..."
              required
              onChange={handleInputChange}
            />
            <input type="hidden" name="owner" id="owner" value={user}/>
          </div>
          <button className="btn btn-sm w-min mx-auto mt-0.5 bg-yellow-300 hover:bg-white text-black">
            Create Shop
          </button>
        </form>
      </div>

      {/* LIST OF SHOPS */}
      <>
        <div className=" h-30 shops overflow-scroll w-1/2 mx-auto border border-solid border-white">
          {shops.length > 0 ? (
            <div className="mt-30 max-w-md mx-auto">
              <ul className="divide-y divide-white-5">
                {shops.map((shop) => (
                  <Link to={`/shops/${shop.id}`} key={shop.id}>
                    <li className="relative flex items-center space-x-4 py-4">
                      <div className="min-w-0 flex-auto">
                        <div className="flex items-center gap-x-3">
                          <h2 className="min-w-0 text-md font-semibold leading-6 text-white">
                            <Link
                              to={`/shops/${shop.id}`}
                              className="flex gap-x-2"
                            >
                              <span className="truncate">{shop.shop_name}</span>
                            </Link>
                          </h2>
                        </div>
                      </div>

                      <ChevronRightIcon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            <div className="new-text text-center mt-50 mx-auto flex flex-col justify-center items-center align-middle">
              <div className="leading-normal text-whiterounded-lg mx-auto">
                <p className="w-max">You don't have any shops.</p>
              </div>
            </div>
          )}
        </div>
      </>

      
    </div>
  );
};

export default Dashboard;
