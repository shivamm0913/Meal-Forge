import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "WARNING : GEMINI_API_KEY is not set. AI features will not work",
  );
}

const getResponseText = (response) => (response?.text ?? "").trim();

const parseJSONResponse = (responseText) => {
  let cleaned = responseText.trim();
  const match = cleaned.match(/```json\s*([\s\S]*?)\s*```/) || cleaned.match(/(\{[\s\S]*\})/) || cleaned.match(/(\[[\s\S]*\])/);
  if (match) {
    cleaned = match[1];
  }
  return JSON.parse(cleaned.trim());
};

export const generateRecipe = async ({
  ingredients,
  dietaryRestrictions = [],
  cuisine_type = "any",
  servings = 4,
  cookingTime = "medium",
}) => {
  const dietaryInfo =
    dietaryRestrictions.length > 0
      ? `Dietary restrictions : ${dietaryRestrictions.join(", ")}`
      : "No dietary restriction";

  const timeGuide = {
    quick: "under 30 minutes",
    medium: "30-60 minutes",
    long: "over 60 minutes",
  };

  const prompt = `Generate a detailed recipe with the following requirements:
  
  Ingredients available : ${ingredients.join(", ")}
  ${dietaryInfo}
 cuisine_type :${cuisine_type}
  Servings :${servings}
  Cooking time:${timeGuide[cookingTime] || "any"}

  Please provide a complete recipe in the following  JSON format (return ONLY valid JSON , no markdown):
 {
  "name": "Recipe name",
  "description": "Brief description of the dish",
  "cuisine_type": "${cuisine_type}",
  "difficulty": "easy|medium|hard",
  "prepTime": number (in minutes),
  "cookTime": number (in minutes),
  "servings": ${servings},
  "ingredients": [
    {"name": "ingredient name", "quantity": number, "unit": "unit of measurement"}
  ],
  "instructions": [
    "Step 1 description",
    "Step 2 description"
  ],
  "dietaryTags": ["vegetarian", "gluten-free", etc.],
  "nutrition": {
    "calories": number,
    "protein": number (grams),
    "carbs": number (grams),
    "fats": number (grams),
    "fiber": number (grams)
  },
  "cookingTips": ["Tip 1", "Tip 2"]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const generateText = getResponseText(response);
    const recipe = parseJSONResponse(generateText);
    return recipe;
  } catch (error) {
    console.error("Gemini API error : ", error);
    throw new Error("Failed to generate recipe. Please try again");
  }
};

export const generatePantrySuggestions = async (
  pantryItems,
  expiringItems = [],
) => {
  const ingredients = pantryItems.map((item) => item.name).join(", ");
  const expiringNames = expiringItems
    .map((item) => (typeof item === "string" ? item : item?.name))
    .filter(Boolean);
  const expiringText =
    expiringNames.length > 0
      ? `\nPriority ingredients (expiring soon) : ${expiringNames.join(", ")}`
      : "";

  const prompt = `Based on these available ingredients :${ingredients}${expiringText}
      
      Suggest 3 creative recipe ideas that use these ingredients. Return ONLY a JSON array of strings (no markdown): 
      ["Recipe idea 1","Recipe idea 2","Recipe idea 3"]
      
      Each suggestion should be a brief , appetizing description (1-2 sentences).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let generatedText = getResponseText(response);
    const suggestions = parseJSONResponse(generatedText);
    return suggestions;
  } catch (error) {
    console.error("Gemini API error : ", error);
    throw new Error("Failed to generate suggestions");
  }
};

export const generateCookingTips = async (recipe) => {
  const prompt = `For this recipe : "${recipe.name}"
  Ingredients : ${recipe.ingredients?.map((i) => i.name).join(", ") || "N/A"}
  
  Provide 3-5 helpful cooking tips to make this  recipe better. Return ONLY a JSON array of strings (no markdown):
  ["Tip 1", "Tip 2","Tip 3"] 
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let generatedText = getResponseText(response);
    const tips = parseJSONResponse(generatedText);
    return tips;
  } catch (error) {
    console.error("Gemini API error : ", error);
    return ["Cook with love and patience!"];
  }
};

export default {
  generateRecipe,
  generatePantrySuggestions,
  generateCookingTips,
};
