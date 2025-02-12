"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddMajor = () => {
  const [khoiNganh, setKhoiNganh] = useState("");
  const [newKhoiNganh, setNewKhoiNganh] = useState(""); // Track the new khoi nganh input
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
  const [options, setOptions] = useState([]); // Store the options fetched from the API

  useEffect(() => {
    const fetchKhoiNganhData = async () => {
      try {
        const response = await fetch("https://miniapp.hitc.edu.vn/api/majors"); // Replace with your API URL
        const data = await response.json();
        setOptions(data); // Assuming the API returns an array of options
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKhoiNganhData();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`https://miniapp.hitc.edu.vn/api/majors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          khoi_nganh: khoiNganh === "new" ? newKhoiNganh : khoiNganh, // Use newKhoiNganh if selected "new"
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
      <h1 className="text-2xl font-bold mb-6 flex justify-center">
        Thêm ngành học
      </h1>
      <a className="border p-3 rounded hover:bg-gray-200 " href="/">
        Quay lại
      </a>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="khoiNganh"
            className="block text-sm font-semibold mb-2"
          >
            Chọn khối ngành hoặc thêm khối ngành mới
          </label>
          <select
            id="khoiNganh"
            value={khoiNganh}
            onChange={(e) => {
              setKhoiNganh(e.target.value);
              if (e.target.value !== "new") {
                setNewKhoiNganh(""); // Clear the input when selecting an option
              }
            }}
            required
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="" disabled>
              Chọn khối ngành
            </option>
            {options
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex((t) => t.khoi_nganh === value.khoi_nganh)
              ) // Filter unique options based on "khoi_nganh"
              .map((option) => (
                <option key={option._id || option.value} value={option.value}>
                  {option.khoi_nganh}
                </option>
              ))}
            <option value="new">Thêm khối ngành mới</option>
          </select>
        </div>

        {/* Conditionally render input if "new" is selected */}
        {khoiNganh === "new" && (
          <div className="mb-4">
            <label
              htmlFor="newKhoiNganh"
              className="block text-sm font-semibold mb-2"
            >
              Nhập khối ngành mới
            </label>
            <input
              id="newKhoiNganh"
              type="text"
              value={newKhoiNganh}
              onChange={(e) => setNewKhoiNganh(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Nhập khối ngành mới"
            />
          </div>
        )}

        {/* Other input fields */}
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
            onChange={(e) =>
              setDetails({ ...details, muc_tieu: e.target.value })
            }
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
            onChange={(e) =>
              setDetails({ ...details, bang_cap: e.target.value })
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
          Thêm ngành học
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Thêm thành công</p>}
    </div>
  );
};

export default AddMajor;
