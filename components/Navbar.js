import Link from "next/link";
import { FaGraduationCap, FaNewspaper, FaMoneyBill } from "react-icons/fa";


const Navbar = () => {
  return (
    <nav className="bg-gray-800 w-64 h-screen p-6 shadow-lg flex flex-col ">
    <h2 className="text-white text-2xl font-bold mb-8">QUẢN TRỊ</h2>
    <ul className="space-y-4">
      <li>
        <Link href="/majors">
          <span className="flex items-center text-white bg-pink-500 hover:bg-pink-600 px-4 py-3 rounded-lg text-lg font-medium transition duration-300">
            <FaGraduationCap className="mr-3" /> Quản lý ngành học
          </span>
        </Link>
      </li>
      <li>
        <Link href="/news">
          <span className="flex items-center text-white bg-pink-500 hover:bg-pink-600 px-4 py-3 rounded-lg text-lg font-medium transition duration-300">
            <FaNewspaper className="mr-3" /> Quản lý tin tức
          </span>
        </Link>
      </li>
      <li>
        <Link href="/tuition">
          <span className="flex items-center text-white bg-pink-500 hover:bg-pink-600 px-4 py-3 rounded-lg text-lg font-medium transition duration-300">
            <FaMoneyBill className="mr-3" /> Quản lý học phí
          </span>
        </Link>
      </li>
    </ul>
  </nav>
  );
};

export default Navbar;
