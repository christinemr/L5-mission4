import React from "react";
import { useState } from "react";
import ChatBox from "./ChatBox";

export default function LogoButton() {
  const [showchat, setShowChat] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {!showchat && (
        <img
          src="./images/tinaTurner.png"
          alt="tina-turner"
          className="cursor-pointer w-100"
          onClick={() => setShowChat(true)}
        />
      )}

      {showchat && <ChatBox onClose={() => setShowChat(false)} />}
    </div>
  );
}
