// "use client";
// import type React from "react";
// import { useState, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Plus } from "lucide-react";
// import {
//   useUpdateProfileMutation,
//   useUserProfileQuery,
// } from "@/Redux/feature/userSlice";
// import { toast } from "sonner";
// export default function EditProfile() {
//   const { data, isLoading } = useUserProfileQuery(undefined);
//   const [profileImage, setProfileImage] = useState();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };
//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };
//   const [updateProfile] = useUpdateProfileMutation();

//   const handleUpdateProfile = async () => {
//     const formData = new FormData();
//     if (profileImage) {
//       formData.append("image", profileImage);
//     }
//     if (data) {
//       formData.append("full_name", data.full_name);
//     }
//     try {
//       await updateProfile(formData).unwrap();
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       toast.error("Failed to update profile");
//     }
//   };
//   /*******  5b8c4600-3b88-4126-86d3-544eae759492  *******/

//   const IMAGE = process.env.NEXT_PUBLIC_API_KEY;

//   return (
//     <div>
//       <main
//         className="min-h-screen w-full bg-[#005163] text-white flex items-center justify-center"
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
//               <div
//                 onClick={handleUpdateProfile}
//                 className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
//               >
//                 <div className="relative w-[250px] h-[240px]  sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0">
//                   <Image
//                     src={`${IMAGE}/${data?.profile_pic}` || "/placeholder.svg"}
//                     height={800}
//                     width={700}
//                     alt="profile"
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                   <button
//                     className="absolute cursor-pointer -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#33CDF0] rounded-full p-2 shadow-lg"
//                     onClick={triggerFileInput}
//                   >
//                     <Plus className="h-5 w-5 text-[#005163]" />
//                   </button>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleImageUpload}
//                     accept="image/*"
//                     className="hidden"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-6 sm:gap-12 justify-center items-start">
//                   <div className="flex flex-col gap-3">
//                     <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
//                       Name:
//                     </h1>
//                     <Input
//                       placeholder="Marvin McKinney "
//                       className="text-white py-6 lg:w-[300px]"
//                       defaultValue={data?.full_name}
//                     />
//                   </div>
//                   <Link href="/profile/edit-profile">
//                     <Button className="px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold bg-[#33CDF0] hover:bg-[#33CDF0] text-[#005163] text-sm sm:text-[16px]">
//                       Save Changes
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
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/Redux/feature/userSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Home/Navbar";

export default function EditProfile() {
  const { data, isLoading } = useUserProfileQuery(undefined);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState(data?.full_name || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateProfile] = useUpdateProfileMutation();
  const IMAGE = process.env.NEXT_PUBLIC_API_KEY;

  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (selectedImage) {
      formData.append("profile_pic", selectedImage);
    }
    
    if (fullName) {
      formData.append("full_name", fullName);
    }

    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      router.push("/profile/my-profile"); // Redirect to the profile page after successful update
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#005163] text-white flex items-center justify-center">
        <div className="text-center">Loading profile data...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
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
              <form onSubmit={handleUpdateProfile}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                  {/* Profile Image Section */}
                  <div className="relative w-[250px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0">
                    <Image
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : data?.profile_pic
                          ? `${IMAGE}${data.profile_pic}`
                          : "/placeholder.svg"
                      }
                      height={800}
                      width={700}
                      alt="profile"
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                    <button
                      type="button"
                      className="absolute cursor-pointer -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#33CDF0] rounded-full p-2 shadow-lg"
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

                  {/* Profile Info Section */}
                  <div className="flex flex-col gap-6 sm:gap-12 justify-center items-start">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                        Name:
                      </h1>
                      <Input
                        placeholder="Enter your name"
                        className="text-white py-6 lg:w-[300px]"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="px-6 py-3 sm:px-8 sm:py-4 cursor-pointer font-semibold bg-[#33CDF0] hover:bg-[#33CDF0] text-[#005163] text-sm sm:text-[16px]"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}