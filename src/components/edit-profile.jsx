import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/user-slice";
import UserCard from "./user-card";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || 0);
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setError("");
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName,
          lastName: lastName,
          about: about,
          age: age,
          gender: gender,
          photoUrl: photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response?.data?.data));
      showToast("Profile updated successfully!");
      setTimeout(() => navigate("/feed"), 1500);
      return response;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong";
      setError(message);
      showToast(
        typeof message === "string" ? message : "Something went wrong",
        "error",
      );
    }
  };

  return (
    <div className="flex gap-10 my-10">
      <div className="flex justify-center overflow-y-auto">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-2xl text-center justify-center">
              Edit Profile
            </h2>
            <form onSubmit={submitHandler}>
              <div>
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.trim())}
                  />
                </fieldset>

                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.trim())}
                  />
                </fieldset>
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value.trim())}
                  />
                </fieldset>
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value.trim())}
                  />
                </fieldset>
                <fieldset className="fieldset p-2">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value.trim())}
                  />
                </fieldset>
              </div>
              {error && <p className="text-red-400 my-2 mb-4">{error}</p>}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <UserCard
        firstName={firstName}
        lastName={lastName}
        age={age}
        gender={gender}
        about={about}
        photoUrl={photoUrl}
      />

      {/* daisyUI toast */}
      <div className="toast toast-top toast-end">
        {toast.show && (
          <div
            className={`alert ${toast.type === "error" ? "alert-error" : "alert-success"}`}
          >
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
