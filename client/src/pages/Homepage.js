import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../helpers';
import { API, BEARER } from '../constant';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';


const Homepage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    // If user is already logged in, redirect to user dashboard
  useEffect(() => {
    if (getToken()) {
      axios
      .get(
        `${API}/users/me`,
        {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data)
      // console.log("user from if statement on registration page: ", res.data);
      navigate(`/dashboard/${res.data.id}`);
    })
    }
    // console.log("API END POINT: ", API);
  }, [navigate, setUser]);


      return (
        <div>
          
    
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
                {/* GRADIENT */}
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffffff] to-[#FFDB58] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Strikify
                </h1>
                <p className="mt-6 text-lg leading-8 text-white">
                Turn your phone into a point of sale powered by the Bitcoin Lightning network.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                to={'/login'}
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    Login
                  </Link>
                  <Link
                  to={'/registration'}
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    Sign Up Free
                  </Link>

                  
                  
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FFDB58] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
        </div>
      )
    }
    

export default Homepage