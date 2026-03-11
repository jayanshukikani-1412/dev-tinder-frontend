import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequests } from "../utils/request-slice";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store?.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getRequests = async () => {
    if (requests?.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/user/request", {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data?.data));
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (requestId, status) => {
    setLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(requestId));
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Requests</h2>
      {requests?.length > 0 ? (
        <div className="flex flex-wrap justify-center my-10 gap-10">
          {requests?.map((request) => {
            const { _id, firstName, lastName, age, gender, photoUrl } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="card bg-base-300 w-96 shadow-sm p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    className="w-20 h-20 rounded-full"
                    src={photoUrl}
                    alt={firstName}
                  />

                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold">
                      {firstName} {lastName}
                    </h2>
                    {age && (
                      <p className="text-sm text-base-content/70">Age: {age}</p>
                    )}
                    {request?.gender && (
                      <p className="text-sm text-base-content/70">
                        Gender: {gender}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline btn-error btn-sm flex-1 rounded-xl font-medium"
                    onClick={() => reviewRequest(request?._id, "rejected")}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Reject"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm flex-1 rounded-xl font-medium shadow-lg shadow-primary/25"
                    onClick={() => reviewRequest(request?._id, "accepted")}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Accept"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center my-10">
          <h2 className="text-2xl font-bold text-center my-10">
            No requests found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Requests;
