"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      const expirationTime = Date.now() + 3600000; // 1 giờ = 3600000ms

      // Lưu token và thời gian hết hạn vào localStorage
      localStorage.setItem("miniapptokenzzne", expirationTime.toString());

      router.push("/"); // Quay về trang chủ sau khi đăng nhập thành công
    } else {
      setErrorMessage("Sai username hoặc password!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Đăng Nhập</h1>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Đăng Nhập
        </button>
      </div>
    </div>
  );
}
