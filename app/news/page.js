"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const router = useRouter();

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      // Nếu bạn có cấu hình API_URL trong .env, sử dụng nó thay vì hard-code URL
      const res = await fetch(
        `${process.env.API_URL || "https://miniapp.hitc.edu.vn"}/api/news`
      );
      const data = await res.json();
      setNewsList(data);
    };
    fetchNews();
  }, []);

  // Handle delete news item
  const handleDelete = async (id) => {
    const res = await fetch(
      `${process.env.API_URL || "https://miniapp.hitc.edu.vn"}/api/news/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      setNewsList((prevNews) => prevNews.filter((news) => news._id !== id));
      alert("Deleted successfully");
      router.push("/news");
    } else {
      alert("Failed to delete news");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">Tin tức</h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
        Quay lại
      </a>
      <Link
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
        href="/news/new"
      >
        Thêm mới tin tức
      </Link>
      <div className="flex flex-wrap gap-4">
        {newsList.map((news) => (
          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 min-w-[200px]"
            key={news._id}
          >
            <div className="bg-slate-300 p-4 rounded">
              <Link href={`/news/${news._id}`} className="block mb-2">
                <strong>Tiêu đề :</strong> {news.title}
              </Link>
              <Link href={`/news/${news._id}`} className="block mb-2">
                <strong>Nội dung :</strong> {news.content}
              </Link>
              {/* Hiển thị hình ảnh nếu có */}
              {news.file && (
                <div className="mb-2 w-[200px] h-[200px]">
                  <strong>Image:</strong>
                  <img
                    src={`https://miniapp.hitc.edu.vn/${news.file}`} // Đảm bảo rằng bạn trả về đúng URL hình ảnh
                    alt={news.title}
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
              <Link href={`/news/${news._id}`} className="block mb-2">
                <strong>Date:</strong> {new Date(news.date).toLocaleString()}
              </Link>

              <Link href={`/news/edit/${news._id}`} className="mr-2">
                <button className="bg-yellow-500 text-white py-1 px-2 rounded">
                  Sửa
                </button>
              </Link>
              <button
                onClick={() => handleDelete(news._id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
