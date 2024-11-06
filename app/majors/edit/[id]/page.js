"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditMajor = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [khoi_nganh, setKhoiNganh] = useState("");
  const [ten_nganh, setTenNganh] = useState("");
  const [details_nganh, setDetailsNganh] = useState({
    kien_truc: "",
    muc_tieu: "",
    co_hoi_nghe_nghiep: "",
    dieu_kien_tuyen_sinh: "",
    mon_hoc_tieu_bieu: [],
    bang_cap: "",
  });

  useEffect(() => {
    const fetchMajor = async () => {
      if (!id) return;

      const res = await fetch(
        `https://backendminiapp.onrender.com/api/majors/${id}`,
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setKhoiNganh(data.khoi_nganh);
        setTenNganh(data.ten_nganh);
        setDetailsNganh(data.details_nganh);
      } else {
        console.error("Failed to fetch major details");
      }
    };

    fetchMajor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://backendminiapp.onrender.com/api/majors/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ khoi_nganh, ten_nganh, details_nganh }),
      }
    );

    if (res.ok) {
      router.push("/majors");
    } else {
      console.error("Failed to update major");
    }
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto">

      <h1 className="text-2xl font-bold mb-6 flex justify-center">Edit Major</h1>
      <a className="border p-3 rounded hover:bg-gray-200 " href="/">
          Back
        </a>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            value={khoi_nganh}
            onChange={(e) => setKhoiNganh(e.target.value)}
            placeholder="Khối ngành"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={ten_nganh}
            onChange={(e) => setTenNganh(e.target.value)}
            placeholder="Tên ngành"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details_nganh.kien_truc}
            onChange={(e) =>
              setDetailsNganh({ ...details_nganh, kien_truc: e.target.value })
            }
            placeholder="Kiến trúc"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details_nganh.muc_tieu}
            onChange={(e) =>
              setDetailsNganh({ ...details_nganh, muc_tieu: e.target.value })
            }
            placeholder="Mục tiêu"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details_nganh.co_hoi_nghe_nghiep}
            onChange={(e) =>
              setDetailsNganh({
                ...details_nganh,
                co_hoi_nghe_nghiep: e.target.value,
              })
            }
            placeholder="Cơ hội nghề nghiệp"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details_nganh.dieu_kien_tuyen_sinh}
            onChange={(e) =>
              setDetailsNganh({
                ...details_nganh,
                dieu_kien_tuyen_sinh: e.target.value,
              })
            }
            placeholder="Điều kiện tuyển sinh"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={details_nganh.mon_hoc_tieu_bieu.join(", ")}
            onChange={(e) =>
              setDetailsNganh({
                ...details_nganh,
                mon_hoc_tieu_bieu: e.target.value.split(", "),
              })
            }
            placeholder="Môn học tiêu biểu (ngăn cách bằng dấu phẩy)"
            required
            className="border border-gray-300 rounded p-2 w-full"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details_nganh.bang_cap}
            onChange={(e) =>
              setDetailsNganh({ ...details_nganh, bang_cap: e.target.value })
            }
            placeholder="Bằng cấp"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Update Major
        </button>
      </form>
    </div>
  );
};

export default EditMajor;
