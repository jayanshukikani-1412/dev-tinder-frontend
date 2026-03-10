import React from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store: any) => store?.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(BASE_URL + "/logout");
      navigate("/login");
      return response;
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 mx-2">
        <a className="btn btn-ghost text-xl">💻DevTinder</a>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="flex items-center">
            <p>Welcome, {user?.firstName}</p>

            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile Picture"
                    src={
                      user?.photoUrl
                        ? user?.photoUrl
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-5 w-52 p-2 shadow">
                <li>
                  <Link
                    to={"/profile"}
                    className="justify-between"
                  >
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/feed"}>Feed</Link>
                </li>
                <li onClick={handleLogout}>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
