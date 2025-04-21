"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export default function ChatMessage({ message }: MessageProps) {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (message.role === "assistant" && message.content.length > 100) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (message.role === "user") {
    return (
      <div className="mb-4 max-w-3xl ml-auto ">
        <div className="bg-[#006A82] text-white p-3 rounded-lg">
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 max-w-4xl ">
      <div className="bg-[#] p-4 rounded-lg flex lg:items-center items-start space-x-2">
        <Image
          src="/logo.svg"
          alt="assistant"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full mb-2"
        />
        {isTyping ? (
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
          </div>
        ) : (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        )}
      </div>
    </div>
  );
}
