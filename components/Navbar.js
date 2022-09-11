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
    <div className="w-full flex justify-between md:justify-end gap-5 z-50 fixed py-4 border-b-2 px-5 bg-[#0F172A] border-gray-500">
      {/* desktop navbar */}
      <div className="flex w-[1000px] justify-between md:justify-end md:gap-10 md:mx-auto">
        <nav className="hidden md:block">
          <div className="w-full flex text-gray-100 gap-5 text-xl`">
            <Link href="/">
              <a className="py-1">Home</a>
            </Link>
            <Link href="/admin">
              <a className="py-1">Admin</a>
            </Link>
            <Link href="/about">
              <a className="py-1">About</a>
            </Link>
          </div>
        </nav>

        {/* mobile navbaar */}
        <nav>
          <div className="md:hidden">
            <button
              onClick={handlerToggle}
              className="text-2xl text-white translate-y-2"
            >
              {isOpen ? <MdOutlineClose /> : <HiMenuAlt4 />}
            </button>
            {isOpen && (
              <div className="z-50 h-screen w-full text-gray-200 absolute top-14 inset-0 px-5 py-10 bg-[#0F172A] ">
                <motion.div
                  animate={{ y: -100 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                >
                  <div className="w-full  flex flex-col gap-5 absolute top-20 text-xl`">
                    <Link href="/">
                      <a className="border-b-2 py-1 border-gray-500">Home</a>
                    </Link>
                    <Link href="/admin/dashboard">
                      <a className="border-b-2 py-1 border-gray-500">
                        Dashboard
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="border-b-2 py-1 border-gray-500">About</a>
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </nav>

        <button
          onClick={handlerDark}
          className="text-white border-[3px] border-gray-500 p-2 rounded-xl"
        >
          {isDark ? <MdNightlightRound /> : <MdWbSunny />}
        </button>
      </div>
    </div>
  );
}
