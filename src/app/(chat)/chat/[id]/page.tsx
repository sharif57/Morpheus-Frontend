

// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { ArrowUp } from "lucide-react";
// import ChatSidebar from "@/components/chat/ChatSidebar";
// import ChatMessage from "@/components/chat/ChatMessage";
// import SearchModal from "@/components/chat/SearchModal";
// import {
//   useAskQuestionMutation,
//   useUserChatsQuery,
// } from "@/Redux/feature/createSession";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }
// interface ChatData {
//   query_text: string;
//   response_text: string;
// }


// export default function Home() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
//   const [sessionId, setSessionId] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // const sessionId = localStorage.getItem("session");

//   // Fetch chat history
//   const { data, isLoading } = useUserChatsQuery(sessionId);

//   const [askQuestion] = useAskQuestionMutation();

//   useEffect(()=>{
//     const sessionIds = localStorage.getItem("session") || "";
//     setSessionId(sessionIds);
//   },[])
//   // console.log(sessionId,'sessionId')

//   // Populate messages from chat history when data is available
//   useEffect(() => {
//     if (data?.data) {
//       const chatHistory = data.data
//         .map((chat: ChatData) => [
//           { role: "user" as const, content: chat.query_text },
//           { role: "assistant" as const, content: chat.response_text },
//         ])
//         .flat();
//       setMessages(chatHistory);
//       setShowWelcomeMessage(false);
//     }
//   }, [data]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     // Add user message to state
//     const userMessage = { role: "user" as const, content: inputValue.trim() };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue(""); // Clear input immediately
//     setShowWelcomeMessage(false);

//     try {
//       // Send user message to the server
//       const response = await askQuestion({
//         session_id: sessionId,
//         question: inputValue.trim(),
//       }).unwrap();

//       // Add server response to messages
//       if (response?.response_text) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant" as const, content: response.response_text },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant" as const,
//           content: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     }
//   };

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
//           className="md:hidden absolute top-4 left-4 z-10"
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
//             {isLoading ? (
//               <div className="text-center">Loading chat history...</div>
//             ) : (
//               messages.map((message, index) => (
//                 <ChatMessage key={`${message.role}-${index}`} message={message} />
//               ))
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         )}

//         <div className="p-4">
//           <form onSubmit={handleSubmit} className="relative">
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               placeholder="Ask me anything about business..."
//               className="w-full bg-[#006A82] text-white placeholder-[#B0EBF9] rounded-md lg:py-9 py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#33CDF0]"
//             />
//             <button
//               type="submit"
//               disabled={!inputValue.trim()}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 mr-2 rounded-full bg-[#0088A8] text-[#005163] hover:bg-opacity-80 transition-colors disabled:opacity-50"
//             >
//               <ArrowUp className="h-4 w-4 text-white" />
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

'use client';
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

interface ChatData {
  query_text: string;
  response_text: string;
}


export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch chat history
  const { data, isLoading: isChatHistoryLoading } = useUserChatsQuery(sessionId);

  const [askQuestion, { isLoading: isAskQuestionLoading }] = useAskQuestionMutation();

  useEffect(() => {
    const sessionIds = localStorage.getItem("session") || "";
    setSessionId(sessionIds);
  }, []);

  // Populate messages from chat history when data is available
  useEffect(() => {
    if (data?.data) {
      const chatHistory = data.data
        .map((chat: ChatData) => [
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

    // Add a placeholder assistant message to show loading
    setMessages((prev) => [
      ...prev,
      { role: "assistant" as const, content: "" },
    ]);

    try {
      // Send user message to the server
      const response = await askQuestion({
        session_id: sessionId,
        question: inputValue.trim(),
      }).unwrap();

      // Replace the placeholder with the actual response
      if (response?.response_text) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant" as const, content: response.response_text },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
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
              <p className="text-xl sm:text-2xl lg:text-[33px] text-[#33CDF0] font-medium font-[montserrat]">
                Hello! Ask me about business growth, leadership, or strategy
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
            {isChatHistoryLoading ? (
              <div className="text-center text-sm sm:text-base">
                Loading chat history...
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage
                  key={`${message.role}-${index}`}
                  message={message}
                  isLoading={
                    isAskQuestionLoading &&
                    message.role === "assistant" &&
                    index === messages.length - 1
                  }
                />
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
              className="w-full bg-[#006A82] text-white placeholder-[#B0EBF9] rounded-md py-4 sm:py-6 lg:py-9 pl-4  pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#33CDF0]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isAskQuestionLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 mr-2 rounded-full bg-[#0088A8] text-[#005163] hover:bg-opacity-80 transition-colors disabled:opacity-50"
            >
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
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