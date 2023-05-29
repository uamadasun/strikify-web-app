import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER, STRIKE } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    if (user) {
      //   console.log("my user: ", user);
      axios
        .get(`${API}/shops?filters[shop_owner][$eq]=${user.username}`, {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        })
        .then((res) => {
          setShops(res.data.data);
          console.log("Shops: ", res.data.data);
          //   navigate(`/dashboard/${res.data.id}`);
        });
    }
  }, [user]);

  if (!user) {
    return "Loading...";
  }
  return (
    <div className="dashboard-content">
      <div className="profile-pic">
        <UserProfilePic username={user.username} />
      </div>

      {shops.length >= 0 ? (
        <div className=" bg-black mt-40 max-w-md mx-auto">
          <ul className="divide-y divide-white/5">
            {shops.map((shop) => (
              <Link to={`/shops/${shop.id}`}>
                <li
                  key={shop.id}
                  className=" relative flex items-center space-x-4 py-4"
                >
                  <div className="min-w-0  flex-auto">
                    <div className="flex items-center gap-x-3">
                      <h2 className="min-w-0 text-md font-semibold leading-6 text-white">
                        <Link to={`/shops/${shop.id}`} className="flex gap-x-2">
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
        </div>
      ) : (
        <>
          <p className="text-white">Nothing to show here</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
