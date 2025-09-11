import React from "react";

export default function ChatMessage({ chat }) {
  console.log("ChatMessage received:", chat); // debugging - incoming / outgoing message
  return (
    <div className="flex flex-col items-end gap-[11px] px-2 py-2 ">
      <div
        // render styled message bubble based on the role (user OR tina)
        className={`py-2 px-2 rounded-tl-[18px] rounded-tr-[18px] max-w-[75%] text-sm ${
          // if role = Tina, render darker shade of indigo and align self start
          chat.role === "model"
            ? "bg-indigo-300 rounded-br-[18px] text-white self-start"
            : "bg-indigo-100 rounded-bl-[18px] text-black self-end"
        }`}
      >
        {/* clean wrapping and line breaks  */}
        <p className="break-words whitespace-pre-line">{chat.text}</p>
      </div>
    </div>
  );
}
