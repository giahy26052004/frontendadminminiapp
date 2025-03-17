"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const PhoneList = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const res = await fetch("https://miniapp.hitc.edu.vn/api/phones");
        const data = await res.json();
        setPhones(data.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };
    fetchPhones();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa số này không?")) return;

    try {
      const res = await fetch(`https://miniapp.hitc.edu.vn/api/phones/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPhones((prevPhones) =>
          prevPhones.filter((phone) => phone._id !== id)
        );
        alert("Xóa thành công");
      } else {
        alert("Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Bạn có chắc muốn xóa tất cả số điện thoại không?")) return;

    for (const phone of phones) {
      try {
        const res = await fetch(
          `https://miniapp.hitc.edu.vn/api/phones/${phone._id}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) {
          alert(`Xóa thất bại: ${phone.phone}`);
          return;
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
    setPhones([]);
    alert("Đã xóa tất cả số điện thoại");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      phones.map((phone, index) => ({
        STT: index + 1,
        "Số Điện Thoại": phone.phone,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");
    XLSX.writeFile(workbook, "danh-sach-so-dien-thoai.xlsx");
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold text-center">
        📱 Danh sách số điện thoại
      </h1>
      <a className="p-3 border rounded hover:bg-gray-200 mr-7" href="/">
        Quay lại
      </a>
      <button
        onClick={exportToExcel}
        className="px-4 py-2 mb-4 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Xuất Excel
      </button>
      <button
        onClick={handleDeleteAll}
        className="px-4 py-2 mb-4 ml-4 text-white bg-red-700 rounded hover:bg-red-800"
      >
        Xóa Tất Cả
      </button>

      {phones.length > 0 ? (
        <ul className="pl-5 list-disc">
          {phones.map((phone) => (
            <li
              key={phone._id}
              className="flex items-center justify-between pb-2 mb-2 border-b"
            >
              <span className="text-lg">{phone.phone}</span>
              <button
                onClick={() => handleDelete(phone._id)}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Không có số điện thoại nào.</p>
      )}
    </div>
  );
};

export default PhoneList;
