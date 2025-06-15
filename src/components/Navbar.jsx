import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className=" w-full bg-blue-600 py-4 px-6">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-xl fond-bold text-white">Nector Foods</h1>
        </div>
        <div>
          {!localStorage.getItem("token") ? (
            <div>
              <Link to={"/register"}>Register</Link>
              <Link to={"/login"}>Login</Link>
            </div>
          ) : (
            <span className="text-lg text-white">{"Hi " + localStorage.getItem("username")}</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
