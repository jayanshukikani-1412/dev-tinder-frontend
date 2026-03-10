import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/user-slice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data?.data));
      navigate("/feed");
      return response;
    } catch (error) {
      setError(error.response?.data || "something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-2xl text-center justify-center">
            Login
          </h2>
          <form onSubmit={submitHandler}>
            <div>
              <fieldset className="fieldset p-2">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value.trim().toLowerCase())
                  }
                />
              </fieldset>

              <fieldset className="fieldset p-2">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </fieldset>
            </div>
            {error && <p className="text-red-400 my-2 mb-4">{error}</p>}
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
