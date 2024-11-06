"use client";

import { useState } from "react";

const New = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backendminiapp.onrender.com/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, title, date: new Date() }),
      });
      alert("ok");
      window.location.href = "/news";
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Add News</h1>
      <a className="border p-3 rounded hover:bg-gray-200 " href="/">
          Back
        </a>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="News Name"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="News content"
            required
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
