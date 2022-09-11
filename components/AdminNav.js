import Link from "next/link";
import { MdSpaceDashboard } from "react-icons/md";

export default function AdminNav() {
  return (
    <div className="w-[20rem] h-full fixed left-0 top-0 overflow-scroll bg-gray-900 p-5">
      <h1 className="text-xl font-semibold text-gray-200">
        <span>Weeblog </span>
      </h1>
      <nav>
        <Link href="/admin/dashboard">
          <a className="flex items-center">
            <MdSpaceDashboard /> Dashboard
          </a>
        </Link>
      </nav>
    </div>
  );
}
