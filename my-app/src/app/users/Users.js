"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Fragment } from "react";

const Users = function () {
  const [users, setUsers] = useState({});
  const getUsers = async () => {
    const accessToken = getCookie("accessToken");
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    const { data } = await response.json();
    if (data) {
      setUsers(data);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Fragment>
      <table className="table rounded-md border w-full shadow-lg bg-white text-xl border-separate">
        <tr>
          <td className="bg-blue-100 border text-left px-4 py-2">ID</td>
          <td className="bg-blue-100 border text-left px-4 py-2">Name</td>
          <td className="bg-blue-100 border text-left px-4 py-2">Email</td>
          <td className="bg-blue-100 border text-left px-4 py-2">Action</td>
        </tr>
        {users.length > 0
          ? users &&
            users.map((user, index) => {
              return (
                <tr key={index} className="rounded-md border">
                  <th className="border text-left px-4 py-2">{index + 1}</th>
                  <th className="border text-left px-4 py-2">
                    {user.fullname}
                  </th>
                  <th className="border text-left px-4 py-2">{user.email}</th>
                  <th className="border text-left px-4 py-2">
                    <button className="mr-3">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button>
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </th>
                </tr>
              );
            })
          : ""}
      </table>
    </Fragment>
  );
};

export default Users;
