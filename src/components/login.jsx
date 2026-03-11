import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/user-slice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLoginHandler = async (e) => {
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
      navigate("/");
      return response;
    } catch (error) {
      setError(error.response?.data || "something went wrong");
    }
  };

  const submitSignupHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email.trim().toLowerCase(),
          password: password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
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
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <form
            onSubmit={isLoginForm ? submitLoginHandler : submitSignupHandler}
          >
            <div>
              {!isLoginForm && (
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.trim())}
                  />
                </fieldset>
              )}

              {!isLoginForm && (
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.trim())}
                  />
                </fieldset>
              )}

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
            <div className="card-actions justify-center mt-3">
              <button
                className="btn btn-primary"
                type="submit"
              >
                {isLoginForm ? "Login" : "Signup"}
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">
            {isLoginForm
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              onClick={() => setIsLoginForm(!isLoginForm)}
              className="text-blue-500 cursor-pointer"
            >
              {isLoginForm ? "Signup here" : "Login here"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
