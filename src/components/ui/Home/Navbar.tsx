"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header
      className={"w-full top-0 fixed z-50 transition-all duration-300 py-4   "}
      // style={{ backgroundColor: "#005163" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative ">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={100}
              height={100}
              className="lg:w-[167px] lg:h-[92px]"
            ></Image>
          </div>
        </Link>

        <Button className="bg-[#33CDF0] hover:bg-[#33cdf0f1] text-[#00535e]  text-[16px] font-semibold font-[Montserrat] lg:px-10 px-6 lg:py-4 py-2 rounded-md transition-colors">
          Login
        </Button>
      </div>
    </header>
  );
}
