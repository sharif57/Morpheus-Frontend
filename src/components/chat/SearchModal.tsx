// "use client";

// import type React from "react";

// import { useRef, useEffect } from "react";
// import { Search } from "lucide-react";
// import {
//   useCreateSessionMutation,
//   useSearchChatsQuery,
// } from "@/Redux/feature/createSession";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// interface SearchModalProps {
//   onClose: () => void;
// }
// interface Chat {
//   _id: string;
//   title: string;
// }

// export default function SearchModal({ onClose }: SearchModalProps) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const modalRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const [createSession] = useCreateSessionMutation();

//   const { data } = useSearchChatsQuery(undefined);
//   console.log(data, "search");

//   useEffect(() => {
//     // Focus the input when modal opens
//     inputRef.current?.focus();

//     // Close modal on escape key
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handleEscape);
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [onClose]);

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     // Close the modal if the click is on the overlay (not on the modal content)
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleNewChat = () => {
//     onClose();
//     // Logic to start a new chat would go here
//   };
//   const handleSessionCreate = async () => {
//     try {
//       const res = await createSession({}).unwrap();
//       localStorage.setItem("session", res.session_id);
//       toast.success(res.message || "Session created successfully");
//       router.push("/chat");
//     } catch (error) {
//       console.error("Error creating session:", error);
//       toast.error("Failed to create session");
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0   flex items-start justify-center pt-28 z-50 "
//       onClick={handleOverlayClick}
//     >
//       <div
//         ref={modalRef}
//         className="bg-[#006A82]  lg:w-1/3 rounded-lg shadow-xl p-4 overflow-hidden"
//       >
//         {/* Search input */}
//         <div className="p-3 border-b border-[#006A82] ">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search chat"
//               className="w-full bg-[#0088A8] text-white pl-10 pr-4 py-2 rounded-md placeholder:text-[#8AE2F6] focus:outline-none focus:ring-1 focus:ring-[#33CDF0]"
//             />
//           </div>
//         </div>

//         {/* New Chat button */}
//         <div
//           onClick={handleSessionCreate}
//           className="bg-[#0088A8] cursor-pointer lg:w-1/4 rounded-lg mt-4"
//         >
//           <button
//             onClick={handleNewChat}
//             className="w-full p-3 flex items-center gap-2 cursor-pointer     "
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
//                 stroke="#F5FDFF"
//                 stroke-width="1.5"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               />
//               <path
//                 d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
//                 stroke="#F5FDFF"
//                 stroke-width="1.5"
//                 stroke-miterlimit="10"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               />
//               <path
//                 d="M14.9099 4.1499C15.5799 6.5399 17.4499 8.4099 19.8499 9.0899"
//                 stroke="#F5FDFF"
//                 stroke-width="1.5"
//                 stroke-miterlimit="10"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               />
//             </svg>

//             <span>New Chat</span>
//           </button>
//         </div>

//         {/* Chat history */}
//         <div className="max-h-96 overflow-y-auto scrollbar-hide pt-4">
//           <h3 className="px-4 py-2 text-sm font-medium text-white">Today</h3>
//           <ul>
//             {data?.map((chat: Chat) => (
//               <li key={chat._id}>
//                 <button className="w-full text-left px-4 py-2 hover:bg-[#005163] transition-colors flex items-center gap-3">
//                   {/* <Search className="h-4 w-4 mr-3 text-gray-400" /> */}
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M15.3917 14.0251L15.7167 16.6584C15.8 17.3501 15.0584 17.8334 14.4667 17.4751L10.975 15.4001C10.5917 15.4001 10.2167 15.3751 9.85004 15.3251C10.4667 14.6001 10.8334 13.6834 10.8334 12.6917C10.8334 10.3251 8.78337 8.40844 6.25004 8.40844C5.28337 8.40844 4.39171 8.68341 3.65004 9.16675C3.62504 8.95841 3.6167 8.75007 3.6167 8.53341C3.6167 4.74174 6.90837 1.66675 10.975 1.66675C15.0417 1.66675 18.3334 4.74174 18.3334 8.53341C18.3334 10.7834 17.175 12.7751 15.3917 14.0251Z"
//                       stroke="white"
//                       stroke-width="1.25"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M10.8334 12.6917C10.8334 13.6834 10.4668 14.6001 9.85009 15.3251C9.02509 16.3251 7.71675 16.9667 6.25008 16.9667L4.07508 18.2584C3.70841 18.4834 3.24175 18.1751 3.29175 17.7501L3.50008 16.1084C2.38341 15.3334 1.66675 14.0917 1.66675 12.6917C1.66675 11.2251 2.45009 9.93342 3.65009 9.16676C4.39175 8.68342 5.28341 8.40845 6.25008 8.40845C8.78341 8.40845 10.8334 10.3251 10.8334 12.6917Z"
//                       stroke="white"
//                       stroke-width="1.25"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>

//                   <span className="text-sm text-white ">{chat?.title}</span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  useCreateSessionMutation,
  useSearchChatsQuery,
} from "@/Redux/feature/createSession";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  onClose: () => void;
}
interface Chat {
  _id: string;
  title: string;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [createSession] = useCreateSessionMutation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch chats based on search query
  const { data } = useSearchChatsQuery(searchQuery || undefined);
  console.log(data, "search");

