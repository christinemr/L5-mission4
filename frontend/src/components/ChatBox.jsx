import React from "react";
import ChatBotLogo from "./ChatBotLogo";
import ChatForm from "./ChatForm";

export default function ChatBox() {
  return (
    // chatbox container
    <div>
      {/* chatbox pop up */}
      <div className="relative bg-white w-150 rounded-3xl shadow-2xl overflow-hidden">
        {/* CHATBOX HEADER */}
        <div className="relative flex items-center justify-between bg-fuchsia-600 text-white py-4 px-6">
          {/* header info */}
          <div className="flex items-center gap-[10px] ">
            {/* Tina's profile pic */}
            <ChatBotLogo />
            <h2 className="font-extrabold text-xl">
              Tina - The Turner's Chatbot
            </h2>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-fuchsia-200">
            x
          </button>
        </div>

        {/* CHATBOX BODY */}
        <div className="flex  flex-col gap-[20px] h-150 overflow-y-auto py-4 px-6">
          {/* message - bot message */}
          <div className="flex items-center gap-[11px] max-w-[75%] px-2 py-2 ">
            <div className="py-2 px-2 bg-indigo-300 rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px text-white ">
              <p className="break-words white-space: pre-line">
                Hi! How can I help you today? Lemme tell you something about
                weather forecast.
              </p>
            </div>
          </div>

          {/* message - user's message */}
          <div className="flex flex-col items-end gap-[11px] px-2 py-2 ">
            <div className="py-2 px-2 bg-indigo-100 rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] max-w-[75%] ">
              <p className="break-words white-space: pre-line">
                Test test this is user's reply Test test this is user's reply
                Test test this is user's reply Test test this is user's reply
              </p>
            </div>
          </div>
        </div>

        {/* CHATBOX FOOTER */}
        <div className="absolute bottom-0 w-[100%] bg-white pt-[15px] pr-[22px] pb-[20px] pl-[22px]">
          <ChatForm />
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
