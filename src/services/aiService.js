import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * AI Service for FitTracker 30
 * Focuses on Form Analysis (Video) and Nutrition Analysis (Image)
 */
export const aiService = {
  /**
   * Analyzes an exercise video for form corrections.
   */
  async analyzeForm(videoFile) {
    if (!API_KEY || API_KEY.includes("YOUR_FREE_GEMINI_API_KEY_HERE")) {
      console.warn("Using demo data: No valid API key found.");
      return new Promise(resolve => setTimeout(() => resolve({
        exerciseName: "סקוואט עם מוט (Back Squat)",
        formScore: 88,
        coachAdvice: "העומק שלך ברמה מקצועית, אבל התמקד בשמירה על חזה מורם בזמן העלייה.",
        criticalCorrections: ["שמור על עמוד שדרה ניטרלי (אל תסתכל למעלה)", "דחף דרך מרכז כף הרגל, לא מהבהונות", "שליטה מעט מהירה יותר בירידה (אקסצנטרי)"],
        strengths: ["טווח תנועה מלא", "ציר ירך (Hip Hinge) מצוין"]
      }), 2500));
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Data = await fileToGenerativePart(videoFile);

    const prompt = `
      You are an expert HIIT and Strength Training Coach. 
      Analyze this workout video for form assessment. 
      Provide a structured JSON response in HEBREW (עברית).
      The response must be in Hebrew entirely.
      - exerciseName: The exercise identified in Hebrew.
      - formScore: 0-100.
      - criticalCorrections: Array of strings of what to fix (max 3), in Hebrew.
      - strengths: Array of strings of what was done well (max 2), in Hebrew.
      - coachAdvice: A short, motivating 1-sentence tip, in Hebrew.
      
      Focus as a coach on safety (especially neutral neck and controlled tempo).
    `;

    try {
      const result = await model.generateContent([prompt, base64Data]);
      const response = await result.response;
      const text = response.text();
      const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("AI Analysis Error:", error);
      throw error;
    }
  },

  /**
   * Analyzes a food photo for macros and nutritional verdict.
   */
  async analyzeNutrition(imageFile) {
    if (!API_KEY || API_KEY.includes("YOUR_FREE_GEMINI_API_KEY_HERE")) {
      console.warn("Using demo data: No valid API key found.");
      return new Promise(resolve => setTimeout(() => resolve({
        mealName: "קערת סלמון בגריל וקינואה",
        estimatedMacros: { calories: 640, protein: "45g", carbs: "38g", fats: "22g" },
        ingredients: ["פילה סלמון", "קינואה", "אבוקדו", "בייבי תרד"],
        nutritionistVerdict: "זוהי ארוחת התאוששות ברמה הגבוהה ביותר. עשירה באומגה 3 וחלוקת חלבון מושלמת לבניית שריר."
      }), 2500));
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Data = await fileToGenerativePart(imageFile);

    const prompt = `
      You are a Certified Clinical Nutritionist. 
      Analyze this food photo and provide a nutritional breakdown.
      Provide a structured JSON response in HEBREW (עברית).
      The response must be in Hebrew entirely.
      - mealName: Short name for the dish in Hebrew.
      - estimatedMacros: { calories: number, protein: string, carbs: string, fats: string }. (Values like '45g' are fine as is).
      - ingredients: Array of identified main ingredients in Hebrew.
      - nutritionistVerdict: A short professional tip on how to improve this meal for a fitness goal, in Hebrew.
    `;

    try {
      const result = await model.generateContent([prompt, base64Data]);
      const response = await result.response;
      const text = response.text();
      const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("AI Nutrition Analysis Error:", error);
      throw error;
    }
  }
};

/**
 * Helper to convert file to Google AI format
 */
async function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type
        }
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
