import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router";

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        username:"",
        password:"",
        role:""
    })
    const [successMessage, setSuccessMessage] = useState(null)
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/register`, userData)
            if(response && response.status === 200) {
                setSuccessMessage(response?.data?.messsage)
                setIsUserRegistered(true)
            }
        } catch (error) {
            console.log("register error: ", error)
        }
    }

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    };

    useEffect(() => {
        console.log(userData)
    }, [userData])

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
            <div className="flex item-center gap-4">
              <div>
                <input
                  onChange={handleOnChange}
                  checked={userData.role === "admin"}
                  type="radio"
                  name="role"
                  value={"admin"}
                  id="admin"
                />
                <label htmlFor="admin" className="cursor-pointer">
                  Admin
                </label>
              </div>
              <div>
                <input
                  onChange={handleOnChange}
                  checked={userData.role === "student"}
                  value={"student"}
                  type="radio"
                  name="role"
                  id="student"
                />
                <label htmlFor="student" className="cursor-pointer">
                  Student
                </label>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <button
              type="submit"
              class="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Create an account
            </button>
          </div>
          <p class="text-slate-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              class="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
          <div>{successMessage}</div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm