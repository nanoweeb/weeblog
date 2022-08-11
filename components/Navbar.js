import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handlerToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="py-4 border-b-3 px-5 bg-[#0F172A]">
      <nav>
        <button onClick={handlerToggle} className="text-2xl">
          {isOpen ? <MdOutlineClose /> : <HiMenuAlt4 />}
        </button>
        {isOpen && (
          <div className="h-screen w-full text-xl text-gray-200 absolute top-10 left-0 px-5 py-10 bg-[#0F172A]">
            <ul className="space-y-5">
              <li className="border-b-[1px] py-1 border-gray-500">post</li>
              <li className="border-b-[1px] py-1 border-gray-500">dashboard</li>
              <li className="border-b-[1px] py-1 border-gray-500">profile</li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
