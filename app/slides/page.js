"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Slides = () => {
  const [slidesList, setSlidesList] = useState([]);
  const router = useRouter();

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchSlides = async () => {
      const res = await fetch(`https://miniapp.hitc.edu.vn/api/slide`);
      const data = await res.json();
      setSlidesList(data);
    };
    fetchSlides();
  }, []);

  // Handle delete slide item
  const handleDelete = async (id) => {
    const res = await fetch(`https://miniapp.hitc.edu.vn/api/slide/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setSlidesList((prevSlides) =>
        prevSlides.filter((slide) => slide._id !== id)
      );
      alert("Xóa slide thành công");
      router.push("/slides");
    } else {
      alert("Không thể xóa slide");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">
        Quản lý Slide
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 mr-7" href="/">
        Quay lại
      </a>
      <Link
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
        href="/slides/new"
      >
        Thêm mới Slide
      </Link>
      <div className="flex flex-wrap gap-4">
        {slidesList.map((slide) => (
          <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-1 min-w-[200px]"
            key={slide._id}
          >
            <div className="bg-slate-300 p-4 rounded">
              <Link href={`/slides/${slide._id}`} className="block mb-2">
                <strong>Tiêu đề :</strong> {slide.title}
              </Link>
              <Link href={`/slides/${slide._id}`} className="block mb-2">
                <strong>Mô tả :</strong> {slide.description}
              </Link>
              {/* Hiển thị hình ảnh nếu có */}
              {slide.image && (
                <div className="mb-2 w-[200px] h-[200px]">
                  <strong>Image:</strong>
                  <img
                    src={`https://miniapp.hitc.edu.vn/api/news/image/${slide.image}`} // Đảm bảo rằng bạn trả về đúng URL hình ảnh
                    alt={slide.title}
                    className="w-[140px] h-[120px] h-auto rounded"
                  />
                </div>
              )}
              <Link href={`/slides/${slide._id}`} className="block mb-2">
                <strong>Date:</strong>{" "}
                {new Date(slide.createdAt).toLocaleString()}
              </Link>

              <Link href={`/slides/edit/${slide._id}`} className="mr-2">
                <button className="bg-yellow-500 text-white py-1 px-2 rounded">
                  Sửa
                </button>
              </Link>
              <button
                onClick={() => handleDelete(slide._id)}
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

export default Slides;
