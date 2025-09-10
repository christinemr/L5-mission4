"use strict";
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const promptTina = require("./promptTina");

const app = express();
app.use(express.json());

// load env variables
require("dotenv").config();

// load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;

// middleware
app.use(cors({ origin: "http://localhost:5174" }));

// init Gemini client
const generativeAI = new GoogleGenerativeAI(API_KEY);

// define Gemini model
const model = generativeAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// define Tina's persona //
async function generateTinaReply(userText) {
  const chat = await model.startChat({
    history: [],
    systemInstruction: {
      role: "system",
      parts: [{ text: promptTina }],
    },
  });

  console.log("👉 Sending to Gemini:", userText);
  console.log("Type of userText:", typeof userText);

  const result = await chat.sendMessage(userText);

  return result.response.text();
}

// endpoint
app.post("/recommendation", async (req, res) => {
  // from frontend but update as needed
  const { content } = req.body;
  console.log("Incoming request body:", req.body);
  console.log("Type of content:", typeof content);

  if (!content) {
    console.error("⚠️ missing input!");
    return res.status(400).json({ error: "missing input! Please try again" });
  }

  try {
    // generate AI response & reply
    // sends prompt to Gemini
    const TinasReply = await generateTinaReply(content);
    console.log({ TinasReply });

    // send res to frontend
    res.status(200).json({ reply: TinasReply });
  } catch (error) {
    // error handling
    console.error(
      "❌ error generating recommendation ",
      error.message || error
    );
    res.status(400).json({ error: "⚠️ Failed to generate recommendation" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
