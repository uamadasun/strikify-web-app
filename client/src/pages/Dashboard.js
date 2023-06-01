import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER, STRIKE } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import NewShopButton from "../components/NewShopButton";
import { ShopContext } from "../App";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useContext(ShopContext);

  const fetchShops = async () => {
    setLoading(true);

    await axios
      .get(`${API}/shops?filters[shop_owner][$eq]=${user.username}`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      })
      .then(async (res) => {
        await setShops(res.data.data);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchShops();
    }
  }, []);

  if (!user || (user && loading)) {
    return "Loading...";
  }
  return (
    <div className="dashboard-content">
      <div className="profile-pic">
        <UserProfilePic username={user.username} />
      </div>
      <div className="mt-40 ">
        {shops.length > 0 ? (
          <div className="mt-40 max-w-md mx-auto">
            <ul className="divide-y divide-white/5">
              {shops.map((shop) => (
                <Link to={`/shops/${shop.id}`} key={shop.id}>
                  <li className=" relative flex items-center space-x-4 py-4">
                    <div className="min-w-0  flex-auto">
                      <div className="flex items-center gap-x-3">
                        <h2 className="min-w-0 text-md font-semibold leading-6 text-white">
                          <Link
                            to={`/shops/${shop.id}`}
                            className="flex gap-x-2"
                          >
                            <span className="truncate">
                              {shop.attributes.shop_name}
                            </span>
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
              {" "}
              <NewShopButton />
            </div>
          </div>
        ) : (
          <div className="new-text text-center mt-50">
            <div
              className="px-4 py-3 leading-normal text-black bg-white rounded-lg w-1/2 mx-auto"
              role="alert"
            >
              <p className="mb-3">You don't have any shops.</p>
              <NewShopButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
