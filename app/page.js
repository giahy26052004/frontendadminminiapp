import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  console.log("process.env.API_URL", process.env.API_URL);
  return (
    <div>
      {" "}
      <Navbar />{" "}
    </div>
  );
}
