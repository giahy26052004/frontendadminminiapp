"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddMajor = () => {
  const [khoiNganh, setKhoiNganh] = useState("");
  const [tenNganh, setTenNganh] = useState("");
  const [details, setDetails] = useState({
    kien_truc: "",
    muc_tieu: "",
    co_hoi_nghe_nghiep: "",
    dieu_kien_tuyen_sinh: "",
    mon_hoc_tieu_bieu: [],
    bang_cap: "",
  });
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`https://backendminiapp.onrender.com/api/majors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          khoi_nganh: khoiNganh,
          ten_nganh: tenNganh,
          details_nganh: details,
        }),
      });

      if (res.ok) {
        setKhoiNganh("");
        setTenNganh("");
        setDetails({
          kien_truc: "",
          muc_tieu: "",
          co_hoi_nghe_nghiep: "",
          dieu_kien_tuyen_sinh: "",
          mon_hoc_tieu_bieu: [],
          bang_cap: "",
        });
        setSuccess(true);
        router.push("/majors");
      } else {
        const errorData = await res.json();
        console.error("Error:", errorData);
        setError("Failed to add major. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      
      <h1 className="text-2xl font-bold mb-6 flex justify-center">Add Major</h1>
      <a className="border p-3 rounded hover:bg-gray-200 " href="/">
          Back
        </a>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            value={khoiNganh}
            onChange={(e) => setKhoiNganh(e.target.value)}
            placeholder="Khối ngành"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={tenNganh}
            onChange={(e) => setTenNganh(e.target.value)}
            placeholder="Tên ngành"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details.kien_truc}
            onChange={(e) =>
              setDetails({ ...details, kien_truc: e.target.value })
            }
            placeholder="Kiến trúc"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details.muc_tieu}
            onChange={(e) => setDetails({ ...details, muc_tieu: e.target.value })}
            placeholder="Mục tiêu"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details.co_hoi_nghe_nghiep}
            onChange={(e) =>
              setDetails({ ...details, co_hoi_nghe_nghiep: e.target.value })
            }
            placeholder="Cơ hội nghề nghiệp"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={details.dieu_kien_tuyen_sinh}
            onChange={(e) =>
              setDetails({ ...details, dieu_kien_tuyen_sinh: e.target.value })
            }
            placeholder="Điều kiện tuyển sinh"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={details.mon_hoc_tieu_bieu.join(", ")}
            onChange={(e) =>
              setDetails({
                ...details,
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
            value={details.bang_cap}
            onChange={(e) => setDetails({ ...details, bang_cap: e.target.value })}
            placeholder="Bằng cấp"
            required
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Major
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Major added successfully!</p>}
    </div>
  );
};

export default AddMajor;
