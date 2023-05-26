import React, { useEffect, useState } from 'react'
import { STRIKE } from '../constant';
import axios from 'axios';
import '../styles/Dashboard.css'
import { useAuthContext } from '../context/AuthContext';

const UserProfilePic = (props) => {
    const {username} = props;
    const {user} = useAuthContext();
    const [error, setError] = useState('')
    const [picURL, setPicURL] = useState('')

    useEffect(()=>{
        //find Strike user
        let config = {
            method: "get",
            url: `https://api.strike.me/v1/accounts/handle/${username}/profile`,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${STRIKE}`,
            },
          };

          axios(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            setPicURL(response.data.avatarUrl);
            // console.log(response.data.avatarUrl)
          })
          .catch((error) => {
            console.log(error);
            setError("Strike account not found. Try again.")
          });
    
      })
  return (
    <div>
        <img className='mx-auto mb-5 rounded-full center-crop' src={picURL} height={'50px'} alt={'strike profile pic'}/>
        <h1 className='text-center text-white text-3xl username'>{user.username}</h1>
    </div>
  )
}

export default UserProfilePic