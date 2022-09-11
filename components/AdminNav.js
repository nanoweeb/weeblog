import Link from "next/link";
import { MdSpaceDashboard, MdAnalytics } from "react-icons/md";

export default function AdminNav() {
  return (
    <div className="w-[20rem] h-full fixed left-0 top-0 overflow-scroll bg-gray-900 p-5">
      <h1 className="text-xl font-semibold text-gray-200">
        <span>Weeblog </span>
      </h1>
      <nav className="text-gray-100 space-y-3 mt-20">
        <Link href="/admin/dashboard">
          <a className="flex items-center text-lg gap-5 py-2 px-2 rounded-md hover:bg-indigo-600 duration-200">
            <MdSpaceDashboard /> Dashboard
          </a>
        </Link>
        <Link href="/admin/analytics">
          <a className="flex items-center text-lg gap-5 py-2 px-2 rounded-md hover:bg-indigo-600 duration-200">
            <MdAnalytics /> Analytics
          </a>
        </Link>
      </nav>
    </div>
  );
}
