import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const formattedHistory = history.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // add new user message manually or using SDK
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...formattedHistory, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are an expert AI Mentor in an application called Study with Zenith. Your role is to guide students, provide clear explanations, and occasionally challenge them with thought-provoking questions. Always be encouraging, concise, and pedagogical.",
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Mentor API Error:", error);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
