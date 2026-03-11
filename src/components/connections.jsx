import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connection-slice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store?.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getConnections = async () => {
    if (connections?.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Connections</h2>
      {connections?.length > 0 ? (
        <div className="flex flex-wrap justify-center my-10 gap-10">
          {connections?.map((connection) => (
            <div
              key={connection?._id}
              className="card bg-base-300 w-96 shadow-sm p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  className="w-20 h-20 rounded-full"
                  src={connection?.photoUrl}
                  alt={connection?.firstName}
                />

                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">
                    {connection?.firstName} {connection?.lastName}
                  </h2>
                  {connection?.age && (
                    <p className="text-sm text-base-content/70">
                      Age: {connection?.age}
                    </p>
                  )}
                  {connection?.gender && (
                    <p className="text-sm text-base-content/70">
                      Gender: {connection?.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-10">
          <h2 className="text-2xl font-bold text-center my-10">
            No connections found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Connections;
