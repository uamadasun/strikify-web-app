import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import NewShopForm from "../components/NewShopForm";
import { ShopContext } from "../App";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/users/me?populate=*`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      });
      console.log("res:", res.data);

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
      <div className="mt-40 shops">
        {shops.length > 0 ? (
          <div className="mt-40 max-w-md mx-auto">
            <ul className="divide-y divide-white/5">
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
            <div className="mx-auto rounded-lg">
              <NewShopForm />
            </div>
          </div>
        ) : (
          <div className="new-text text-center mt-50 mx-auto flex flex-col justify-center items-center align-middle">
            <div
              className="leading-normal text-whiterounded-lg mx-auto"
            >
              <p className="mb-3 w-max">You don't have any shops.</p>
              <div className=""><NewShopForm /></div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
