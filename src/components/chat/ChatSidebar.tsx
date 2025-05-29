"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  useCreateSessionMutation,
  useUserAllSessionsQuery,
} from "@/Redux/feature/createSession";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Session {
  title: string;
  session_id: string;
  session_start: string;
}
import { Home, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface ChatSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

export default function ChatSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsSearchModalOpen,
}: ChatSidebarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [createSession] = useCreateSessionMutation();
  const { data, isLoading } = useUserAllSessionsQuery(undefined);
  const { data: userData } = useUserProfileQuery(undefined);
  const router = useRouter();

  const IMAGE = process.env.NEXT_PUBLIC_API_KEY;

  const handleSessionCreate = async () => {
    try {
      const res = await createSession({}).unwrap();
      localStorage.setItem("session", res.session_id);
      toast.success(res.message || "Session created successfully");
      setIsMobileMenuOpen(false);
      window.location.href = "/chat"; // This will automatically cause a page reload
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session");
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setActiveSession(sessionId);
    localStorage.setItem("session", sessionId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    toast.success("Logout successful!");
    localStorage.removeItem("token"); // Remove the token from local storage
    localStorage.removeItem("session");
    router.push("/auth/login");
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#003B48] opacity-50 z-20 md:hidden font-[Montserrat]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 h-full bg-[#004050] w-64 z-30
          transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 flex flex-col mt-7 justify-between items-center">
            <Link href={"/"}>
              <svg
                width="167"
                height="28"
                viewBox="0 0 167 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.56641 4.9375H5.15625L9.08203 17.6289L12.9961 4.9375H15.3984L10.1484 22H8.00391L2.56641 4.9375ZM1.59375 4.9375H3.98438L4.37109 15.8008V22H1.59375V4.9375ZM14.1562 4.9375H16.5586V22H13.7812V15.8008L14.1562 4.9375ZM39.0159 12.0742V14.9805C39.0159 16.1836 38.8753 17.2383 38.5941 18.1445C38.3206 19.0508 37.9222 19.8086 37.3988 20.418C36.8831 21.0195 36.2581 21.4727 35.5238 21.7773C34.7972 22.082 33.9847 22.2344 33.0863 22.2344C32.1956 22.2344 31.3831 22.082 30.6488 21.7773C29.9222 21.4727 29.2933 21.0195 28.762 20.418C28.2386 19.8086 27.8323 19.0508 27.5433 18.1445C27.262 17.2383 27.1214 16.1836 27.1214 14.9805V12.0742C27.1214 10.8555 27.262 9.78906 27.5433 8.875C27.8245 7.95312 28.2269 7.18359 28.7503 6.56641C29.2816 5.94922 29.9105 5.48438 30.637 5.17188C31.3714 4.85937 32.18 4.70312 33.0628 4.70312C33.9613 4.70312 34.7738 4.85937 35.5003 5.17188C36.2347 5.48438 36.8636 5.94922 37.387 6.56641C37.9105 7.18359 38.3128 7.95312 38.5941 8.875C38.8753 9.78906 39.0159 10.8555 39.0159 12.0742ZM36.1917 14.9805V12.0508C36.1917 11.1836 36.1214 10.4414 35.9808 9.82422C35.848 9.19922 35.6488 8.69141 35.3831 8.30078C35.1175 7.90234 34.7894 7.60938 34.3988 7.42188C34.0159 7.22656 33.5706 7.12891 33.0628 7.12891C32.5706 7.12891 32.1292 7.22656 31.7386 7.42188C31.3558 7.60938 31.0277 7.90234 30.7542 8.30078C30.4886 8.69141 30.2855 9.19922 30.1448 9.82422C30.012 10.4414 29.9456 11.1836 29.9456 12.0508V14.9805C29.9456 15.832 30.0159 16.5664 30.1566 17.1836C30.2972 17.793 30.5003 18.293 30.7659 18.6836C31.0394 19.0664 31.3714 19.3516 31.762 19.5391C32.1527 19.7266 32.5941 19.8203 33.0863 19.8203C33.5863 19.8203 34.0316 19.7266 34.4222 19.5391C34.8128 19.3516 35.137 19.0664 35.3948 18.6836C35.6605 18.293 35.8597 17.793 35.9925 17.1836C36.1253 16.5664 36.1917 15.832 36.1917 14.9805ZM49.5905 4.9375H54.7467C55.8717 4.9375 56.8248 5.13281 57.6061 5.52344C58.3873 5.91406 58.9811 6.49219 59.3873 7.25781C59.8014 8.01562 60.0084 8.95703 60.0084 10.082C60.0084 10.9336 59.8795 11.6836 59.6217 12.332C59.3717 12.9805 59.0084 13.5273 58.5319 13.9727C58.0553 14.4102 57.4811 14.75 56.8092 14.9922L55.9772 15.4492H51.6178L51.6061 13.0586H54.6764C55.2311 13.0586 55.692 12.9375 56.0592 12.6953C56.4264 12.4531 56.6998 12.1172 56.8795 11.6875C57.067 11.2578 57.1608 10.7695 57.1608 10.2227C57.1608 9.63672 57.0788 9.12891 56.9147 8.69922C56.7506 8.26172 56.4928 7.92578 56.1413 7.69141C55.7897 7.44922 55.3248 7.32812 54.7467 7.32812H52.4381V22H49.5905V4.9375ZM57.5358 22L54.2897 14.3359L57.2545 14.3242L60.5827 21.8477V22H57.5358ZM75.9267 15.6719H72.3291V13.293H75.9267C76.5205 13.293 76.997 13.168 77.3564 12.918C77.7158 12.668 77.9775 12.3242 78.1416 11.8867C78.3134 11.4492 78.3994 10.9531 78.3994 10.3984C78.3994 9.86719 78.3134 9.36719 78.1416 8.89844C77.9775 8.42969 77.7158 8.05078 77.3564 7.76172C76.997 7.47266 76.5205 7.32812 75.9267 7.32812H73.1377V22H70.29V4.9375H75.9267C77.0595 4.9375 78.0205 5.17188 78.8095 5.64062C79.6064 6.10938 80.2158 6.75391 80.6377 7.57422C81.0595 8.38672 81.2705 9.32031 81.2705 10.375C81.2705 11.4766 81.0595 12.4219 80.6377 13.2109C80.2158 14 79.6064 14.6094 78.8095 15.0391C78.0205 15.4609 77.0595 15.6719 75.9267 15.6719ZM100.833 12.0391V14.4297H93.6497V12.0391H100.833ZM94.3177 4.9375V22H91.47V4.9375H94.3177ZM103.06 4.9375V22H100.224V4.9375H103.06ZM123.466 19.6211V22H116.06V19.6211H123.466ZM116.81 4.9375V22H113.963V4.9375H116.81ZM122.47 12.0391V14.3828H116.06V12.0391H122.47ZM123.396 4.9375V7.32812H116.06V4.9375H123.396ZM141.33 4.9375H144.178V16.7852C144.178 18.0898 143.932 19.1406 143.439 19.9375C142.955 20.7344 142.299 21.3164 141.471 21.6836C140.65 22.0508 139.736 22.2344 138.728 22.2344C137.682 22.2344 136.748 22.0508 135.928 21.6836C135.107 21.3164 134.463 20.7344 133.994 19.9375C133.525 19.1406 133.291 18.0898 133.291 16.7852V4.9375H136.127V16.7852C136.127 17.5977 136.228 18.2266 136.432 18.6719C136.643 19.1172 136.939 19.4258 137.322 19.5977C137.713 19.7695 138.182 19.8555 138.728 19.8555C139.275 19.8555 139.74 19.7695 140.123 19.5977C140.514 19.4258 140.81 19.1172 141.014 18.6719C141.225 18.2266 141.33 17.5977 141.33 16.7852V4.9375ZM162.135 17.5938C162.135 17.2422 162.096 16.9297 162.018 16.6562C161.947 16.375 161.811 16.1211 161.608 15.8945C161.405 15.668 161.115 15.4453 160.74 15.2266C160.373 15.0078 159.897 14.7852 159.311 14.5586C158.639 14.3008 158.01 14.0195 157.424 13.7148C156.846 13.4023 156.334 13.0508 155.889 12.6602C155.451 12.2617 155.108 11.7969 154.858 11.2656C154.608 10.7344 154.483 10.1172 154.483 9.41406C154.483 8.71875 154.604 8.08594 154.846 7.51562C155.096 6.9375 155.447 6.44141 155.901 6.02734C156.362 5.60547 156.908 5.28125 157.541 5.05469C158.174 4.82031 158.873 4.70312 159.639 4.70312C160.74 4.70312 161.682 4.9375 162.463 5.40625C163.252 5.875 163.854 6.50391 164.268 7.29297C164.69 8.08203 164.901 8.95703 164.901 9.91797H162.065C162.065 9.36328 161.979 8.87109 161.807 8.44141C161.635 8.01172 161.369 7.67578 161.01 7.43359C160.651 7.19141 160.186 7.07031 159.615 7.07031C159.092 7.07031 158.658 7.17188 158.315 7.375C157.979 7.57812 157.729 7.85547 157.565 8.20703C157.408 8.55859 157.33 8.96094 157.33 9.41406C157.33 9.72656 157.397 10.0117 157.53 10.2695C157.662 10.5195 157.854 10.75 158.104 10.9609C158.354 11.1719 158.658 11.3711 159.018 11.5586C159.377 11.7461 159.791 11.9258 160.26 12.0977C161.057 12.3867 161.752 12.707 162.346 13.0586C162.94 13.4102 163.428 13.8047 163.811 14.2422C164.201 14.6719 164.49 15.1602 164.678 15.707C164.873 16.2539 164.971 16.875 164.971 17.5703C164.971 18.2734 164.85 18.9141 164.608 19.4922C164.373 20.0625 164.03 20.5508 163.576 20.957C163.123 21.3633 162.576 21.6797 161.936 21.9062C161.295 22.125 160.576 22.2344 159.78 22.2344C159.045 22.2344 158.338 22.125 157.658 21.9062C156.987 21.6875 156.385 21.3555 155.854 20.9102C155.322 20.457 154.901 19.8906 154.588 19.2109C154.283 18.5312 154.131 17.7344 154.131 16.8203H156.979C156.979 17.3672 157.045 17.8359 157.178 18.2266C157.311 18.6094 157.502 18.9258 157.752 19.1758C158.01 19.418 158.311 19.5977 158.655 19.7148C159.006 19.8242 159.397 19.8789 159.826 19.8789C160.358 19.8789 160.791 19.7852 161.127 19.5977C161.471 19.4023 161.725 19.1328 161.889 18.7891C162.053 18.4453 162.135 18.0469 162.135 17.5938Z"
                  fill="#33CDF0"
                />
              </svg>
            </Link>
            <div className="flex gap-28 mt-8 mb-5 justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="p-2 cursor-pointer rounded-full hover:bg-[#005163] transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleSessionCreate}
                className="p-2 cursor-pointer rounded-full hover:bg-[#005163] transition-colors"
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
                    stroke="#F5FDFF"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Sections */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <div className="p-4 text-center">Loading sessions...</div>
            ) : (
              <>
                {/* Today */}
                {data?.today?.length > 0 && (
                  <div className="p-4">
                    <h2 className="text-sm font-medium mb-2">Today</h2>
                    <ul className="space-y-1">
                      {data.today.map((session: Session, index: number) => (
                        <li key={`today-${index}`} className="relative group">
                          <button
                            onClick={() =>
                              handleSessionSelect(session.session_id)
                            }
                            className={`w-full text-left py-2 px-3 rounded transition-colors text-sm flex items-center justify-between ${
                              activeSession === session.session_id
                                ? "bg-[#005163]"
                                : "hover:bg-[#005163]"
                            }`}
                          >
                            {/* <span>{session.title}</span> */}
                            <Link href={`/chat/${session.session_id}`}>
                              {session.title}
                            </Link>
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenu(
                                    activeMenu === `today-${index}`
                                      ? null
                                      : `today-${index}`
                                  );
                                }}
                                className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-[#006A82]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="1"></circle>
                                  <circle cx="19" cy="12" r="1"></circle>
                                  <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                              </button>

                              {activeMenu === `today-${index}` && (
                                <div className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenu(null);
                                      toast.info(
                                        "Edit functionality coming soon!"
                                      );
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenu(null);
                                      toast.success(
                                        "Session deleted successfully!"
                                      );
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Yesterday */}
                {data?.yesterday?.length > 0 && (
                  <div className="p-4">
                    <h2 className="text-sm font-medium mb-2">Yesterday</h2>
                    <ul className="space-y-1">
                      {data.yesterday.map((session: Session, index: number) => (
                        <li
                          key={`yesterday-${index}`}
                          className="relative group"
                        >
                          <button
                            onClick={() =>
                              handleSessionSelect(session.session_id)
                            }
                            className={`w-full text-left py-2 px-3 rounded transition-colors text-sm flex items-center justify-between ${
                              activeSession === session.session_id
                                ? "bg-[#005163]"
                                : "hover:bg-[#005163]"
                            }`}
                          >
                            {/* <span>{session.title}</span>{" "} */}
                            <Link href={`/chat/${session.session_id}`}>
                              {session.title}
                            </Link>
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenu(
                                    activeMenu === `yesterday-${index}`
                                      ? null
                                      : `yesterday-${index}`
                                  );
                                }}
                                className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-[#006A82]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="1"></circle>
                                  <circle cx="19" cy="12" r="1"></circle>
                                  <circle cx="5" cy="12" r="1"></circle>
                                </svg>
                              </button>

                              {activeMenu === `yesterday-${index}` && (
                                <div className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenu(null);
                                      toast.info(
                                        "Edit functionality coming soon!"
                                      );
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMenu(null);
                                      toast.success(
                                        "Session deleted successfully!"
                                      );
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Previous 7 Days */}
                {data?.["Previous 7 Days"]?.length > 0 && (
                  <div className="p-4">
                    <h2 className="text-sm font-medium mb-2">
                      Previous 7 Days
                    </h2>
                    <ul className="space-y-1">
                      {data["Previous 7 Days"].map(
                        (session: Session, index: number) => (
                          <li
                            key={`previous-${index}`}
                            className="relative group"
                          >
                            <button
                              onClick={() =>
                                handleSessionSelect(session.session_id)
                              }
                              className={`w-full text-left py-2 px-3 rounded transition-colors text-sm flex items-center justify-between ${
                                activeSession === session.session_id
                                  ? "bg-[#005163]"
                                  : "hover:bg-[#005163]"
                              }`}
                            >
                              {/* <span>{session.title}</span> */}
                              <Link href={`/chat/${session.session_id}`}>
                                {session.title}
                              </Link>
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveMenu(
                                      activeMenu === `previous-${index}`
                                        ? null
                                        : `previous-${index}`
                                    );
                                  }}
                                  className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-full hover:bg-[#006A82]"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="19" cy="12" r="1"></circle>
                                    <circle cx="5" cy="12" r="1"></circle>
                                  </svg>
                                </button>

                                {activeMenu === `previous-${index}` && (
                                  <div className="absolute right-0 mt-1 w-32 bg-[#004050] rounded-md shadow-lg z-10 py-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenu(null);
                                        toast.info(
                                          "Edit functionality coming soon!"
                                        );
                                      }}
                                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenu(null);
                                        toast.success(
                                          "Session deleted successfully!"
                                        );
                                      }}
                                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163] text-red-400"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* User Profile */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="outline">Open</Button> */}
              <div className="p-4 border-t cursor-pointer hover:bg-[#006A82] border-b border-[#006A82] flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-400 mr-3 overflow-hidden">
                  <Image
                    src={`${IMAGE}/${userData?.profile_pic}`}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm">{userData?.full_name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <Link href={"/"} className="cursor-pointer">
                <DropdownMenuItem>
                  <Home />
                  Home
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="">
                <User />
                <span>{userData?.full_name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
