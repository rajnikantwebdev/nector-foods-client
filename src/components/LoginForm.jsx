import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";


const LoginForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  let navigate = useNavigate();

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/login`,
        userData
      );
    
      if (response && response.status === 200) {
        setSuccessMessage(response?.data?.message);
        setIsUserRegistered(true);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("username", response?.data?.user?.username);
        localStorage.setItem("role", response?.data?.user?.role);
        setTimeout(() => {
          navigate("/");
        }, 2000);

      }
    } catch (error) {
      console.log("register error: ", error);
    } finally {
        setTimeout(() => {
            setIsUserRegistered(false)
        }, 2000)
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(successMessage)
  }, [successMessage])

  return (
    <div class="flex flex-col justify-center sm:h-screen p-4">
      <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div class="text-center mb-12">
          <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              class="w-40 inline-block"
            />
          </a>
        </div>

        <form onSubmit={(e) => handleFormSubmission(e)}>
          <div class="space-y-6">
            <div>
              <label class="text-slate-900 text-sm font-medium mb-2 block">
                username
              </label>
              <input
                name="username"
                value={userData.username}
                onChange={handleOnChange}
                type="text"
                class="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label class="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="text"
                min={8}
                value={userData.password}
                onChange={handleOnChange}
                class="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div class="mt-12">
            <button
              type="submit"
              class="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Login to your account
            </button>
          </div>
          <p class="text-slate-600 text-sm mt-6 text-center">
            New user?{" "}
            <Link
              to="/register"
              class="text-blue-600 font-medium hover:underline ml-1"
            >
              Register Here
            </Link>
          </p>
          <div className="text-center py-2">{isUserRegistered && successMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
