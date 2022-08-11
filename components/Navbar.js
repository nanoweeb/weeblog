import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { BsFillMoonFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handlerToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="py-4 border-b-3 border-gray-400 px-5 bg-slate-500">
      <nav>
        <button onClick={handlerToggle}>
          <HiMenuAlt4 />
        </button>
        {isOpen && (
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <ul>
              <li>post</li>
              <li>dashboard</li>
              <li>profile</li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
