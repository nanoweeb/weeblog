import Link from "next/link";
import { SiDiscord, SiFacebook, SiTwitter } from "react-icons/si";

export default function Footer() {
  return (
    <div className="w-full bg-[#090e1a]">
      <footer className="max-w-[1000px] mx-auto px-5 mt-80 pt-10 text-gray-200 ">
        <div>
          <h1 className="text-lg font-semibold">Central Java, Pati</h1>
          <div className="text-sm text-gray-300 pt-2">
            <p>104 Lawak Avenue - Pati City</p>
            <p>Pati - 59111</p>
            <p>(+62) 859 4192 7516</p>
          </div>

          {/* <div className="flex flex-col pt-6 gap-2">
            <Link href="/posts">
              <a>Posts</a>
            </Link>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
            <Link href="/">
              <a>Profile</a>
            </Link>
          </div> */}

          <div>
            <h1 className="text-lg font-semibold pt-10">
              Join Our Social Community
            </h1>
            <div className="flex gap-5 text-xl">
              <a href="">
                <SiDiscord />
              </a>
              <a href="">
                <SiFacebook />
              </a>
              <a href="">
                <SiTwitter />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
