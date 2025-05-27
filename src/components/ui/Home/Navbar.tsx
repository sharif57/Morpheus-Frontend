// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { usePathname } from "next/navigation";
// import { useUserProfileQuery } from "@/Redux/feature/userSlice";

// export default function Navbar() {
//   const { data } = useUserProfileQuery(undefined);
//   console.log(data?.full_name);
//   const pathname = usePathname();
//   // console.log("Pathname:", pathname);
//   if (
//     pathname === "/auth/login" ||
//     pathname === "/auth/forgot-password" ||
//     pathname === "/auth/verify-otp" ||
//     pathname === "/auth/signup" ||
//     pathname === "/auth/reset-password" ||
//     pathname === "/chat"
//   ) {
//     return null;
//   }

//   return (
//     <header
//       className={"w-full top-0 fixed z-50 transition-all duration-300 py-4   "}
//       // style={{ backgroundColor: "#005163" }}
//     >
//       <div className="container mx-auto px-4 flex items-center justify-between">
//         <Link href="/" className="flex items-center space-x-2">
//           <div className="relative ">
//             <Image
//               src={"/logo.png"}
//               alt="Logo"
//               width={100}
//               height={100}
//               className="lg:w-[167px] lg:h-[92px]"
//             ></Image>
//           </div>
//         </Link>

//         {data && (
//           <Link href="/auth/login">
//             <Button className="bg-[#33CDF0] cursor-pointer hover:bg-[#33cdf0f1] text-[#00535e]  text-[16px] font-semibold font-[Montserrat] lg:px-10 px-6 lg:py-6 py-2 rounded-md transition-colors">
//               Login
//             </Button>
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useUserProfileQuery(undefined);
  // const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    toast.success("Logout successful!");
    localStorage.removeItem("token"); // Remove the token from local storage
    localStorage.removeItem("session");
    router.push("/auth/login");
  };

  // Hide navbar on auth pages
  if (pathname.startsWith("/auth") || pathname === "/chat") {
    return null;
  }

  const IMAGE = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <header className="w-full top-0 fixed z-50 transition-all duration-300 py-4 ">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-24 h-auto md:w-32 lg:w-40"
              priority
            />
 

          </div>
        </Link>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ) : data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full p-0  dark:hover:bg-gray-800"
                >
                  <Avatar className="h-12 w-12">
                    <Image
                      className="rounded-full"
                      width={100}
                      height={100}
                      src={`${IMAGE}/${data?.profile_pic}`}
                      alt={data.full_name}
                    />
                    {/* <AvatarImage 
                      src={`${IMAGE}${data.profile_pic}` || "/images/user.png"} 
                      alt={data.full_name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/user.png";
                      }}
                    /> */}
                    {/* <AvatarFallback>
                      {data.full_name?.charAt(0).toUpperCase()}
                    </AvatarFallback> */}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {data.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {data.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile/my-profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login">
                <Button className="bg-[#33CDF0] cursor-pointer hover:bg-[#33cdf0f1] text-[#00535e]  text-[16px] font-semibold font-[Montserrat] lg:px-10 px-6 lg:py-6 py-2 rounded-md transition-colors">
                  Login{" "}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
