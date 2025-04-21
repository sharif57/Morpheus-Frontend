"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

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
  //   const [activeSection, setActiveSection] = useState("today")
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const chatGroups = {
    today: Array(8)
      .fill(0)
      .map((_, i) => `Chat name ${i + 1}`),
    yesterday: Array(8)
      .fill(0)
      .map((_, i) => `Chat name ${i + 1}`),
    previous: Array(8)
      .fill(0)
      .map((_, i) => `Chat name ${i + 1}`),
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#003B48]  z-20 md:hidden font[Montserrat]"
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
            <Image
              src="/Morpheus.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-[170px]"
            ></Image>
            <div className="flex gap-28 mt-8 mb-5  justify-between">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
                className="p-2 cursor-pointer rounded-full hover:bg-[#005163] transition-colors"
              >
                {/* <Search className="size-6" /> */}
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="#F5FDFF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => window.location.reload()}
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
                    stroke="#F5FDFF"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
                    stroke="#F5FDFF"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Sections */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="p-4">
              <h2 className="text-sm font-medium mb-2">Today</h2>
              <ul className="space-y-1">
                {chatGroups.today.map((chat, index) => (
                  <li key={`today-${index}`} className="relative group">
                    <button className="w-full text-left py-2 px-3 rounded hover:bg-[#005163] transition-colors text-sm flex items-center justify-between">
                      <span>{chat}</span>
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
                                // Handle edit
                                setActiveMenu(null);
                              }}
                              // onClick={() => {
                              //   alert("Edit clicked");
                              // }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                            >
                              Edit
                            </button>
                            <button
                              // onClick={(e) => {
                              //   e.stopPropagation();
                              //   // Handle delete
                              //   setActiveMenu(null);
                              // }}
                              onClick={() => {
                                toast.success('Chat deleted successfully!');
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

            <div className="p-4">
              <h2 className="text-sm font-medium mb-2">Yesterday</h2>
              <ul className="space-y-1">
                {chatGroups.yesterday.map((chat, index) => (
                  <li key={`yesterday-${index}`} className="relative group">
                    <button className="w-full text-left py-2 px-3 rounded hover:bg-[#005163] transition-colors text-sm flex items-center justify-between">
                      <span>{chat}</span>
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
                                // Handle edit
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                                setActiveMenu(null);
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

            <div className="p-4">
              <h2 className="text-sm font-medium mb-2">Previous 7 days</h2>
              <ul className="space-y-1">
                {chatGroups.previous.map((chat, index) => (
                  <li key={`previous-${index}`} className="relative group">
                    <button className="w-full text-left py-2 px-3 rounded hover:bg-[#005163] transition-colors text-sm flex items-center justify-between">
                      <span>{chat}</span>
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
                                // Handle edit
                                setActiveMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-[#005163]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                                setActiveMenu(null);
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
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-[#006A82] flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-400 mr-3 overflow-hidden">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="User avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm">Marvin McKinney</span>
          </div>
        </div>
      </div>
    </>
  );
}
