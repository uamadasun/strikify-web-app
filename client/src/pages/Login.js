import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API, BEARER } from "../constant";
import { setToken, getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialUser, setInitialUser] = useState({});

  useEffect(() => {
    if (getToken()) {
      axios
        .get(`${API}/users/me`, {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          navigate(`/dashboard/${res.data.id}`);
        });
    }
  }, [navigate, setUser]);

  const handleInputChange = (e) => {
    const value = e.target.name === "username" ? e.target.value.toLowerCase() : e.target.value;
    setInitialUser((prevState) => ({ ...prevState, [e.target.name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/local`, initialUser);
      setUser(res.data.user);
      setToken(res.data.jwt);
      navigate(`/dashboard/${res.data.user.id}`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-6 login">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-6 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmitHandler}>
          {error && <p className="error font-semibold">{error}. Try again.</p>}

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
            <button
              type="submit"
              className={
                loading
                  ? "hidden"
                  : "mx-auto my-5 block rounded-lg px-7 py-2.5 text-base font-semibold leading-7 bg-yellow-300 text-black hover:text-black hover:bg-zinc-300"
              }
            >
              Sign In
            </button>

            <button
              disabled
              type="button"
              className={
                loading
                  ? " mx-auto py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-500 focus:z-10 focus:ring-4 focus:outline-none focus:ring-yellow-300 focus:text-yellow-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  : "hidden"
              }
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
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
