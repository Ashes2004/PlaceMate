// app/api/gemini/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const { message, context } = await request.json();

  if (!message) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set");
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    });

    const prompt =
      `${context || 'You are a helpful placement assistant specializing in job placements, resume building, coding challenges, and career guidance. Provide practical, actionable advice.'}\n\nUser: ${message}`;

    const result = await chat.sendMessage(prompt);
    const geminiResponse = await result.response;
    const text = geminiResponse.text();

    return Response.json({ response: text });
  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return Response.json({ error: "Failed to generate response", details: error.message }, { status: 500 });
  }
}
