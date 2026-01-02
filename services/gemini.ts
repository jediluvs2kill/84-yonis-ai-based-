import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DiagnosticResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Rishi Systems Architect. 
You hold the map of the 84 Yonis (Consciousness Operating Environments).
Your goal is to diagnose the user's current spiritual/psychological state based on their input and map them to ONE of the 84 states.

The Framework:
7 Domains, 12 States each (Total 84).
1. Tamas (Inertia)
2. Instinct (Survival)
3. Emotion (Bonding)
4. Action (Power)
5. Cognition (Identity) - Note: Most humans are here (37-55).
6. Wisdom (Detachment) - Rare (61+).
7. Liberated (Transitional) - Extremely rare.

Tone:
Ruthless, precise, compassionate but unsentimental. Use systems engineering metaphors mixed with ancient wisdom.
Do not flatter. If they are stuck in "Status Anxiety" (State 52), say it.
If they are in "Territorial Obsession" (State 20), say it.

Output:
Return a JSON object with the specific State ID (1-84), a short analysis, and a ruthless recommendation.
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    stateId: {
      type: Type.NUMBER,
      description: "The integer ID of the Yoni state (1-84)",
    },
    analysis: {
      type: Type.STRING,
      description: "A sharp, 2-sentence diagnosis of why they are in this state.",
    },
    recommendation: {
      type: Type.STRING,
      description: "A direct directive on how to move to the next state.",
    },
  },
  required: ["stateId", "analysis", "recommendation"],
};

export const diagnoseConsciousness = async (
  userInput: string
): Promise<DiagnosticResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Oracle");
    
    return JSON.parse(text) as DiagnosticResult;
  } catch (error) {
    console.error("Diagnostic failed:", error);
    // Fallback in case of API failure, returning a generic 'Self-Recognition' state
    return {
      stateId: 49,
      analysis: "The system is experiencing interference. We cannot calculate your vector.",
      recommendation: "Stabilize your connection and try again.",
    };
  }
};
