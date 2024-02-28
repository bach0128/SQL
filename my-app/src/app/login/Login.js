"use client";
import Link from "next/link";

export default function Login() {
  const getUrlGoogle = async () => {
    const urlRedirect = await fetch("http://localhost:8080/api/login/google");
    const url = await urlRedirect.json();
    if (urlRedirect) {
      return (window.location.href = url.result.urlRedirect);
    }
  };

  const getUrlGithub = async () => {
    const urlRedirect = await fetch("http://localhost:8080/api/login/github");
    const url = await urlRedirect.json();
    if (urlRedirect) {
      return (window.location.href = url.result.urlRedirect);
    }
  };
  return (
    <div className="container mt-3">
      <div className="w-100 flex-col flex justify-center items-center">
        <h1>Đăng nhập bằng mạng xã hội</h1>
        {/* <Link
          href=""
          className=" bg-orange-600 cursor-pointer border rounded p-2 mx-4 mb-2 hover:bg-orange-500 min-w-96 text-center"
        >
          Đăng nhập với Auth0
        </Link> */}
        <button
          onClick={getUrlGithub}
          className=" bg-orange-600 cursor-pointer border rounded p-2 mx-4 mb-2 hover:bg-orange-500 min-w-96 text-center"
        >
          Đăng nhập với Github
        </button>
        <button
          onClick={getUrlGoogle}
          className=" bg-orange-600 cursor-pointer border rounded p-2 mx-4 mb-2 hover:bg-orange-500 min-w-96 text-center"
        >
          Đăng nhập với Google
        </button>
        {/* <Link
          href=""
          className=" bg-orange-600 cursor-pointer border rounded p-2 mx-4 mb-2 hover:bg-orange-500 min-w-96 text-center"
        >
          Đăng nhập với Email và mật khẩu
        </Link> */}
      </div>
    </div>
  );
}
