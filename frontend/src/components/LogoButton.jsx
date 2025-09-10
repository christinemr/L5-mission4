import React from "react";
import { useState } from "react";
import ChatBox from "./ChatBox";

export default function LogoButton() {
  const [showchat, setShowChat] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      {!showchat && (
        <img
          src="./images/LogoButton.png"
          alt="logo"
          className="cursor-pointer w-150"
          onClick={() => setShowChat(true)}
        />
      )}

      {showchat && <ChatBox onClose={() => setShowChat(false)} />}
    </div>
  );
}
