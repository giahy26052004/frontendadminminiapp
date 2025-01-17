"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/app/login/page";
import AuthBTn from "./AuthBTn";

export default function AuthWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("miniapptokenzzne");
    if (!token) {
      router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token
    }
  }, [router]);

  console.log(children);
  return (
    <div>
      <div>{children}</div>
      <AuthBTn />
    </div>
  ); // Hiển thị nội dung con nếu có token
}
