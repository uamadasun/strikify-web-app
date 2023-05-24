import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API, BEARER } from "../constant";
import { setToken, getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [initialUser, setInitialUser] = useState({ email: "null@email.com" });

  //   Check if user is already logged in; if so, redirect to user's dashboard
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
      console.log("user from if statement on login page: ", res.data);
      navigate(`/dashboard/${res.data.id}`);
    })
    }
    console.log("API END POINT: ", API);
  }, [navigate, setUser]);

  // Setting login information
  const handleInputChange = (e) => {
    setInitialUser({
      ...initialUser,
      [e.target.name]: e.target.value,
    });
  };

  //Form submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API}/auth/local`, initialUser)
      .then((res) => {
        // setLogged(res.data);
        setUser(res.data);
        setToken(res.data.jwt);

        console.log("getting token from login submit handler: ", getToken());
        navigate(`/dashboard/${res.data.id}`, { replace: true });
      })
      .catch((err) => {
        console.log(err.response);
        // console.log(`You've hit an error!`)
      });
  };

  return (
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-6 login">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-6 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          {error ? error : ""}
          <div>
            <label
              htmlFor="identifier"
              className="block text-md font-semibold leading-1 mt-3 text-white"
            >
              Strike Username
            </label>
            <div className="mt-2">
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="identifier"
                required
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-md font-semibold leading-6 text-white"
              >
                Password
              </label>
              <div className="text-xs">
                <a
                  href="#"
                  className="font-semibold text-yellow-300 hover:text-slate-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="hidden"
                // autoComplete="email"
                // value='random_email@gmail.com'
                
                className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-300 sm:text-sm sm:leading-6"
                // onChange={handleInputChange}
                
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mx-auto my-5 block rounded-lg px-7 py-2.5 text-base font-semibold leading-7 bg-yellow-300 text-black hover:text-black hover:bg-zinc-300"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link
            to="/registration"
            className="font-semibold leading-6 text-yellow-300 hover:text-zinc-300"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
