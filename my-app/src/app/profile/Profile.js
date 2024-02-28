"use client";

import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Profile() {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const accessToken = getCookie("accessToken");
    const response = await fetch("http://localhost:8080/api/v1/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    const { data } = await response.json();
    const { dataValues } = await data;
    if (data) {
      setUser(dataValues);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="mx-10 p-10">
      {console.log(user)}

      <h1>Profile</h1>
      <h2>Name: {user?.fullname}</h2>
      <h2>Email: {user?.email}</h2>
      <h2>
        Trạng thái: {user?.status === true ? "Đã kích hoạt" : "Chưa kích hoạt"}
      </h2>
    </div>
  );
}
