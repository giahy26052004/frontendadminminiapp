"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("https://backendminiapp.onrender.com/api/news");
      const data = await res.json();
      setNewsList(data);
    };
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`https://backendminiapp.onrender.com/api/news/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setNewsList((prevNews) => prevNews.filter((news) => news._id !== id));
      alert("Deleted successfully");
      router.push("/news");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">
        News{" "}
     
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
          Back
        </a>
      <Link className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block" href="/news/new">
        Add News
      </Link>
      <div className="flex flex-wrap gap-4">
        {newsList.map((news) => (
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 min-w-[200px]" key={news._id}>
            <div className="bg-slate-300 p-4 rounded">
              <Link href={`/news/${news._id}`} className="block mb-2">
                <strong>Title:</strong> {news.title}
              </Link>
              <Link href={`/news/${news._id}`} className="block mb-2">
                <strong>Content:</strong> {news.content}
              </Link>
              <Link href={`/news/${news._id}`} className="block mb-2">
                <strong>Date:</strong> {news.date}
              </Link>

              <Link href={`/news/edit/${news._id}`} className="mr-2">
                <button className="bg-yellow-500 text-white py-1 px-2 rounded">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(news._id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
