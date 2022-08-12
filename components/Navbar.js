import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";
import { MdWbSunny } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  function handlerDark() {
    setIsDark(!isDark);
  }

  function handlerToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="py-4 w-full border-b-2 px-5 bg-[#0F172A] border-gray-500 ">
      <nav className="flex items-start justify-between ">
        <button
          onClick={handlerToggle}
          className="text-2xl text-white translate-y-2"
        >
          {isOpen ? <MdOutlineClose /> : <HiMenuAlt4 />}
        </button>
        {isOpen && (
          <div className="h-screen w-full text-gray-200 absolute top-14 left-0 px-5 py-10 bg-[#0F172A]">
            <motion.div
              animate={{ y: -100 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <div className="flex flex-col gap-5 absolute top-20 text-xl`">
                <Link href="/posts">
                  <a className="border-b-2 py-1 border-gray-500">Posts</a>
                </Link>
                <Link href="/">
                  <a className="border-b-2 py-1 border-gray-500">Dashboard</a>
                </Link>
                <Link href="/">
                  <a className="border-b-2 py-1 border-gray-500">Profile</a>
                </Link>
              </div>
            </motion.div>
          </div>
        )}

        <button
          onClick={handlerDark}
          className=" border-[3px] border-gray-500 p-2 rounded-xl"
        >
          {isDark ? <MdNightlightRound /> : <MdWbSunny />}
        </button>
      </nav>
    </div>
  );
}
