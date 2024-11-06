"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Majors = () => {
  const [majors, setMajors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await fetch(
          "https://backendminiapp.onrender.com/api/majors"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch majors");
        }
        const data = await res.json();
        setMajors(data);
      } catch (error) {
        console.error(error);
        alert("Error fetching majors");
      }
    };
    fetchMajors();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this major?"
    );
    if (confirmed) {
      try {
        const res = await fetch(
          `https://backendminiapp.onrender.com/api/majors/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          setMajors(majors.filter((major) => major._id !== id));
        } else {
          throw new Error("Failed to delete major");
        }
      } catch (error) {
        console.error(error);
        alert("Error deleting major");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Majors</h1>
      <div className="mb-8 flex space-x-4">
  <Link href="/" className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 transition">Back     </Link>
  <Link href="/majors/new" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"> Add Major</Link>
</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {majors.map((major) => (
          <div key={major._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{major.ten_nganh}</h2>
            <p className="text-gray-600"><strong>Khối ngành:</strong> {major.khoi_nganh}</p>
            <p className="text-gray-600"><strong>Kiến trúc:</strong> {major.details_nganh.kien_truc}</p>
            <p className="text-gray-600"><strong>Mục tiêu:</strong> {major.details_nganh.muc_tieu}</p>
            <p className="text-gray-600"><strong>Cơ hội nghề nghiệp:</strong> {major.details_nganh.co_hoi_nghe_nghiep}</p>
            <p className="text-gray-600"><strong>Điều kiện tuyển sinh:</strong> {major.details_nganh.dieu_kien_tuyen_sinh}</p>
            <p className="text-gray-600"><strong>Môn học tiêu biểu:</strong> {major.details_nganh.mon_hoc_tieu_bieu.join(", ")}</p>
            <p className="text-gray-600"><strong>Bằng cấp:</strong> {major.details_nganh.bang_cap}</p>
            <div className="mt-4 flex justify-between">
              <Link href={`/majors/edit/${major._id}`}>
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition">Edit</button>
              </Link>
              <button onClick={() => handleDelete(major._id)} className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Majors;
