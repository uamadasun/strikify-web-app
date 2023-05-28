import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER, STRIKE } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";
import shopLogo from '../assets/shop.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
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
        <div className='mx-40'>
        <div className="block md:flex mt-60 justify-center lg:flex">
            
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="max-w-200 bg-white rounded overflow-hidden shadow-lg m-2 min-w-150 "
            >
              
              <div className="px-6 py-2">
                <div className="font-bold text-center text-xl mb-2 text-slate-800">{shop.attributes.shop_name}</div>
                
              </div>
              <div className="px-6 pt-0  pb-2  flex-col text-black text-center mb-5 text-xl">
                <p><Link className="hover:text-yellow-400 hover:font-black">Create Order</Link></p>
                <p><Link className="hover:text-yellow-400 hover:font-black">Edit Inventory</Link></p>
                
              </div>
            </div>
          ))}
        </div>
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
