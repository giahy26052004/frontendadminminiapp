"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddSlide = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    if (file) {
      formData.append("image", file); // Append the new file if available
    }

    const res = await fetch(`https://miniapp.hitc.edu.vn//api/slide`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Slide đã được thêm");
      router.push("/slides"); // Redirect to the slides page after creation
    } else {
      alert("Lỗi khi thêm slide");
    }
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex justify-center">
        Thêm Slide
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/slides">
        Quay lại
      </a>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
        encType="multipart/form-data" // Important for file uploads
      >
        <div className="mb-4">
          <label className="block mb-2" htmlFor="title">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề Slide"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">
            Mô tả
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả Slide"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="link">
            Liên kết
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link Slide"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="file-upload" className="block mb-2">
            Tải lên ảnh:
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
          Thêm Slide
        </button>
      </form>
    </div>
  );
};

export default AddSlide;
