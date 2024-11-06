"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditNews = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
      } else {
        console.error("Failed to fetch News details");
      }
    };

    fetchNews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://backendminiapp.onrender.com/api/news/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, date: new Date() }),
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
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Edit News</h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
          Back
        </a>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="News title"
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
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditNews;
