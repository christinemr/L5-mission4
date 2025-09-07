"use strict";
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

// load env variables
require("dotenv").config();

// load API key from .env
const API_KEY = process.env.GEMINI_API_KEY;

// middleware
app.use(cors({ origin: "http://localhost:5173" }));

// init Gemini client
const generativeAI = new GoogleGenerativeAI(API_KEY);
const model = generativeAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// define Tina's persona //
async function generateTinaReply(prompt) {
  const response = await model.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
    config: {
      systemInstruction: "You are Tina, a playful but helpful cat assistant.",
    },
  });
  return response.response.text();
}

// endpoint
app.post("/recomendation", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
