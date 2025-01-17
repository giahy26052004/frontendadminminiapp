"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token
    }
  }, [router]);
}
