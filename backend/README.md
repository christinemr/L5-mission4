# Welcome to **Mission 4**

## Overview

Tina is a conversational AI assistant designed to help users choose the most suitable car insurance policy based on their vehicle details and preferences. Built with Node.js, Express, and the Google Gemini API, Tina guides users through a dynamic Q&A flow and delivers personalized insurance recommendations.

What Tina does:

- Introduces herself and asks for user consent before collecting personal details.
- Asks follow-up questions dynamically based on user responses (not hardcoded).
- Recommends one or more insurance products with clear reasoning.
- Adheres to business rules and avoids direct product selection questions.
- Handles edge cases like unclear vehicle types or user refusal gracefully.

#### Tech Stack

- Node & Express.js
- Google Gemini API
- dotenv for environment config
- CORS middleware for frontend integration

#### Setup Instruction:

**Install dependencies**

```bash
npm install
```

**Configure environment variables**

1. Copy the example file (.env.example)
2. Edit .env and set your Gemini API key

**Getting started**

```
npm run dev
```

---
