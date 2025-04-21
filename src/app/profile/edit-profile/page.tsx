// "use client";

// import type React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";

// export default function EditProfile() {

//   return (
//     <div>
//       <main
//         className="min-h-screen  w-full bg-[#005163] text-white flex items-center justify-center"
//         style={{
//           backgroundImage: "url('/sideGradin.png')",
//           backgroundPosition: "top right",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "auto 100%",
//         }}
//       >
//         <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 font-[Montserrat]">
//           <div className="flex flex-col items-center justify-center gap-8">
//             <div className="w-full max-w-[740px] bg-[#006A82] rounded-lg shadow-xl p-6 sm:p-8">
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
//                 <div className="w-[250px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0">
//                   <Image
//                     src="/profile.png"
//                     height={370}
//                     width={300}
//                     alt="profile"
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-6 sm:gap-12 justify-center items-start">
//                   <div className="flex flex-col gap-3">
//                     <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
//                       Name:
//                     </h1>
//                     <Input placeholder="Marvin McKinney " className="text-white py-6 lg:w-[300px]" />
//                   </div>

//                   <Link href="/profile/edit-profile">
//                     <Button className="px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold bg-[#33CDF0] hover:bg-[#33CDF0] text-[#005163] text-sm sm:text-[16px]">
//                     Save Changes
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import type React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
export default function EditProfile() {
  const [profileImage, setProfileImage] = useState("/profile.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <div>
      <main
        className="min-h-screen w-full bg-[#005163] text-white flex items-center justify-center"
        style={{
          backgroundImage: "url('/sideGradin.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
        }}
      >
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 font-[Montserrat]">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-[740px] bg-[#006A82] rounded-lg shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="relative w-[250px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    height={800}
                    width={700}
                    alt="profile"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#33CDF0] rounded-full p-2 shadow-lg"
                    onClick={triggerFileInput}
                  >
                    <Plus className="h-5 w-5 text-[#005163]" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                    
                  />
                </div>
                <div className="flex flex-col gap-6 sm:gap-12 justify-center items-start">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Name:
                    </h1>
                    <Input
                      placeholder="Marvin McKinney "
                      className="text-white py-6 lg:w-[300px]"
                      defaultValue={"Marvin McKinney"}
                    />
                  </div>
                  <Link href="/profile/edit-profile">
                    <Button className="px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold bg-[#33CDF0] hover:bg-[#33CDF0] text-[#005163] text-sm sm:text-[16px]">
                      Save Changes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
