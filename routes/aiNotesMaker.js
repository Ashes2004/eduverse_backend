import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
const router = express.Router();
const apiKey = "AIzaSyAnAcnLmoJdyUnvcFtbp6C2EpHeBXEXtDI";
const genAI = new GoogleGenerativeAI(apiKey);

router.post("/notesmaker", async (req, res) => {
  console.log("API key: ", apiKey);
  const { message } = req.body;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: `
      You are an assistant that generates detailed notes on a given topic. The notes should be well-organized, clear, and easy to understand. 
      The notes should include:
      1. **Content Heading**: A clear title for the topic.
      2. **Content**: A detailed explanation with key points, examples, and any other relevant information.
      3. **Possible questions and answers**
      The notes should be structured in a JSON format with the following keys:
      {
        "heading": "<Topic Heading>",
        "content": "<Detailed Explanation of the Topic>",
        "questions" : "<questionswithanswers>
      }
      Ensure that the explanation is comprehensive and covers the main aspects of the topic.
    `,
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [{ role: "user", parts: [{ text: message }] }],
  });

  try {
    const result = await chatSession.sendMessage(message);
    const response = JSON.parse(result.response.text());
    res.json(response);
  } catch (error) {
    console.error("Error generating response: ", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

export default router;
