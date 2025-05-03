/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { ArrowUp } from "lucide-react";
// import ChatSidebar from "@/components/chat/ChatSidebar";
// import SearchModal from "@/components/chat/SearchModal";
// import { useAskQuestionMutation } from "@/Redux/feature/createSession";
// import { toast } from "sonner";
// import Image from "next/image";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface APIError {
//   data?: {
//     message?: string;
//   };
// }

// export default function Home() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "assistant",
//       content: "Hello! Ask me about business growth, leadership, or strategy",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
//   const [sessionId, setSessionId] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [askQuestion] = useAskQuestionMutation();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     const initializeSession = async () => {
//       try {
//         // Check for existing session in localStorage
//         let session = localStorage.getItem("session");
        
//         // Validate UUID format
//         const isValidUUID = (id: string) => {
//           return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
//         };

//         if (!session || !isValidUUID(session)) {
//           // Generate new session ID if invalid or doesn't exist
//           session = crypto.randomUUID();
//           localStorage.setItem("session", session);
//           console.log("Generated new session ID:", session);
//         }

//         setSessionId(session);
//         console.log("Using session ID:", session);
//       } catch (error) {
//         console.error("Session initialization error:", error);
//         // Fallback to new session if any error occurs
//         const newSession = crypto.randomUUID();
//         localStorage.setItem("session", newSession);
//         setSessionId(newSession);
//       }
//     };

//     initializeSession();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputValue.trim() || !sessionId || isLoading) return;

//     setIsLoading(true);
//     const userMessage = { role: "user" as const, content: inputValue };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setShowWelcomeMessage(false);

//     try {
//       const response = await askQuestion({
//         session_id: sessionId,
//         question: inputValue,
//       }).unwrap();

//       console.log(response, "Response from server:");

//       if (response?.answer) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: response.answer },
//         ]);
//       } else {
//         throw new Error("No answer received from server");
//       }
//     } catch (error: unknown) {
//       console.error("API Error:", error);
      
//       // Type guard for API error
//       const isAPIError = (err: unknown): err is APIError => {
//         return typeof err === 'object' && err !== null && 'data' in err;
//       };

//       // Handle invalid session ID specifically
//       if (isAPIError(error)) {
//         if (error.data?.message === "Invalid session id") {
//           // Generate new session ID
//           const newSessionId = crypto.randomUUID();
//           localStorage.setItem("session", newSessionId);
//           setSessionId(newSessionId);
          
//           setMessages((prev) => [
//             ...prev,
//             { 
//               role: "assistant", 
//               content: "Your session has been refreshed. Please ask your question again." 
//             },
//           ]);
          
//           toast.info("Session refreshed. Please try again.");
//           return;
//         }
//       }

//       // General error handling
//       setMessages((prev) => [
//         ...prev,
//         { 
//           role: "assistant", 
//           content: "Sorry, I encountered an error. Please try again later." 
//         },
//       ]);
      
//       toast.error("Failed to process your question. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     const lastMessage = messages[messages.length - 1];
//     if (lastMessage?.role === "assistant") {
//       setIsTyping(isLoading);
//     }
//   }, [messages, isLoading]);

//   return (
//     <div className="flex h-screen bg-[#005163] text-white font-[montserrat]">
//       {/* Sidebar */}
//       <ChatSidebar
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//         setIsSearchModalOpen={setIsSearchModalOpen}
//       />

//       {/* Main Content */}
//       <div className="lg:w-[947px] mx-auto flex flex-col h-full relative">
//         {/* Mobile menu toggle */}
//         <div
//           className="md:hidden absolute top-4 left-4 z-10 cursor-pointer"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <div className="w-6 h-0.5 bg-white mb-1.5"></div>
//           <div className="w-6 h-0.5 bg-white mb-1.5"></div>
//           <div className="w-6 h-0.5 bg-white"></div>
//         </div>

//         {/* Header */}
//         <div className="h-4"></div>

