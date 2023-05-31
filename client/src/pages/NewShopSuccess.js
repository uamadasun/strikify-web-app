import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import UserProfilePic from "../components/UserProfilePic";
import "../styles/Dashboard.css";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import NewShopButton from "../components/NewShopButton";
import { ShopContext } from "../App";

const NewShopSuccess = () => {
  const { user } = useAuthContext();

  if (!user) {
    return "Loading...";
  }
  return (
    <div className="dashboard-content">
      <div className="profile-pic">
        <UserProfilePic username={user.username} />
      </div>
      <div className="mt-40 ">
        <div class="bg-black p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            class="text-yellow-300 w-12 h-12 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div class="text-center">
            <h3 class="md:text-xl text-base text-white font-semibold text-center">
              Shop Created!
            </h3>

            <div class="py-6 text-center">
              <Link to={`/dashboard/${user.id}`}
                class="relative inline-block px-4 py-2 font-medium group"
              >
                <span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-yellow-300 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-yellow-300"></span>
                <span class="relative text-black group-hover:text-black">
                  Back to Profile
                </span>
              </Link>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default NewShopSuccess;
