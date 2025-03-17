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
        setPhones((prevPhones) => prevPhones.filter((phone) => phone._id !== id));
        alert("Xóa thành công");
      } else {
        alert("Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(phones.map((phone, index) => ({
      "STT": index + 1,
      "Số Điện Thoại": phone.phone,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");
    XLSX.writeFile(workbook, "danh-sach-so-dien-thoai.xlsx");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📱 Danh sách số điện thoại
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
        Quay lại
      </a>
      <button
        onClick={exportToExcel}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        Xuất Excel
      </button>

      {phones.length > 0 ? (
        <ul className="list-disc pl-5">
          {phones.map((phone) => (
            <li
              key={phone._id}
              className="mb-2 flex justify-between items-center border-b pb-2"
            >
              <span className="text-lg">{phone.phone}</span>
              <button
                onClick={() => handleDelete(phone._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Không có số điện thoại nào.</p>
      )}
    </div>
  );
};

export default PhoneList;
