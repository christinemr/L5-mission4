import React, { useState, useRef, useEffect } from "react";
import ChatBotLogo from "./ChatBotLogo";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

export default function ChatBox({ onClose }) {
  const [chatHistory, setChatHistory] = useState([]); // store transcripts
  const bottomRef = useRef(null); // scroll to the bottom

  // scroll to bottom whenever chatHistory updates / think of new msg
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // handles backend call to generate Tina's response
  const generateTinasResponse = async (history) => {
    console.log(history);
    try {
      // extract latest user message from history
      const latestUserMessage = history
        // create new array containing only msg sent by user. and filters out Tina's reply.
        .filter((h) => h.role === "user")
        // removes and return the last msg from this filtered aray
        // the n use optional chaining to access .text property
        .pop()?.text;

      if (!latestUserMessage) {
        throw new Error("No user message found.");
      }

      // send msg to backend API using fetch
      const res = await fetch("http://localhost:3000/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: latestUserMessage }),
      });

      const data = await res.json();
      // error handling
      if (!res.ok)
        throw new Error(
          data.error.message || "Something not quite right here. "
        );

      console.log(data);
      return data.reply;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // ---- CHATBOX CONTAINER ----
    <div>
      {/* pop up */}
      <div className="flex flex-col h-[600px] bg-white w-150 rounded-3xl shadow-2xl overflow-hidden">
        {/* ---- CHATBOX HEADER ---- */}
        <div className="flex relative items-center justify-between bg-fuchsia-600 text-white py-4 px-6">
          {/* header info */}
          <div className="flex items-center gap-[10px] ">
            {/* Tina's avatar */}
            <ChatBotLogo />
            <h2 className="font-extrabold text-xl">
              Tina - The Turner's Chatbot
            </h2>
          </div>
          <button
            onClick={onClose}
            className="btn btn-md text-xl btn-circle btn-ghost absolute right-2 top-2 hover:bg-fuchsia-200"
          >
            x
          </button>
        </div>

        {/* ---- CHATBOX BODY ---- */}
        <div className="flex-grow gap-[5px] overflow-y-auto py-4 px-6 scroll-smooth">
          {/* message - bot message */}
          <div className="flex items-center gap-[11px] max-w-[75%] px-2 py-2 text-sm ">
            <div className="py-2 px-2 bg-indigo-300 rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px] text-white ">
              <p className="break-words whitespace-pre-line">
                Hi! How can I help you today?
              </p>
            </div>
          </div>

          {/* renders dynamic chat history */}
          {chatHistory.map((chat, index) => {
            return <ChatMessage key={index} chat={chat} />;
          })}
          {/* scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* CHATBOX FOOTER */}
        <div className="bg-white pt-[15px] pr-[22px] pb-[20px] pl-[22px]">
          {/* passing setChatHistory as a prop */}
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateTinasResponse={generateTinasResponse}
          />
        </div>
      </div>
    </div>
  );
}

// pseudo:
// Display Turner's company logo. when clicked, it will conditionally render a chatbox.
// in the chatbox, Tina's name will appear on the header and on the right, there is a downward icon to minimise the chatbox.
// Tina's first sentence is hardcoded. " *inserts first sentence* "
// there will be message bubbles displaying on either left or right depending on if it's user or Tina's response
// loading icon when Tina is thinking
// message input box located on the bottom of the chatbox, allowing user to input their question.
// theme colour - blue
