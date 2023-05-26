import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER, STRIKE } from "../constant";
import { getToken } from "../helpers";
import axios from "axios";
import UserProfilePic from "../components/UserProfilePic";
import '../styles/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [shops, setShops] = useState([])


  
  

  if (!user){
    return "Loading..."
  }
  return (
    <div>
        
        <UserProfilePic username={user.username}/>
        
        
    </div>
  )
};

export default Dashboard;