  useEffect(() => {
    // Focus the input when modal opens
    inputRef.current?.focus();

    // Close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNewChat = () => {
    onClose();
  };

  const handleSessionCreate = async () => {
    try {
      const res = await createSession({}).unwrap();
      localStorage.setItem("session", res.session_id);
      toast.success(res.message || "Session created successfully");
      router.push("/chat");
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session");
    }
  };

  // Handle search input change
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className="fixed inset-0 flex items-start justify-center pt-28 z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-[#006A82] lg:w-1/3 rounded-lg shadow-xl p-4 overflow-hidden"
      >
        {/* Search input */}
        <div className="p-3 border-b border-[#006A82]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search chat"
              value={searchQuery}
              onChange={handleSearchInput}
              className="w-full bg-[#0088A8] text-white pl-10 pr-4 py-2 rounded-md placeholder:text-[#8AE2F6] focus:outline-none focus:ring-1 focus:ring-[#33CDF0]"
            />
          </div>
        </div>

        {/* New Chat button */}
        <div
          onClick={handleSessionCreate}
          className="bg-[#0088A8] cursor-pointer lg:w-1/4 rounded-lg mt-4"
        >
          <button
            onClick={handleNewChat}
            className="w-full p-3 flex items-center gap-2 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                stroke="#F5FDFF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
                stroke="#F5FDFF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.9099 4.1499C15.5799 6.5399 17.4499 8.4099 19.8499 9.0899"
                stroke="#F5FDFF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat history */}
        <div className="max-h-96 overflow-y-auto scrollbar-hide pt-4">
          <h3 className="px-4 py-2 text-sm font-medium text-white">Today</h3>
          <ul>
            {data?.map((chat: Chat) => (
              <li key={chat._id}>
                <button className="w-full text-left px-4 py-2 hover:bg-[#005163] transition-colors flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3917 14.0251L15.7167 16.6584C15.8 17.3501 15.0584 17.8334 14.4667 17.4751L10.975 15.4001C10.5917 15.4001 10.2167 15.3751 9.85004 15.3251C10.4667 14.6001 10.8334 13.6834 10.8334 12.6917C10.8334 10.3251 8.78337 8.40844 6.25004 8.40844C5.28337 8.40844 4.39171 8.68341 3.65004 9.16675C3.62504 8.95841 3.6167 8.75007 3.6167 8.53341C3.6167 4.74174 6.90837 1.66675 10.975 1.66675C15.0417 1.66675 18.3334 4.74174 18.3334 8.53341C18.3334 10.7834 17.175 12.7751 15.3917 14.0251Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.8334 12.6917C10.8334 13.6834 10.4668 14.6001 9.85009 15.3251C9.02509 16.3251 7.71675 16.9667 6.25008 16.9667L4.07508 18.2584C3.70841 18.4834 3.24175 18.1751 3.29175 17.7501L3.50008 16.1084C2.38341 15.3334 1.66675 14.0917 1.66675 12.6917C1.66675 11.2251 2.45009 9.93342 3.65009 9.16676C4.39175 8.68342 5.28341 8.40845 6.25008 8.40845C8.78341 8.40845 10.8334 10.3251 10.8334 12.6917Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="text-sm text-white">{chat?.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}