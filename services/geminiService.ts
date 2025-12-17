import { GoogleGenAI } from "@google/genai";
import { PLANS, PROVIDERS } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getGeminiResponse = async (userQuery: string): Promise<string> => {
  const aiInstance = getAI();
  if (!aiInstance) return "I'm sorry, my connection is currently offline (API Key missing).";

  try {
    const context = `
      You are 'SeaBot', a helpful support assistant for SeaCharge, a recharge platform in Southeast Asia.
      We sell:
      - Mobile Top-ups (AIS, TrueMove, DTAC)
      - Utility Bill Payments (MEA, MWA)
      - Game Credits (RoV, PUBG, Genshin)

      Available plans data: ${JSON.stringify(PLANS.map(p => ({ name: p.name, price: p.price, desc: p.description })))}

      User Query: "${userQuery}"

      Your goal is to be helpful, concise, and recommend specific plans if the user asks for advice.
      Keep the tone friendly and professional.
    `;

    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context,
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};