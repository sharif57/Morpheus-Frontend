

// "use client";

// import { marked } from "marked";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// interface MessageProps {
//   message: {
//     role: "user" | "assistant";
//     content: string;
//   };
//   isLoading?: boolean;
// }

// export default function ChatMessage({ message, isLoading = false }: MessageProps) {
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     if (message.role === "assistant") {
//       if (isLoading) {
//         setIsTyping(true);
//       } else {
//         setIsTyping(false);
//       }
//     }
//   }, [message.role, isLoading]);

//   if (message.role === "user") {
//     return (
//       <div className="mb-4 max-w-3xl ml-auto">
//         <div className="bg-[#006A82] text-white p-3 rounded-lg">
//           <p>{message.content}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-6 max-w-4xl">
//       <div className="p-4 rounded-lg flex  items-start space-x-2">
//         <Image
//           src="/logo.svg"
//           alt="assistant"
//           width={40}
//           height={40}
//           className="w-10 h-10 rounded-full mb-2"
//         />
//         {isTyping ? (
//           <div className="flex space-x-2 items-center">
//             <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
//             <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse delay-75"></div>
//             <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
//           </div>
//         ) : (
//           <div
//             className="prose prose-invert max-w-none  "
//             dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { marked } from "marked";
import Image from "next/image";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  isLoading?: boolean;
}

export default function ChatMessage({ message, isLoading = false }: MessageProps) {
  if (message.role === "user") {
    return (
      <div className="mb-4 max-w-3xl ml-auto px-2 sm:px-4">
        <div className="bg-[#006A82] text-white p-3 rounded-lg text-sm sm:text-base">
          <p>{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 max-w-4xl px-2 sm:px-4">
      <div className="p-4 rounded-lg flex items-start space-x-2 sm:space-x-4">
        <Image
          src="/logo.svg"
          alt="Assistant avatar"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
        />
        {isLoading ? (
          <div
            className="flex items-center space-x-1 sm:space-x-2"
            aria-live="polite"
            aria-label="Assistant is typing"
          >
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#33CDF0] animate-pulse"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#33CDF0] animate-pulse delay-100"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#33CDF0] animate-pulse delay-200"></div>
          </div>
        ) : (
          <div
            className="prose prose-invert max-w-none text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
          />
        )}
      </div>
    </div>
  );
}