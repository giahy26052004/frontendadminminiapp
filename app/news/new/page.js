"use client";

import { useState } from "react";

const New = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // Để lưu trữ file

  // Xử lý thay đổi file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Lưu file chọn được
  };
  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo đối tượng FormData để gửi dữ liệu và file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", new Date());

    if (file) {
      formData.append("file", file); // Thêm file vào FormData
    }

    try {
      const res = await fetch("https://backendminiapp.onrender.com/api/news", {
        method: "POST",
        body: formData, // Gửi dữ liệu dưới dạng form-data
      });

      if (res.ok) {
        alert("News added successfully!");
        window.location.href = "/news"; // Chuyển hướng nếu thành công
      } else {
        alert("Error adding news");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Add News</h1>
      <a className="border p-3 rounded hover:bg-gray-200 " href="/">
        Back
      </a>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data" // Cần thêm thuộc tính này
      >
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="News Title"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="News Content"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange} // Xử lý thay đổi file
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Add News
        </button>
      </form>
    </div>
  );
};

export default New;
