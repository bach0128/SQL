"use client";
import React, { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import Link from "next/link.js";
import { data } from "autoprefixer";

export default function Auth({ searchParams }) {
  const urlQuery = new URLSearchParams(searchParams).toString();
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const getToken = async (query) => {
      console.log(query);
      const responseGoogle = await fetch(
        "http://localhost:8080/api/auth/login/google?" + query
      );
      const responseGithub = await fetch(
        "http://localhost:8080/api/auth/login/github?" + query
      );
      let dataUser;
      if (responseGoogle.ok) {
        const { data } = await responseGoogle.json();
        dataUser = data;
        console.log(dataUser);
      } else if (responseGithub.ok) {
        const { data } = await responseGithub.json();
        dataUser = data;
        console.log(dataUser);
      }
      // if (user) {
      //   setUserAuth(user);
      // }
      if (dataUser) {
        setCookie("accessToken", dataUser.accessToken);
        setCookie("refreshToken", dataUser.refreshToken);
      }
    };
    getToken(urlQuery);
  }, []);

  return (
    <div className="container">
      <div className="row flex flex-col mt-5 p-10">
        <h1 className="mb-4 text-bold text-3xl">Welcome to summoner's rift</h1>
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
