import React, { useRef } from "react";

// handle user's input and triggers Tina's response
export default function ChatForm({
  chatHistory,
  setChatHistory,
  generateTinasResponse,
}) {
  const inputRef = useRef(); // useRef to access the DOM / input field directly

  // handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = ""; // clear input field
    console.log(userMessage); // see input msg

    // Add user message to chat history
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // placeholder whilst Tina's thinking
    const thinkingIndex = chatHistory.length + 1;
    setChatHistory((history) => [
      ...history,
      { role: "model", text: "thinking..." },
    ]);

    // call backend to generate Tina's response
    const tinaReply = await generateTinasResponse([
      ...chatHistory,
      { role: "user", text: userMessage },
    ]);

    // Replace "thinking..." placeholder with Tina's actual reply
    // Use functional state update to ensure latest chat history
    // store previous chat history into a new variable to avoid mutating React state directly
    setChatHistory((prev) => {
      const updated = [...prev];
      updated[thinkingIndex] = { role: "model", text: tinaReply };
      return updated;
    });
  };

  return (
    <div>
      <form
        action="#"
        className="flex items-center bg-white outline outline-2 outline-violet-400 rounded-xl"
        onSubmit={handleFormSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="enter your message here."
          required
          className="border-none outline-none bg-none w-[100%] h-[45px] text-sm py-0 px-[17px]"
        />
        <button
          type="submit"
          className="btn px-[10px] py-2 bg-violet-400 border-none font-inter w-[80px] h-[50px] shadow-none text-black rounded-tr-xl rounded-br-xl text-sm hover:text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
