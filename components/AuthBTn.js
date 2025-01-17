import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthBtn = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("miniapptokenzzne");
    if (!token) {
      router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token
    } else {
      setIsLogin(true); // Set isLogin true nếu có token
    }
  }, [router, isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("miniapptokenzzne"); // Xóa token khỏi localStorage
    router.push("/login"); // Chuyển hướng về trang login sau khi đăng xuất
  };

  return (
    <>
      {isLogin ? (
        <div className="text-center fixed top-0 right-10">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Đăng Xuất
          </button>
        </div>
      ) : (
        <></> // Không hiển thị gì khi chưa đăng nhập
      )}
    </>
  );
};

export default AuthBtn;
