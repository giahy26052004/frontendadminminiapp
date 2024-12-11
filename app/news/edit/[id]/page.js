"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditNews = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newsData, setNewsData] = useState(null); // New state to hold news data
  const [file, setFile] = useState(null); // State to handle new file upload

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) return;

      const res = await fetch(
        `https://backendminiapp.onrender.com/api/news/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setNewsData(data); // Store the news data
      } else {
        console.error("Failed to fetch News details");
      }
    };

    fetchNews();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send the file along with other form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", new Date());
    if (file) {
      formData.append("file", file); // Append new file if available
    }

    const res = await fetch(
      `https://backendminiapp.onrender.com/api/news/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (res.ok) {
      router.push("/news");
    } else {
      console.error("Failed to update News");
    }
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">
        Chỉnh sửa tin tức
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
        Quay lại
      </a>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data" // Important for file uploads
      >
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề tin tức"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung tin tức"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {newsData && newsData.file && (
          <div className="mb-10 w-[200px] h-[200px]">
            <strong>Hình ảnh:</strong>
            <img
              src={`https://backendminiapp.onrender.com/${newsData.file}`} // Correct URL for the image
              alt={newsData.title}
              className="w-full h-auto rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="file-upload" className="block mb-2">
            Thay đổi ảnh mới (ảnh cũ):
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Thay đổi tin tức
        </button>
      </form>
    </div>
  );
};

export default EditNews;
