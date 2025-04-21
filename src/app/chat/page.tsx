"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessage from "@/components/chat/ChatMessage";
import SearchModal from "@/components/chat/SearchModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Ask me about business growth, leadership, or strategy",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Hide welcome message when user sends a message
    setShowWelcomeMessage(false);

    // Add user message
    const userMessage = { role: "user" as const, content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      if (
        inputValue.toLowerCase().includes("strategy") ||
        inputValue.toLowerCase().includes("startup")
      ) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `
              <h2>1. Customer-Centric Growth</h2>
              <p>Focusing on customer needs is one of the most effective strategies for growing a startup. Understanding their needs, pain points, and desires can help you develop a product or service that resonates with them, ensuring long-term growth. A customer-centric strategy involves:</p>
              <ul>
                <li><strong>Regular Feedback Loops:</strong> Continuously gather feedback through surveys, interviews, and user reviews to understand what your customers value most. This allows you to improve your product based on real-world usage and stay ahead of your competitors.</li>
                <li><strong>Personalization:</strong> Tailor your product, services, and marketing to meet the unique needs of your target audience. The more personalized the experience, the more likely customers will remain loyal and advocate for your brand.</li>
                <li><strong>Customer Support Excellence:</strong> Providing exceptional customer support helps build trust and loyalty. This can lead to repeat business and positive word-of-mouth referrals.</li>
              </ul>
              
              <h2>2. Lean Startup Approach</h2>
              <p>The Lean Startup methodology is widely used by entrepreneurs to reduce waste, optimize resources, and improve product-market fit. It involves:</p>
              <ul>
                <li><strong>Build-Measure-Learn Cycle:</strong> Start by creating a minimum viable product (MVP) — the simplest version of your product that you can use to start gathering feedback about customer needs. Once your MVP is out, measure how it performs, learn from your results, and iterate on the product.</li>
                <li><strong>Pivot or Persevere:</strong> Based on the feedback and data from your MVP, decide whether to pivot (change direction) or persevere (continue on this same path). This approach minimizes risk by validating assumptions before investing heavily in product development.</li>
              </ul>
              
              <h2>3. Developing a Strong Marketing Strategy</h2>
              <p>Marketing plays a critical role in startup growth. A robust marketing strategy helps you build brand awareness, generate leads, and create customer loyalty. Consider these key aspects of an effective startup marketing strategy:</p>
            `,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I can help with that! What specific aspects of this topic would you like to explore further?",
          },
        ]);
      }
    }, 1000);
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
      <div className=" lg:w-[947px]  mx-auto flex flex-col h-full relative">
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
          <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar" >
            {messages.slice(1).map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="p-4 ">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about business..."
              className="w-full bg-[#006A82] text-white placeholder-[#B0EBF9] rounded-md lg:py-9  py-4 pl-4 pr-12  focus:outline-none focus:ring-2 focus:ring-[#33CDF0]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#0088A8] text-[#005163] hover:bg-opacity-80 transition-colors"
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
