import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER, STRIKE } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("my user: ", user);
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
    <div className="dash-content">
      <div className="profile-pic">
        <UserProfilePic username={user.username} />
      </div>
      <div className="">
        {/* <button className="btn">okay!</button> */}
      </div>
    </div>
  );
};

export default Dashboard;
