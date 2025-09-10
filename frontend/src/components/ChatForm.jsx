import React from "react";

export default function ChatForm() {
  return (
    <div>
      <form
        action="#"
        className="flex item-center bg-white outline outline-2 outline-violet-400 rounded-xl"
      >
        <input
          type="text"
          placeholder="enter your message here."
          required
          className="border-none outline-none bg-none w-[100%] h-[45px] py-0 px-[17px]"
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
