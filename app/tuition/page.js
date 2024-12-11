"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const TuitionEditor = dynamic(() => import("../../components/TuitionEditor"), {
  ssr: false,
});
const Tuition = () => {
  const [tuitionData, setTuitionData] = useState(null); // State to store tuition data
  const [isSaving, setIsSaving] = useState(false); // State to manage saving status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch tuition data from the server
  useEffect(() => {
    const fetchTuitionData = async () => {
      try {
        const res = await fetch(
          `https://backendminiapp.onrender.com/api/tuition`
        );
        if (!res.ok) {
          throw new Error("Không thể tải dữ liệu.");
        }
        const data = await res.json();

        // If data exists, take the first object
        if (data && data.length > 0) {
          setTuitionData(data[0]); // Save tuition data
        } else {
          setTuitionData({ tuitionData: "", _id: "" }); // If no data, create an empty object
        }
      } catch (error) {
        setError(error.message); // If an error occurs, set error state
      }
    };
    fetchTuitionData();
  }, []);

  if (!tuitionData && !error) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  // Save tuition data (only PUT requests)
  const handleSave = async () => {
    if (!tuitionData._id) {
      setError("Dữ liệu học phí không hợp lệ."); // Handle case if there's no _id
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(
        `https://backendminiapp.onrender.com/api/tuition/${tuitionData._id}`,
        {
          method: "PUT", // Only PUT method, no POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tuitionData), // Send updated tuition data
        }
      );

      if (!res.ok) {
        throw new Error("Đã xảy ra lỗi khi lưu dữ liệu.");
      }

      alert("Thông tin học phí đã được cập nhật!");
    } catch (error) {
      setError(error.message); // Handle error during saving
      alert("Lỗi khi lưu thông tin. Vui lòng thử lại!");
    } finally {
      setIsSaving(false); // Finish saving operation
    }
  };

  // Update tuition data when CKEditor changes
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setTuitionData((prevData) => ({
      ...prevData,
      tuitionData: data, // Update tuitionData with CKEditor data
    }));
  };

  return (
    <div className="p-8">
      <Link className="border p-3 rounded hover:bg-gray-200 mr-7 ml-8" href="/">
        Back
      </Link>{" "}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Học phí và Chính sách
      </h1>
      <div className="mt-4">
        {tuitionData && (
          <TuitionEditor
            data={tuitionData.tuitionData} // Pass tuition data to CKEditor
            onChange={handleEditorChange}
          />
        )}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          disabled={isSaving} // Disable button while saving
        >
          {isSaving ? "Đang lưu..." : "Lưu Thay Đổi"}
        </button>
      </div>
    </div>
  );
};

export default Tuition;
