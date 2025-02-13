"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const GiftList = () => {
  const [gifts, setGifts] = useState([]); // Luôn đảm bảo gifts là mảng
  const [newGift, setNewGift] = useState("");

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await fetch("https://miniapp.hitc.edu.vn/api/gifts");
        const gifts = await res.json();

        if (Array.isArray(gifts)) {
          // Kiểm tra nếu trả về mảng quà tặng
          setGifts(gifts); // Cập nhật danh sách quà tặng
        } else {
          console.error("Dữ liệu API không hợp lệ:", gifts);
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchGifts();
  }, []);

  // Thêm quà tặng mới
  const handleAddGift = async () => {
    if (!newGift.trim()) return alert("Tên quà không được để trống!");

    try {
      const res = await fetch("https://miniapp.hitc.edu.vn/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newGift }),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm quà!");

      const data = await res.json();
      if (!data || !data._id) throw new Error("Dữ liệu trả về không hợp lệ!");

      setGifts((prevGifts) => [...prevGifts, data]); // Cập nhật danh sách
      setNewGift("");
      alert("Thêm quà thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm quà:", error);
      alert("Thêm quà thất bại!");
    }
  };

  // Xóa quà tặng
  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa quà này không?")) return;

    try {
      const res = await fetch(`https://miniapp.hitc.edu.vn/api/gifts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Lỗi khi xóa quà!");

      setGifts((prevGifts) => prevGifts.filter((gift) => gift._id !== id));
      alert("Xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Xóa thất bại!");
    }
  };

  // Xuất PDF danh sách quà
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Danh sách quà tặng", 10, 10);

    gifts.forEach((gift, index) => {
      doc.text(`${index + 1}. ${gift.name}`, 10, 20 + index * 10);
    });

    doc.save("danh-sach-qua-tang.pdf");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎁 Danh sách Quà Tặng
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
        Quay lại
      </a>

      {/* Form thêm quà */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Nhập tên quà..."
          value={newGift}
          onChange={(e) => setNewGift(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddGift}
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded hover:bg-green-600"
        >
          Thêm quà
        </button>
      </div>

      <button
        onClick={exportToPDF}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Xuất PDF
      </button>

      {gifts.length > 0 ? (
        <ul className="list-disc pl-5">
          {gifts.map((gift) => (
            <li
              key={gift._id}
              className="mb-2 flex justify-between items-center border-b pb-2"
            >
              <span className="text-lg">{gift.name}</span>
              <button
                onClick={() => handleDelete(gift._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Không có quà nào.</p>
      )}
    </div>
  );
};

export default GiftList;