//         {/* Messages */}
//         {showWelcomeMessage ? (
//           <div className="flex-1 flex items-center justify-center p-4">
//             <div className="text-center">
//               <p className="lg:text-[33px] text-xl text-[#33CDF0] font-medium font-[montserrat]">
//                 Hello! Ask me about business growth, leadership, or strategy
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
//             {messages.slice(1).map((message, index) => (
//               <div key={index} className="mb-6 max-w-4xl">
//                 <div className="p-4 rounded-lg flex lg:items-center items-start space-x-2">
//                   <Image
//                     src="/logo.svg"
//                     alt="assistant"
//                     width={40}
//                     height={40}
//                     className="w-10 h-10 rounded-full mb-2"
//                   />
//                   {isTyping && index === messages.length - 2 ? (
//                     <div className="flex space-x-2 items-center">
//                       <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
//                       <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
//                     </div>
//                   ) : (
//                     <div
//                       className="prose prose-invert max-w-none"
//                       dangerouslySetInnerHTML={{ __html: message.content }}
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         )}

//         {/* Input Form */}
//         <div className="p-4">
//           <form onSubmit={handleSubmit} className="relative">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder="Ask me anything about business..."
//               className="w-full bg-[#006A82] text-white placeholder-[#B0EBF9] rounded-md lg:py-9 py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#33CDF0]"
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               disabled={!inputValue.trim() || isLoading}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 mr-2 rounded-full bg-[#0088A8] text-[#005163] hover:bg-opacity-80 transition-colors disabled:opacity-50"
//             >
//               {isLoading ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//               ) : (
//                 <ArrowUp className="h-4 w-4 text-white" />
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Search Modal */}
//       {isSearchModalOpen && (
//         <SearchModal onClose={() => setIsSearchModalOpen(false)} />
//       )}
//     </div>
//   );
// }


"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessage from "@/components/chat/ChatMessage";
import SearchModal from "@/components/chat/SearchModal";
import {
  useAskQuestionMutation,
  useUserChatsQuery,
} from "@/Redux/feature/createSession";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const sessionId = localStorage.getItem("session");

  // Fetch chat history
  const { data, isLoading } = useUserChatsQuery(sessionId);

  const [askQuestion] = useAskQuestionMutation();

  useEffect(()=>{
    const sessionIds = localStorage.getItem("session") || "";
    setSessionId(sessionIds);
  },[])
  // console.log(sessionId,'sessionId')

  // Populate messages from chat history when data is available
  useEffect(() => {
    if (data?.data) {
      const chatHistory = data.data
        .map((chat: any) => [
          { role: "user" as const, content: chat.query_text },
          { role: "assistant" as const, content: chat.response_text },
        ])
        .flat();
      setMessages(chatHistory);
      setShowWelcomeMessage(false);
    }
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to state
    const userMessage = { role: "user" as const, content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // Clear input immediately
    setShowWelcomeMessage(false);

    try {
      // Send user message to the server
      const response = await askQuestion({
        session_id: sessionId,
        question: inputValue.trim(),
      }).unwrap();

      // Add server response to messages
      if (response?.response_text) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant" as const, content: response.response_text },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-[#005163] text-white font-[montserrat]">
      {/* Sidebar */}
      <ChatSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />

      {/* Main Content */}
      <div className="lg:w-[947px] mx-auto flex flex-col h-full relative">
        {/* Mobile menu toggle */}
        <div
          className="md:hidden absolute top-4 left-4 z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>

        {/* Header */}
        <div className="h-4"></div>

        {/* Messages */}
        {showWelcomeMessage ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="lg:text-[33px] text-xl text-[#33CDF0] font-medium font-[montserrat]">
                Hello! Ask me about business growth, leadership, or strategy
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
            {isLoading ? (
              <div className="text-center">Loading chat history...</div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}`} message={message} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="p-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about business..."
              className="w-full bg-[#006A82] text-white placeholder-[#B0EBF9] rounded-md lg:py-9 py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#33CDF0]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 mr-2 rounded-full bg-[#0088A8] text-[#005163] hover:bg-opacity-80 transition-colors disabled:opacity-50"
            >
              <ArrowUp className="h-4 w-4 text-white" />
            </button>
          </form>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </div>
  );
}