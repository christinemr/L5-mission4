import React, { useRef } from "react";

export default function ChatForm({
  chatHistory,
  setChatHistory,
  generateTinasResponse,
}) {
  const inputRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";
    console.log(userMessage);

    // Add user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add "thinking..." placeholder
    const thinkingIndex = chatHistory.length + 1;
    setChatHistory((history) => [
      ...history,
      { role: "model", text: "thinking..." },
    ]);

    // Await Tina's response
    const tinaReply = await generateTinasResponse([
      ...chatHistory,
      { role: "user", text: userMessage },
    ]);

    // Replace "thinking..." with actual reply
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
