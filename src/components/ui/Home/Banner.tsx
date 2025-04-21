import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div>
      <main
        className="min-h-screen w-full bg-[#005163] text-white  "
        style={{
          backgroundImage: "url('/sideGradin.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-56 " >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Left Section: Text and Button */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl mt-10 lg:mt-0 lg:text-6xl font-semibold leading-tight font-[Montserrat]">
                Unlock Knowledge
                <br /> with <span className="text-[#54D5F2]">AI-Powered</span>
                <br /> Insights
              </h1>
              <p className="text-lg md:text-[19] max-w-md text-[#F5FDFF] font-[Montserrat]">
                Harness the wisdom of business books with a personalized AI
                assistant designed just for you
              </p>
              <button className="mt-4 bg-[#33CDF0] cursor-pointer font-[Montserrat] hover:bg-[#54D5F2] text-teal-900 font-medium px-8 py-3 rounded-md transition-colors flex items-center gap-2 group">
                TRY MORPHEUS
                <ArrowUpRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>

            {/* Right Section: Illustration */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/sideImage.png"
                  alt="AI Knowledge Platform Illustration"
                  width={1000}
                  height={450}
                  className="lg:w-[600px] lg:h-[400px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
