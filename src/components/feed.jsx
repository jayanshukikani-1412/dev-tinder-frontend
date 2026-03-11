import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feed-slice";
import UserCard from "./user-card";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeeds = async () => {
    if (feed?.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Feed</h2>
      {feed?.length > 0 ? (
        <div className="flex flex-wrap justify-center my-10 gap-10">
          {feed?.map((item) => (
            <UserCard
              key={item?.id}
              firstName={item?.firstName}
              lastName={item?.lastName}
              age={item?.age}
              gender={item?.gender}
              about={item?.about}
              photoUrl={item?.photoUrl}
              isActionButton={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center my-10">
          <h2 className="text-2xl font-bold text-center my-10">
            No feed found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Feed;
