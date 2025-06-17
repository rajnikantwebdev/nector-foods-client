import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="w-full shadow-md py-2 pr-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200"
          >
            <img src="/nector-logo.png" alt="nector-foods" className="h-12 object-cover" />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-lg text-black font-medium">Hi, {username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer flex items-center gap-2 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
