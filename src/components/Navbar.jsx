import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("username")
            localStorage.removeItem("role")
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <nav className=" w-full bg-blue-600 py-4 px-6">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl fond-bold text-white">Nector Foods</h1>
        </div>
        <div>
          {!localStorage.getItem("token") ? (
            <div className="flex items-center gap-4">
              <Link className="text-white hover:text-gray-200 underline" to={"/register"}>Register</Link>
              <Link className="text-white hover:text-gray-200 underline" to={"/login"}>Login</Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-lg text-white">
                {"Hi " + localStorage.getItem("username")}
              </span>
              <button onClick={handleLogout} className="text-white underline hover:text-gray-200 cursor-pointer">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
