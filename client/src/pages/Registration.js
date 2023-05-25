import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { API, BEARER, STRIKE } from "../constant";
import { getToken, setToken } from "../helpers";
import axios from "axios";
import '../styles/Login.css'

const Registration = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [initialUser, setInitialUser] = useState({});

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
      console.log("user from if statement on registration page: ", res.data);
      navigate(`/dashboard/${res.data.id}`);
    })
    }
    console.log("API END POINT: ", API);
    console.log("STRIKE: ", STRIKE)
  }, [navigate, setUser]);

  //handle registration form inputs changing
  const handleInputChange = (e) => {
    setInitialUser({
      ...initialUser,
      [e.target.name]: e.target.value,
    });
  };

  //registration form submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let config = {
      method: "get",
      url: `https://api.strike.me/v1/accounts/handle/${initialUser.username}/profile`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${STRIKE}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (initialUser.password === initialUser.confirm_password) {
          axios
            .post(`${API}/auth/local/register`, initialUser)
            .then((res) => {
                console.log("user registered")
              setUser(res.data);
              setToken(res.data.jwt);
              navigate(`/dashboard/${res.data.user.id}`, { replace: true });
            })
            .catch((err) => {
              console.log(err.response);
              setError("Username is already taken. Sign in or try again")
            });
        }
        else{
            setError("Passwords must match. Try again.")
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Strike account not found. Try again.")
      });
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 login">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Register for an account
        </h2>
      </div>

      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" onSubmit={onSubmitHandler}>
          {error ? <p className="error">{error}</p> 
          
          : ""}

          <div>
            <label
              htmlFor="username"
              className="block text-md font-semibold mt-3 leading-6 text-white"
            >
              Strike Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                // autoComplete="username"
                required
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="hidden"
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"                
              />
            </div>
          </div> */}

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-md font-semibold leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm_password"
                className="block text-md font-semibold leading-6 text-white"
              >
                Confirm Password
              </label>
              {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
            </div>
            <div className="mt-2">
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="confirm-password"
                required
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className=" mx-auto my-5 block rounded-md bg-yellow-300 px-7 py-2.5 text-sm font-semibold leading-7 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-zinc-300">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-yellow-300 hover:text-white"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
