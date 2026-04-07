import { useState, useRef } from "react";
import { 
  Bot, Video, ImagePlus, Loader2, CheckCircle, 
  AlertCircle, Zap, ShieldCheck, ChevronRight, 
  Activity, Utensils, MessageSquare, Sparkles
} from "lucide-react";
import { aiService } from "../services/aiService";

/**
 * CoachTab - The AI Powerhouse of FitTracker 30
 */
export function CoachTab({ addXp }) {
  const [activeMode, setActiveMode] = useState("form"); // 'form' or 'nutrition'
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states
    setLoading(true);
    setError(null);
    setReport(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      let result;
      if (activeMode === "form") {
        result = await aiService.analyzeForm(file);
      } else {
        result = await aiService.analyzeNutrition(file);
      }
      setReport(result);
      addXp(50); // Reward for using AI Coaching
    } catch (err) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const handleDemo = () => {
    setLoading(true);
    setError(null);
    setReport(null);
    setPreview(null);
    
    // Simulate thinking/scanning time
    setTimeout(() => {
      if (activeMode === "form") {
        setReport({
          exerciseName: "סקוואט עם מוט (Back Squat)",
          formScore: 88,
          coachAdvice: "העומק שלך ברמה מקצועית, אבל התמקד בשמירה על חזה מורם בזמן העלייה.",
          criticalCorrections: [
             "שמור על עמוד שדרה ניטרלי (אל תסתכל למעלה)",
             "דחף דרך מרכז כף הרגל, לא מהבהונות",
             "שליטה מעט מהירה יותר בירידה (אקסצנטרי)"
          ],
          strengths: [
             "טווח תנועה מלא",
             "ציר ירך (Hip Hinge) מצוין"
          ]
        });
      } else {
        setReport({
          mealName: "קערת סלמון בגריל וקינואה",
          estimatedMacros: { calories: 640, protein: "45g", carbs: "38g", fats: "22g" },
          ingredients: ["פילה סלמון", "קינואה", "אבוקדו", "בייבי תרד"],
          nutritionistVerdict: "זוהי ארוחת התאוששות ברמה הגבוהה ביותר. עשירה באומגה 3 וחלוקת חלבון מושלמת לבניית שריר."
        });
      }
      setLoading(false);
      addXp(50);
    }, 3000);
  };

  const resetAnalysis = () => {
    setReport(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 space-y-6 pb-20 tab-enter">
      {/* AI Header */}
      <div className="glass-card rounded-3xl p-6 border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-gray-950 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
            <Bot className="w-24 h-24 text-blue-400" />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <div className="bg-blue-500/20 p-2 rounded-xl">
                  <Bot className="w-6 h-6 text-blue-400" />
               </div>
               <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em]">Neural Coach v1.5</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">מאמן אישי AI</h2>
            <p className="text-gray-400 text-sm max-w-[240px]">קבל משוב מקצועי בזמן אמת על הטכניקה והארוחות שלך.</p>
         </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 p-1 bg-gray-900/60 rounded-2xl border border-gray-800/50">
        <button
          onClick={() => { setActiveMode("form"); resetAnalysis(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeMode === "form" ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "text-gray-500 hover:text-gray-300"}`}
        >
          <Video className="w-4 h-4" /> ניתוח אימון
        </button>
        <button
          onClick={() => { setActiveMode("nutrition"); resetAnalysis(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeMode === "nutrition" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40" : "text-gray-500 hover:text-gray-300"}`}
        >
          <Utensils className="w-4 h-4" /> ניתוח תזונה
        </button>
      </div>

      {/* Upload / Analysis Area */}
      {!report && !loading && (
        <div className="space-y-4">
          <div 
            onClick={triggerUpload}
            className="glass-card rounded-3xl border-2 border-dashed border-gray-700/50 p-12 text-center hover:border-blue-500/50 transition-all cursor-pointer bg-gray-900/20 group"
          >
            <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              {activeMode === "form" ? <Video className="w-8 h-8 text-blue-400" /> : <ImagePlus className="w-8 h-8 text-emerald-400" />}
            </div>
            <div className="text-white font-bold text-lg mb-1">
              העלה {activeMode === "form" ? "וידאו של אימון" : "תמונה של ארוחה"}
            </div>
            <p className="text-gray-500 text-sm">הקש כאן כדי לבחור {activeMode === "form" ? "קליפ" : "תמונה"}</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept={activeMode === "form" ? "video/*" : "image/*"} 
              className="hidden" 
            />
          </div>

          <button 
            onClick={handleDemo}
            className="w-full py-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-400 font-black uppercase tracking-widest text-xs hover:bg-blue-600/20 transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" /> 
            נסה דמו בשידור חי
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="glass-card rounded-3xl p-10 text-center border border-blue-500/20 overflow-hidden relative">
          {/* Scanning Animation */}
          <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-scan" />
          
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <div className="text-white font-black text-xl mb-1 uppercase tracking-tighter">מנתח מסלול תנועה...</div>
          <div className="text-gray-500 text-sm">מזהה נקודות פוקוס ביומכניות...</div>
          
          {preview && activeMode === "nutrition" && (
             <img src={preview} className="mt-6 rounded-2xl w-full aspect-square object-cover opacity-30 grayscale blur-[2px]" alt="Analyzing" />
          )}
          {preview && activeMode === "form" && (
             <div className="mt-6 rounded-2xl w-full aspect-video bg-gray-800 animate-pulse border border-gray-700 overflow-hidden relative">
                <Video className="absolute inset-0 m-auto w-12 h-12 text-gray-700" />
             </div>
          )}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-950/30 border border-red-500/50 rounded-2xl p-5 flex gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <div className="text-red-400 font-bold mb-1">הניתוח נכשל</div>
            <p className="text-red-300/80 text-sm leading-relaxed">{error}</p>
            <button onClick={resetAnalysis} className="mt-3 text-red-400 text-xs font-black uppercase underline">נסה שוב</button>
          </div>
        </div>
      )}

      {/* Analysis Report */}
      {report && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header Card */}
          <div className="glass-card rounded-3xl p-5 border border-gray-700/50 overflow-hidden relative">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1">
                     {activeMode === "form" ? "הערכת טכניקה" : "ביקורת תזונתית"}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                     {activeMode === "form" ? report.exerciseName : report.mealName}
                  </h3>
               </div>
               <div className="bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/40 text-blue-400 text-sm font-black">
                  +50 XP
               </div>
            </div>

            {activeMode === "form" && (
               <div className="mb-6 flex items-center gap-6">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90">
                        <circle cx="48" cy="48" r="38" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-gray-800" />
                        <circle cx="48" cy="48" r="38" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={238} strokeDashoffset={238 - (238 * report.formScore) / 100} className="text-blue-500" />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-black text-white">{report.formScore}</span>
                     </div>
                  </div>
                  <div className="flex-1">
                     <div className="text-gray-400 text-xs font-bold uppercase mb-1">ציון טכניקה כללי</div>
                     <p className="text-gray-300 text-sm font-medium italic">"{report.coachAdvice}"</p>
                  </div>
               </div>
            )}

            {activeMode === "nutrition" && (
               <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                     { label: "קלוריות", val: report.estimatedMacros.calories, color: "text-blue-400" },
                     { label: "חלבון", val: report.estimatedMacros.protein, color: "text-emerald-400" },
                     { label: "פחמימות", val: report.estimatedMacros.carbs, color: "text-amber-400" },
                     { label: "שומנים", val: report.estimatedMacros.fats, color: "text-rose-400" },
                  ].map(m => (
                     <div key={m.label} className="bg-gray-900/60 rounded-xl p-2 text-center border border-gray-800">
                        <div className={`text-xs font-black ${m.color}`}>{m.val}</div>
                        <div className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{m.label}</div>
                     </div>
                  ))}
               </div>
            )}

            <div className="space-y-4">
               <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-black uppercase tracking-widest mb-2">
                     <CheckCircle className="w-3 h-3 text-emerald-400" /> 
                     {activeMode === "form" ? "נקודות חוזקה" : "רכיבים מרכזיים"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {(activeMode === "form" ? report.strengths : report.ingredients).map(item => (
                        <span key={item} className="bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-[10px] font-bold px-2 py-1 rounded-lg uppercase">
                           {item}
                        </span>
                     ))}
                  </div>
               </div>

               <div className="bg-gray-950/50 rounded-2xl p-4 border border-blue-900/30">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-widest mb-2">
                     <Sparkles className="w-3 h-3" /> 
                     {activeMode === "form" ? "תיקונים קריטיים" : "סיכום המומחה"}
                  </div>
                  {activeMode === "form" ? (
                     <ul className="space-y-2">
                        {report.criticalCorrections.map((point, idx) => (
                           <li key={idx} className="flex gap-2 text-sm text-gray-300 line-clamp-2">
                              <span className="text-blue-500 font-black">•</span>
                              {point}
                           </li>
                        ))}
                     </ul>
                  ) : (
                     <p className="text-gray-300 text-sm leading-relaxed italic">"{report.nutritionistVerdict}"</p>
                  )}
               </div>
            </div>

            <button 
               onClick={resetAnalysis}
               className="w-full mt-6 py-4 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-2xl font-black uppercase tracking-widest transition-all text-xs"
            >
               נתח סשן נוסף
            </button>
          </div>
        </div>
      )}

      {/* Safety Reminder */}
      <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 flex gap-3">
         <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
         <div>
            <div className="text-amber-400 font-bold text-sm mb-1 uppercase tracking-tighter">פרוטוקול בטיחות</div>
            <p className="text-gray-500 text-xs leading-relaxed">
               ניתוח AI הוא המלצה בלבד. תמיד תן עדיפות לתחושת הגוף שלך. אם משהו מרגיש כואב, הפסק מיד. עקרון הצוואר הניטרלי תקף תמיד.
            </p>
         </div>
      </div>
    </div>
  );
}
