import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feed-slice";
import UserCard from "./user-card";

const Feed = () => {
  const feed = useSelector((store) => store?.feed);
  const dispatch = useDispatch();

  const getFeeds = async () => {
    try {
      if (feed?.length > 0) return;
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log("Response", response?.data?.data);
      dispatch(addFeed(response?.data?.data));
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);
console.log("Feed", feed);
  return (
    <div className="flex flex-wrap justify-center my-10 gap-10">
      {feed?.map((item) => (
        <UserCard
          key={item?.id}
          user={item}
        />
      ))}
    </div>
  );
};

export default Feed;
