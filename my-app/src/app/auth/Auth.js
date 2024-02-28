"use client";
import React, { useEffect, useState } from "react";
import api from "../config/api.js";
import { setCookie } from "cookies-next";
import Link from "next/link.js";

export default function Auth({ searchParams }) {
  const urlQuery = new URLSearchParams(searchParams).toString();
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const getToken = async (query) => {
      const response = await fetch(
        "http://localhost:8080/api/auth/login?" + query
      );
      const { data } = await response.json();
      const { accessToken, refreshToken, user } = data;
      if (user) {
        setUserAuth(user);
      }
      console.log(user);
      if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken, { maxAge: 1 * 60 * 60 });
        setCookie("refreshToken", refreshToken, { maxAge: 24 * 60 * 60 });
      }
    };

    getToken(urlQuery);
  }, [urlQuery]);

  return (
    <div className="container">
      <div className="row flex flex-col mt-5 p-10">
        <h1 className="mb-4">Xin chào {userAuth.fullname}</h1>
        <div className="col-4">
          <Link
            className="button bg-orange-300 text-neutral-800 p-2 mr-4"
            href={"/users"}
          >
            Danh sách người dùng
          </Link>
          <Link
            className="button bg-orange-300 text-neutral-800 p-2"
            href={"/profile"}
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
