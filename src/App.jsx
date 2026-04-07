// ============================================================
// 30-Day Fitness & Nutrition Tracker
// Omri's Personal Challenge — April 4, 2026
// Stack: React + Tailwind CSS + Lucide-react
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dumbbell, Droplets, CheckCircle, Circle, Timer,
  TrendingUp, Utensils, Play, Pause, RotateCcw,
  Camera, Scale, Flame, AlertTriangle, Activity,
  Target, Award, ChevronRight, Home, Apple,
  BarChart2, RefreshCw, ShieldAlert, Bell, Clock,
  Zap, Heart, ChevronDown, ChevronUp, BookOpen,
  Shield, Star, Trophy, X, Loader2,
  Bot, Settings, ImagePlus, SendHorizonal, Video,
  CheckCheck, MessageSquare, Sparkles
} from "lucide-react";
import { CoachTab } from "./components/CoachTab";

// Motivational quotes for the dashboard
const DAILY_QUOTES = [
  "האימון היחיד שגרוע הוא האימון שלא קרה.",
  "הגוף שלך יכול לעמוד כמעט בהכל. זה המוח שאתה צריך לשכנע.",
  "משמעת היא הבחירה בין מה שאתה רוצה עכשיו לבין מה שאתה רוצה הכי הרבה.",
  "הכאב שאתה מרגיש היום יהיה הכוח שתרגיש מחר.",
  "אל תייחל לזה. תעבוד בשביל זה.",
  "הצלחה מגיעה ברגע שאתה מפסיק לחפש תירוצים.",
  "תדחוף את עצמך, כי אף אחד אחר לא יעשה את זה בשבילך.",
  "דברים גדולים אף פעם לא מגיעים מאזורי נוחות.",
  "זה לא קשור ללהיות הכי טוב. זה קשור ללהיות טוב יותר ממה שהיית אתמול.",
  "ככל שתעבוד קשה יותר, ככה יהיה לך יותר מזל.",
  "תוצאות לוקחות זמן, לא לילה אחד. תתמיד ותראה את הקסם קורה.",
  "תתעורר עם נחישות. תלך לישון עם סיפוק.",
  "אימון של שעה הוא רק 4% מהיום שלך. אין תירוצים.",
  "תהיה חזק יותר מהתירוץ הכי חזק שלך.",
  "זיעה היא רק השומן שבוכה.",
  "תתאהב בתהליך של לטפל בעצמך.",
  "הבריאות שלך היא השקעה, לא הוצאה.",
  "תתאמן בטירוף או שתישאר באותו מקום.",
  "תשאף להתקדמות, לא לשלמות.",
  "הפרויקט הכי טוב שתעבוד עליו הוא אתה.",
  "כל חזרה נחשבת. כל צעד משנה.",
  "תאמין בעצמך ובכל מה שאתה.",
  "שיפורים קטנים בכל יום מובילים לתוצאות מדהימות.",
  "לא הגעת עד כאן רק כדי להגיע עד כאן.",
  "תילחם על השריר הזה!",
  "אלופים ממשיכים לשחק עד שהם מצליחים.",
  "הגוף משיג את מה שהמוח מאמין בו.",
  "אתה במרחק אימון אחד ממצב רוח מעולה.",
  "תגרום לעצמך להיות גאה.",
  "יום אחרי יום, אנחנו נהיים חזקים יותר.",
];

// ============================================================
// CONSTANTS & PROGRAM DATA
// ============================================================
const START_DATE = new Date("2026-04-04");
const TOTAL_DAYS = 30;
const WATER_GOAL_ML = 2500;
const WATER_STEP_ML = 250;
const WORK_TIME = 40;
const REST_TIME = 20;

function getCurrentDay() {
  const now = new Date();
  const diff = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff + 1, 1), TOTAL_DAYS);
}

// 7-day rotation: Strength A → HIIT → Strength C → Swim/Pilates → Strength E → HIIT → Rest
const WEEK_PATTERN = ["A", "B", "C", "D", "E", "B", "REST"];

const DAY_META = {
  A: { label: "אימון כוח א'", emoji: "💪", color: "blue" },
  B: { label: "סבב HIIT", emoji: "🔥", color: "orange" },
  C: { label: "אימון כוח ג'", emoji: "💪", color: "violet" },
  D: { label: "שחייה ופילאטיס", emoji: "🏊", color: "cyan" },
  E: { label: "אימון כוח ה'", emoji: "💪", color: "green" },
  REST: { label: "מנוחה והתאוששות", emoji: "😴", color: "gray" },
};

const STRENGTH_EXERCISES = {
  A: [
    {
      name: "TRX Rows", sets: "4 × 12 חזרות", muscles: "גב ויד קדמית", emoji: "🔄", tip: "כתפיים למטה ואחורה.", tempo: "2-1-2-0", focus: "משיכה עם המרפקים, כיווץ שכמות.",
      image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800",
      howTo: ["אחוז בידיות ה-TRX, הישען לאחור ב-45°, זרועות פשוטות", "משוך את החזה לכיוון הידיים על ידי דחיפת מרפקים לאחור", "כווץ שכמות יחד למשך שנייה אחת", "רד חזרה לאט ובשליטה"]
    },
    {
      name: "Goblet Squats", sets: "4 × 15 חזרות", muscles: "ארבע-ראשי וישבן", emoji: "🏋️", tip: "מבט קדימה, סנטר אסוף מעט.", tempo: "3-0-1-0", focus: "משקל על העקבים, חזה למעלה.",
      image: "https://images.unsplash.com/photo-1566241477600-ac026ad43033?auto=format&fit=crop&q=80&w=800",
      howTo: ["החזק משקולת בגובה החזה בשתי ידיים", "רגליים ברוחב כתפיים, בהונות פונות מעט החוצה", "רד למטה כאילו אתה יושב על כיסא — רד מתחת לקו הברכיים", "דחוף דרך העקבים לעמידה, כווץ ישבן למעלה"]
    },
    {
      name: "Pushups", sets: "4 × 12 חזרות", muscles: "חזה ויד אחורית", emoji: "👊", tip: "עמוד שדרה ניטרלי — אל תפיל את הראש.", tempo: "2-0-1-0", focus: "מרפקים ב-45 מעלות, ליבה נעולה.",
      image: "https://images.unsplash.com/photo-1598971639058-aba3c39389e6?auto=format&fit=crop&q=80&w=800",
      howTo: ["ידיים מעט רחבות מהכתפיים, אצבעות קדימה", "גוף בקו ישר מהראש ועד העקבים — בלי שקיעה של הגב", "הורד חזה לרצפה, מרפקים ב-45° (לא לצדדים)", "דחוף חזרה למעלה בפיצוץ, נעל זרועות למעלה"]
    },
    {
      name: "Lateral Raises (Band)", sets: "4 × 15 חזרות", muscles: "כתפיים", emoji: "🎯", tip: "כתפיים למטה, להימנע ממשיכה של הכתפיים לצוואר.", tempo: "2-1-1-0", focus: "הובלה עם המרפקים, הרגש את הכתף הצידית.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד על הגומייה, החזק את הקצוות לצידי הגוף", "הרם זרועות לצדדים עד שהן מקבילות לרצפה", "הובל עם המרפקים, לא עם הידיים — הזרת מעט גבוהה יותר", "הורד לאט בשליטה"]
    },
    {
      name: "Biceps Curl (Dumbbell)", sets: "4 × 15 חזרות", muscles: "יד קדמית", emoji: "💪", tip: "מרפקים צמודים לצידי הגוף.", tempo: "2-0-1-0", focus: "ירידה מבוקרת, טווח תנועה מלא.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa200181?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד זקוף, משקולות לצידי הגוף, כפות ידיים קדימה", "כווץ משקולות למעלה על ידי כיפוף מרפקים — שמור על זרועות יציבות", "כווץ יד קדמית חזק למעלה", "הורד לאט (2 שניות) — פשיטה מלאה למטה"]
    },
    {
      name: "Ball Plank", sets: "4 × 45 שניות", muscles: "ליבה", emoji: "⚽", tip: "מבט למזרן, קו ישר.", tempo: "0-45-0-0", focus: "דחוף מרפקים לתוך הכדור, אסוף אגן.",
      image: "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&q=80&w=800",
      howTo: ["הנח אמות על כדור פיזיו, בהונות על הרצפה", "צור קו ישר מהראש ועד העקבים", "דחוף מרפקים לתוך הכדור וכווץ חזק את הליבה", "החזק את המנח — נשום ברוגע, אל תחזיק את הנשימה"]
    },
    {
      name: "Foam Rolling", sets: "10 דקות", muscles: "התאוששות", emoji: "🌀", tip: "דלג על עמוד השדרה הצווארי.", tempo: "0-0-0-0", focus: "גלילה איטית על נקודות תפוסות.",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800",
      howTo: ["הנח את הגלגלת תחת השריר המיועד, השתמש במשקל הגוף ללחץ", "גלגל לאט לאורך השריר", "עצור בנקודות רגישות למשך 20-30 שניות", "כסה את הארבע-ראשי, המסטרינגס, גב עליון ולטיסימוס"]
    },
  ],
  C: [
    {
      name: "Kettlebell Deadlift", sets: "4 × 12 חזרות", muscles: "שרשרת אחורית", emoji: "🔔", tip: "ציר ירך (Hip Hinge) — מבט אל האופק.", tempo: "2-0-1-0", focus: "דחיפה דרך העקבים, כיווץ ישבן.",
      image: "https://images.unsplash.com/photo-1599058917233-35f93976378e?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד מעל הקטלבל, רגליים ברוחב האגן", "התכופף מהמותן (Hinge), דחף ישבן לאחור, אחוז בידית", "דחוף דרך העקבים כדי לעמוד", "כווץ ישבן למעלה, רד חזרה באותה תנועה"]
    },
    {
      name: "TRX Push", sets: "4 × 12 חזרות", muscles: "חזה וכתפיים", emoji: "🔄", tip: "כווץ ליבה חזק, ראש בקו הגוף.", tempo: "2-0-1-0", focus: "יציבות תחילה, ואז כוח.",
      image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד עם הפנים נגד כיוון ה-TRX, החזק ידיות בגובה החזה", "הישען קדימה למצב שכיבת סמיכה בשיפוע", "הורד חזה בין הידיים בשליטה", "דחוף חזרה להתחלה — שמור על גוף יציב וקשיח"]
    },
    {
      name: "Band Pull-Apart", sets: "4 × 20 חזרות", muscles: "גב עליון", emoji: "🎯", tip: "כתפיים אסופות, סנטר פנימה.", tempo: "1-1-1-0", focus: "קירוב שכמות.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      howTo: ["החזק גומייה בידיים ישרות לפניך בגובה הכתפיים", "משוך את הגומייה לצדדים על ידי כיווץ השכמות יחד", "החזק את המתיחה למשך שנייה אחת", "חזור להתחלה בשליטה — אל תיתן לגומייה 'לקפוץ' חזרה"]
    },
    {
      name: "Dumbbell Overhead Press", sets: "4 × 12 חזרות", muscles: "כתפיים", emoji: "🏋️", tip: "ליבה הדוקה, בלי להקשית את הגב התחתון.", tempo: "2-0-1-0", focus: "לחיצה ישר למעלה, זרועות קרוב לאוזניים.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c642289c?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד זקוף, משקולות בגובה הכתפיים, כפות ידיים קדימה", "כווץ ליבה חזק — אל תיתן לגב להתקשת", "לחץ את המשקולות ישר למעלה עד שהזרועות ישרות", "הורד בשליטה חזרה לגובה הכתפיים"]
    },
    {
      name: "Pilates Ball Ab Press", sets: "4 × 15 חזרות", muscles: "ליבה", emoji: "⚽", tip: "תמוך בצוואר אם צריך.", tempo: "1-2-1-0", focus: "הפעלת ליבה עמוקה, ייצוב הכדור.",
      image: "https://images.unsplash.com/photo-1518611012118-2960c8baddee?auto=format&fit=crop&q=80&w=800",
      howTo: ["שכב על הגב, ברכיים כפופות, החזק כדור בין הידיים לברכיים", "לחץ עם הידיים לתוך הכדור ובמקביל עם הברכיים לתוך הכדור", "החזק את הכיווץ למשך 2 שניות — הרגש את שרירי הליבה עובדים", "שחרר מעט אך שמור על מגע קל עם הכדור"]
    },
    {
      name: "Foam Rolling", sets: "10 דקות", muscles: "התאוששות", emoji: "🌀", tip: "התמקד בגב העליון ובמותניים.", tempo: "0-0-0-0", focus: "נשום דרך הלחץ.",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800",
      howTo: ["התמקד בעמוד השדרה החזי (גב עליון) ובמכופפי הירך", "גלגל לאט, עצור בנקודות תפוסות למשך 20-30 שניות", "נשום עמוק לתוך הלחץ — אל תתכווץ", "הקדש זמן נוסף לכל אזור שמרגיש מוגבל"]
    },
  ],
  E: [
    {
      name: "Kettlebell Swing (8kg)", sets: "4 × 20 חזרות", muscles: "ישבן וגב", emoji: "🔔", tip: "ציר ירך, מבט קדימה.", tempo: "1-0-1-0", focus: "ירכיים מתפרצות, זרועות חופשיות.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד מעל הקטלבל, רגליים מעט רחבות מהכתפיים", "התכופף מהמותן, אחוז בידית, הנף אותה לאחור בין הרגליים", "דחוף ירכיים קדימה בפיצוץ — הזרועות רק מלוות את התנועה", "תן למשקולת לצוף לגובה החזה, ואז רד חזרה לספיגת התנועה"]
    },
    {
      name: "TRX Lunge", sets: "4 × 12 לכל רגל", muscles: "רגליים", emoji: "🔄", tip: "גו זקוף, מבט קדימה.", tempo: "2-0-1-0", focus: "דחיפה דרך העקב הקדמי.",
      image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד עם הגב ל-TRX, רגל אחת בתוך הרצועה מאחוריך", "הורד את הברך האחורית לכיוון הרצפה — הברך הקדמית נשארת מעל הקרסול", "שמור על גו זקוף, ליבה מהודקת, מבט קדימה", "דחוף דרך העקב הקדמי לעמידה — כווץ ישבן למעלה"]
    },
    {
      name: "Tricep Extension (5kg)", sets: "4 × 12 חזרות", muscles: "יד אחורית", emoji: "💪", tip: "בלי תנועה של הצוואר למעלה.", tempo: "2-0-1-0", focus: "שמור על מרפקים קרוב לאוזניים.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      howTo: ["החזק משקולת מעל הראש בשתי ידיים, מרפקים פונים למעלה", "הורד את המשקולת מאחורי הראש על ידי כיפוף מרפקים", "שמור על זרועות יציבות — רק האמות זזות", "פשוט את הזרועות חזרה למעלה, כווץ חזק יד אחורית"]
    },
    {
      name: "Banded Glute Bridge", sets: "4 × 25 חזרות", muscles: "ישבן", emoji: "🎯", tip: "סנטר פנימה, בלי להקשית את הגב.", tempo: "1-2-1-0", focus: "עצור למעלה, כווץ חזק.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
      howTo: ["שכב על הגב, ברכיים כפופות, גומייה מסביב לברכיים", "דחף ברכיים החוצה נגד הגומייה לאורך כל התנועה", "דחף אגן למעלה על ידי כיווץ ישבן — לא הגב התחתון", "החזק למעלה למשך 2 שניות, ואז רד בשליטה"]
    },
    {
      name: "Plank Hold", sets: "4 × 60 שניות", muscles: "ליבה", emoji: "⭐", tip: "צוואר ניטרלי, גב ישר.", tempo: "0-60-0-0", focus: "מנח Hollow body, מתח בכל הגוף.",
      image: "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&q=80&w=800",
      howTo: ["אמות על הרצפה, מרפקים מתחת לכתפיים", "צור קו ישר מהראש ועד העקבים", "אסוף אגן מעט, כווץ הכל: ארבע-ראשי, ישבן, ליבה", "נשום ברוגע — אף פעם אל תחזיק את הנשימה"]
    },
    {
      name: "Foam Rolling", sets: "10 דקות", muscles: "התאוששות", emoji: "🌀", tip: "פתיחת בית החזה בטוחה.", tempo: "0-0-0-0", focus: "התמקד בלטיסימוס ובישבן.",
      howTo: ["התמקד היום בלטיסימוס (צידי הגב), בישבן וב-IT band", "גלגל לאט — סנטימטר אחד בשנייה", "עצור בנקודות רגישות ונשום לתוכן", "סיים עם פתיחת בית החזה מעל הגלגלת לניידות"]
    },
  ],
};

// Alternate strength workouts — used on weeks 2 & 4 for progression variety
const STRENGTH_EXERCISES_ALT = {
  A: [
    {
      name: "Dumbbell Row", sets: "4 × 12 לכל צד", muscles: "גב ויד קדמית", emoji: "🔄", tip: "המרפק מוביל לאחור, בלי סיבוב של הגוף.", tempo: "2-1-2-0", focus: "כיווץ רחב-גבי למעלה למשך שנייה אחת.",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
      howTo: ["הנח ברך ויד אחת על ספסל לתמיכה", "החזק משקולת ביד החופשית, זרוע תלויה ישרה", "משוך מרפק ישר אחורה — שמור על גו מקביל לרצפה", "הורד בשליטה למתיחה מלאה"]
    },
    {
      name: "Bulgarian Split Squat", sets: "4 × 10 לכל רגל", muscles: "ארבע-ראשי וישבן", emoji: "🏋️", tip: "ברך קדמית נעה לכיוון הבהונות.", tempo: "3-0-1-0", focus: "דחיפה דרך העקב הקדמי.",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800",
      howTo: ["רגל אחורית מורמת על ספסל או כיסא מאחוריך", "רגל קדמית רחוקה מספיק כדי שהברך לא תעבור את הבהונות בצורה מוגזמת", "הורד ברך אחורית לכיוון הרצפה — שמור על גו זקוף", "דחוף דרך העקב הקדמי לעמידה, כווץ ישבן למעלה"]
    },
    {
      name: "Wide-Grip Pushup", sets: "4 × 15 חזרות", muscles: "חזה וכתפיים", emoji: "👊", tip: "החזה נוגע ברצפה בכל חזרה.", tempo: "2-0-1-0", focus: "ידיים רחבות = יותר דגש על החזה.",
      image: "https://images.unsplash.com/photo-1598971639058-aba3c39389e6?auto=format&fit=crop&q=80&w=800",
      howTo: ["ידיים רחבות מרוחב הכתפיים, אצבעות פונות מעט החוצה", "הורד חזה עד לרצפה", "מרפקים יוצאים מעט הצידה — זה נותן יותר עבודה לחזה", "דחוף למעלה בפיצוץ, פשיטה מלאה של הזרועות"]
    },
    {
      name: "Front + Lateral Raise", sets: "4 × 10 לכל כיוון", muscles: "כתפיים", emoji: "🎯", tip: "שלוט בירידה — בלי תנופה.", tempo: "2-0-2-0", focus: "עבודה מלאה על כל שרירי הכתף.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      howTo: ["החזק משקולות קלות לצידי הגוף", "לסירוגין: הרם זרוע אחת קדימה ואת השנייה הצידה", "הבא לגובה הכתפיים — לא גבוה יותר", "הורד לאט — הרגש את המתח בשני המצבים"]
    },
    {
      name: "Hammer Curl", sets: "4 × 12 חזרות", muscles: "יד קדמית ואמה", emoji: "🔨", tip: "אחיזה ניטרלית לאורך כל הדרך — אגודל למעלה.", tempo: "2-0-1-0", focus: "עבודה על עובי הזרוע.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa200181?auto=format&fit=crop&q=80&w=800",
      howTo: ["משקולות לצידי הגוף, כפות ידיים פונות לירכיים (אחיזה ניטרלית)", "כווץ משקולות למעלה כשהאגודלים פונים למעלה כל הזמן", "שמור על מרפקים צמודים לצידי הגוף — רק האמות זזות", "הורד בשליטה מלאה לפשיטה מלאה"]
    },
    {
      name: "Dead Bug", sets: "4 × 10 לכל צד", muscles: "ליבה", emoji: "🐛", tip: "גב תחתון צמוד למזרן לאורך כל התרגיל.", tempo: "3-2-0-0", focus: "תיאום של יד ורגל נגדית.",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800",
      howTo: ["שכב על הגב, זרועות פונות לתקרה, ברכיים ב-90° באוויר", "לחץ גב תחתון חזק לתוך המזרן — אל תיתן לו להתרומם", "הורד לאט יד ורגל נגדית לכיוון הרצפה", "חזור להתחלה, החלף צדדים — שמור על ליבה מהודקת"]
    },
    {
      name: "Foam Rolling", sets: "10 דקות", muscles: "התאוששות", emoji: "🌀", tip: "דלג על עמוד השדרה הצווארי.", tempo: "0-0-0-0", focus: "התמקד היום בלטיסימוס ובמכופפי הירך.",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800",
      howTo: ["התמקד היום בלטיסימוס (צידי הגב העליון) ובמכופפי הירך", "גלגל לאט, סנטימטר אחד בשנייה", "עצור בנקודות רגישות ונשום לתוכן", "סיים עם פתיחת בית החזה מעל הגלגלת"]
    },
  ],
  C: [
    {
      name: "Romanian Deadlift (DB)", sets: "4 × 12 חזרות", muscles: "המסטרינגס וישבן", emoji: "🔔", tip: "כיפוף קל בברכיים, מבט קדימה.", tempo: "3-0-1-0", focus: "הרגל את המתיחה בהמסטרינגס בירידה.",
      image: "https://images.unsplash.com/photo-1599058917233-35f93976378e?auto=format&fit=crop&q=80&w=800",
      howTo: ["החזק משקולות לפני הירכיים, כיפוף קל בברכיים", "התכופף מהמותן (Hinge) — דחף את הישבן ישר אחורה", "הורד משקולות לאורך הרגליים עד שתרגיש מתיחה בהמסטרינגס", "דחוף ירכיים קדימה לעמידה, כווץ ישבן חזק למעלה"]
    },
    {
      name: "TRX Chest Fly", sets: "4 × 12 חזרות", muscles: "חזה וליבה", emoji: "🔄", tip: "שמור על כיפוף קל במרפקים לאורך כל התרגיל.", tempo: "3-0-1-0", focus: "מתיחה גדולה של החזה בתחתית התנועה.",
      image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד עם הפנים למטה, אחוז בידיות TRX, זרועות פשוטות לפני החזה", "הישען קדימה כך שהגוף בשיפוע — ה-TRX נושא את המשקל", "פתח זרועות לצדדים בתנועת פרפר — מתיחה גדולה", "החזר זרועות יחד על ידי כיווץ שרירי החזה"]
    },
    {
      name: "Reverse Fly (Band)", sets: "4 × 20 חזרות", muscles: "כתפיים אחוריות וגב עליון", emoji: "🎯", tip: "כפות ידיים פונות למטה, מרפקים כפופים מעט.", tempo: "2-1-1-0", focus: "צביטה של השכמות בסוף התנועה.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      howTo: ["עגן גומייה בגובה החזה, אחוז בשני הקצוות כשכפות הידיים פונות מטה", "התכופף מעט קדימה מהמותן — כיפוף קל במרפקים", "משוך גומייה לצדדים על ידי דחיפת מרפקים לאחור וכיווץ כתפיים אחוריות", "החזק שנייה אחת, חזור בשליטה"]
    },
    {
      name: "Upright Row (Band)", sets: "4 × 15 חזרות", muscles: "טרפזים וכתפיים", emoji: "🏋️", tip: "מרפקים מובילים גבוה יותר מהידיים.", tempo: "2-0-1-0", focus: "משוך מרפקים לצדדים — לא ישר למעלה.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
      howTo: ["עמוד על הגומייה, אחוז בה בגובה הירכיים באחיזה עילית", "משוך למעלה לכיוון הסנטר — המרפקים צריכים להיות גבוהים מהידיים", "חשוב: משוך מרפקים לצדדים בזמן העלייה", "הורד בשליטה להתחלה — שמור על ליבה מהודקת"]
    },
    {
      name: "Russian Twist", sets: "4 × 20 חזרות", muscles: "אלכסונים וליבה", emoji: "⚽", tip: "רגליים באוויר לאתגר גדול יותר.", tempo: "1-0-1-0", focus: "סובב מהמותן — לא מהזרועות.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
      howTo: ["שב עם ברכיים כפופות, הישען לאחור ב-45°, הרם רגליים אם אפשר", "הצמד ידיים או אחוז במשקולת קלה", "סובב את הגו מצד לצד — גע עם הידיים ליד הרצפה בכל צד", "זוז מהמותן, אל תניף רק את הזרועות"]
    },
    {
      name: "Foam Rolling", sets: "10 דקות", muscles: "התאוששות", emoji: "🌀", tip: "התמקד בעמוד השדרה החזי ובמותניים.", tempo: "0-0-0-0", focus: "נשום דרך הלחץ.",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800",
      howTo: ["התמקד בעמוד השדרה החזי (גב עליון) ובמכופפי הירך", "גלגל לאט, עצור בנקודות תפוסות למשך 20-30 שניות", "נשום עמוק לתוך הלחץ — אל תתכווץ", "הקדש זמן נוסף לכל אזור שמרגיש מוגבל"]
    },
  ],
  E: [
    {
      name: "Goblet Squat to Press", sets: "4 × 12 חזרות", muscles: "כל הגוף", emoji: "🏋️", tip: "בלי קריסה של הברכיים בעלייה.", tempo: "2-0-1-0", focus: "תנועה אחת רציפה — סקוואט ואז לחיצה.",
      image: "https://images.unsplash.com/photo-1566241477600-ac026ad43033?auto=format&fit=crop&q=80&w=800",
      howTo: ["החזק משקולת בחזה, רגליים ברוחב כתפיים, בהונות החוצה", "רד לסקוואט מתחת לקו הברכיים", "עמוד בפיצוץ ומיד לחץ את המשקולת מעל הראש", "הורד משקולת לחזה תוך כדי ירידה לסקוואט הבא"]
    },
    {
      name: "Hip Thrust (elevated)", sets: "4 × 20 חזרות", muscles: "ישבן", emoji: "🎯", tip: "דחוף דרך כל כף הרגל — עקבים ובהונות.", tempo: "1-2-1-0", focus: "פשיטה מלאה של הירך למעלה.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
      howTo: ["גב עליון על קצה ספסל או ספה, ברכיים כפופות, רגליים שטוחות", "הורד אגן לכיוון הרצפה", "דחוף אגן למעלה בפיצוץ — כווץ ישבן חזק למעלה", "החזק 2 שניות בפשיטה מלאה, רד בשליטה"]
    },
    {
      name: "Close-Grip Pushup", sets: "4 × 15 חזרות", muscles: "יד אחורית וחזה", emoji: "👊", tip: "מרפקים נשארים צמודים לגוף.", tempo: "2-0-1-0", focus: "היד האחורית לוקחת את העומס — הרגש את הכיווץ.",
      image: "https://images.unsplash.com/photo-1598971639058-aba3c39389e6?auto=format&fit=crop&q=80&w=800",
      howTo: ["ידיים קרובות זו לזו ישירות מתחת לחזה", "הורד חזה לכיוון הידיים, מרפקים מלטפים את צידי הגוף", "זרועות נשארות מקבילות לגו לאורך כל התנועה", "דחוף למעלה לפשיטה מלאה — כווץ יד אחורית למעלה"]
    },
    {
      name: "Side Plank", sets: "4 × 30 שניות לכל צד", muscles: "אלכסונים וליבה", emoji: "⭐", tip: "הצמד רגליים או אחת לפני השנייה ליציבות.", tempo: "0-30-0-0", focus: "האגן לא שוקע — שמור על קו ישר.",
      image: "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?auto=format&fit=crop&q=80&w=800",
      howTo: ["שכב על הצד, אמה מתחת לכתף, רגליים צמודות", "הרם אגן מהרצפה — הגוף יוצר קו אלכסוני ישר", "היד החופשית יכולה להיות על המותן או מורמת למעלה", "אל תיתן לאגן ליפול — כווץ חזק את האלכסונים"]
    },
    {
      name: "Pallof Press (Band)", sets: "4 × 12 לכל צד", muscles: "ליבה ואנטי-רוטציה", emoji: "🎯", tip: "לחיצה ישר קדימה, בלי שום סיבוב של הגוף.", tempo: "2-2-2-0", focus: "הגומייה רוצה לסובב אותך — התנגד לה.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      howTo: ["עגן גומייה בגובה החזה לצד אחד", "עמוד הצידה לעוגן, החזק גומייה בחזה בשתי ידיים", "דחף ידיים ישר קדימה לפניך — החזק 2 שניות", "החזר לחזה. הגומייה מנסה לסובב אותך — התנגד לה"]
    },
    {
      name: "Foam Rolling", sets: "10 דקות", muscles: "התאוששות", emoji: "🌀", tip: "פתיחת בית החזה בטוחה.", tempo: "0-0-0-0", focus: "התמקד בלטיסימוס ובישבן.",
      image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?auto=format&fit=crop&q=80&w=800",
      howTo: ["התמקד היום בלטיסימוס (צידי הגב), בישבן וב-IT band", "גלגל לאט — סנטימטר אחד בשנייה", "עצור בנקודות רגישות ונשום לתוכן", "סיים עם פתיחת בית החזה מעל הגלגלת לניידות"]
    },
  ],
};

// Alternate HIIT circuit — used on weeks 2 & 4
const HIIT_EXERCISES_ALT = [
  {
    name: "High Knees", tip: "תניע את הזרועות, נחת ברכות, הישאר זקוף.", tempo: "1-0-1-0", focus: "רגליים מהירות, הרמת ברך מעל קו המותן.",
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800",
    howTo: ["עמוד זקוף, רוץ במקום תוך הרמת ברכיים לגובה המותן", "הנף זרועות בניגוד לרגליים — כמו בריצה אמיתית", "נחת על כריות כף הרגל, לא על העקבים", "שמור על קצב מהיר ומבוקר לאורך כל האינטרוול"]
  },
  {
    name: "Band Deadlift to Row", tip: "קודם ה-Hinge, אחר כך המשיכה — שתי תנועות נפרדות.", tempo: "2-0-1-0", focus: "כוח מהירכיים, משיכה עם הגב.",
    image: "https://images.unsplash.com/photo-1599058917233-35f93976378e?auto=format&fit=crop&q=80&w=800",
    howTo: ["עמוד על הגומייה, התכופף מהמותן ואחוז בידיות", "עלה עם תנועת Deadlift (דחוף ירכיים קדימה)", "למעלה, משוך מיד מרפקים לאחור בתנועת חתירה", "רד חזרה בשליטה — זו חזרה אחת"]
  },
  {
    name: "Lateral Lunge", tip: "שב לאחור לתוך הרגל העובדת — חזה למעלה.", tempo: "2-0-1-0", focus: "הרגש את המתיחה בירך הפנימית בכל חזרה.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
    howTo: ["עמוד זקוף, רגליים צמודות", "צעד רחב לצד אחד, שב לאחור לתוך הירך והברך", "הרגל הישרה נמתחת בירך הפנימית — אל תיתן לברך לקרוס פנימה", "דחוף מהרגל הכפופה כדי לחזור להתחלה, החלף צדדים"]
  },
  {
    name: "Pushup to T-Rotation", tip: "סובב לאט — בלי למהר בהחזקה.", tempo: "2-0-2-0", focus: "כוח אנטי-רוטציה בשילוב עם עבודת חזה.",
    image: "https://images.unsplash.com/photo-1598971639058-aba3c39389e6?auto=format&fit=crop&q=80&w=800",
    howTo: ["בצע שכיבת סמיכה מלאה עד הרצפה", "למעלה, סובב זרוע אחת לכיוון התקרה", "הצמד רגליים או אחת לפני השנייה לשיווי משקל — החזק 2 שניות", "חזור למרכז, בצע עוד שכיבת סמיכה, סובב צד שני"]
  },
  {
    name: "Speed Skater", tip: "קפיצות צידיות גדולות — נחת ברכות.", tempo: "1-0-1-0", focus: "יציבות על רגל אחת בשילוב כוח מתפרץ.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    howTo: ["התחל על רגל אחת, הישען מעט קדימה", "קפוץ הצידה לרגל השנייה — כמו מחליק מהיר", "העבר את הרגל האחורית מאחור והנף זרועות בכיוון הנגדי", "נחת ברכות על כל רגל — שלוט בנחיתה"]
  },
  {
    name: "Burpee (Step Version)", tip: "צעד במקום לקפוץ — פשיטה מלאה של הירך.", tempo: "2-0-1-0", focus: "טווח תנועה מלא בקצב ששומר על המפרקים.",
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800",
    howTo: ["עמוד, ואז צעד (אל תקפוץ) לאחור למצב שכיבת סמיכה", "הורד חזה לרצפה בשכיבת סמיכה מבוקרת", "דחוף חזרה למעלה, צעד עם הרגליים קדימה לכיוון הידיים", "עמוד זקוף ושלח זרועות מעל הראש — זו חזרה אחת"]
  },
];

const HIIT_EXERCISES = [
  {
    name: "Jumping Jacks", tip: "כתפיים רגועות, נחיתה רכה.", tempo: "1-0-1-0", focus: "תנועה מתפרצת, נשימה קצובה.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    howTo: ["התחל בעמידה, זרועות לצידי הגוף, רגליים צמודות", "קפוץ עם הרגליים החוצה תוך הרמת זרועות מעל הראש", "קפוץ חזרה להתחלה, זרועות למטה", "נחת ברכות על כריות כף הרגל — שמור על קצב"]
  },
  {
    name: "Squat to Press (Band)", tip: "לחץ קדימה, בלי להקשית את הצוואר.", tempo: "1-0-1-0", focus: "עבודה של כל הגוף, הישאר מהודק.",
    image: "https://images.unsplash.com/photo-1566241477600-ac026ad43033?auto=format&fit=crop&q=80&w=800",
    howTo: ["עמוד על הגומייה, החזק בגובה הכתפיים", "רד לסקוואט עד שהירכיים מקבילות לרצפה", "עמוד בפיצוץ ולחץ את הגומייה מעל הראש", "הורד גומייה לכתפיים תוך כדי ירידה לסקוואט הבא"]
  },
  {
    name: "Mountain Climbers", tip: "עמוד שדרה ניטרלי, מבט למזרן.", tempo: "1-0-1-0", focus: "ברכיים לחזה, מהיר אך מבוקר.",
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=800",
    howTo: ["התחל במצב שכיבת סמיכה, ידיים מתחת לכתפיים", "דחוף ברך אחת לכיוון החזה במהירות", "החלף רגליים בתנועת ריצה", "שמור על אגן נמוך וליבה מהודקת — אל תקפוץ למעלה"]
  },
  {
    name: "Kettlebell Deadlift", tip: "ציר ירך, מבט אל האופק.", tempo: "2-0-1-0", focus: "כוח מהישבן.",
    image: "https://images.unsplash.com/photo-1599058917233-35f93976378e?auto=format&fit=crop&q=80&w=800",
    howTo: ["עמוד מעל הקטלבל, רגליים ברוחב האגן", "התכופף מהמותן, גב ישר, אחוז בידית", "עמוד על ידי דחיפת הרצפה — כווץ ישבן", "רד בשליטה, גע עם המשקולת ברצפה, וחזור על הפעולה"]
  },
  {
    name: "TRX Row (Explosive)", tip: "משוך מרפקים אחורה, כתפיים למטה.", tempo: "1-0-1-0", focus: "משיכה מהירה, שחרור איטי.",
    image: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800",
    howTo: ["החזק ידיות TRX, הישען לאחור עם זרועות פשוטות", "משוך בפיצוץ — דחוף מרפקים לאחור מהר", "כווץ למעלה לזמן קצר", "הורד לאט (2 שניות) לפשיטה מלאה"]
  },
  {
    name: "Banded Lateral Walk", tip: "הטיה קלה קדימה, ראש ניטרלי.", tempo: "1-0-1-0", focus: "הרגש את השריפה בצד הישבן.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800",
    howTo: ["גומייה מסביב לקרסוליים או מעט מעל הברכיים", "מצב רבע סקוואט, הטיה קלה קדימה", "צעד הצידה — הובל עם העקב, שמור על מתח", "10 צעדים לכיוון אחד, 10 צעדים חזרה — מתח קבוע"]
  },
];

const SWIM_PILATES_ACTIVITIES = [
  {
    label: "אימון שחייה",
    emoji: "🏊",
    image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=800",
    detail: "עבודת טכניקה ונפח סיבולת. משך כולל: 45 דקות.",
    exercises: [
      { name: "Warm-up (Mixed)", sets: "400 מטר", tip: "קצב רגוע, התמקד בנשימה.", howTo: ["שלב בין חתירה לגב", "התמקד בתנועות ארוכות ורגועות", "העלה דופק בהדרגה"] },
      { name: "Main Set (Freestyle)", sets: "8 × 100 מטר", tip: "קצב קבוע, 20 שניות מנוחה.", howTo: ["שמור על קצב יציב בכל 100 מטר", "התמקד בנשימה דו-צידית (כל 3 תנועות)", "דחוף חזק מהקיר, הישאר הידרודינמי"] },
      { name: "Technique (Backstroke)", sets: "6 × 50 מטר", tip: "צוואר ניטרלי, דגש על רוטציה.", howTo: ["סובב כתפיים במלואן עם כל תנועה", "שמור על ראש יציב, מבט לתקרה", "הזרת נכנסת למים ראשונה"] },
      { name: "Drills (Kick only)", sets: "200 מטר", tip: "השתמש בלוח, דגש על כוח מהירך.", howTo: ["החזק לוח שחייה, בעט מהירכיים", "שמור על קרסוליים משוחררים ורגועים", "בעיטות קטנות ומהירות — בלי השפרצות גדולות"] },
      { name: "Cool-down", sets: "200 מטר", tip: "קל מאוד, מתיחה מלאה.", howTo: ["גב קל או חזה", "התמקד במתיחת כל הגוף במים", "הורד דופק בהדרגה"] },
    ],
    tempo: "0-0-0-0",
  },
  {
    label: "אימון פילאטיס",
    emoji: "🧘",
    image: "https://images.unsplash.com/photo-1518611012118-2960c8baddee?auto=format&fit=crop&q=80&w=800",
    detail: "שליטה בליבה וקצב מבוקר. משך כולל: 35 דקות.",
    exercises: [
      { name: "The Hundred", sets: "15 מחזורי נשימה", tip: "פמפם זרועות בקצב.", howTo: ["שכב על הגב, רגליים במצב Tabletop, ראש וכתפיים מורמים", "זרועות ישרות לצידי הגוף, פמפם למעלה ולמטה במהירות", "שאף ב-5 פמפומים, נשוף ב-5 פמפומים", "שמור על גב תחתון צמוד למזרן"] },
      { name: "Single Leg Stretch", sets: "4 × 15 חזרות", tip: "עגן את הגב למזרן.", howTo: ["שכב על הגב, ראש מורם, ברך אחת משוכה לחזה", "החלף רגליים — פשוט אחת תוך כדי משיכת השנייה", "שמור על כתפיים מורמות וליבה פעילה", "זוז בשליטה, קצב כמו ברכיבה על אופניים"] },
      { name: "Plank with Leg Lift", sets: "4 × 12 חזרות", tip: "שמור על אגן מאוזן.", howTo: ["התחל במצב פלאנק על האמות", "הרם רגל אחת כ-15 ס\"מ מהרצפה", "החזק 2 שניות, הורד בשליטה", "החלף רגליים — שמור על אגן מאוזן לחלוטין"] },
      { name: "Spine Stretch Forward", sets: "4 × 10 חזרות", tip: "תנועה חולייתית.", howTo: ["שב זקוף, רגליים פשוטות, זרועות מושטות קדימה", "התגלגל קדימה חוליה אחרי חוליה — סנטר לחזה תחילה", "הושט מעבר לבהונות, הרגש את המתיחה לאורך עמוד השדרה", "חזור חוליה חוליה לישיבה זקופה"] },
      { name: "Bird Dog", sets: "4 × 12 חזרות", tip: "יד ורגל נגדית, גב שטוח.", howTo: ["התחל על ארבע, פרקי ידיים מתחת לכתפיים", "פשוט יד ימין ורגל שמאל בו-זמנית", "החזק למשך 2 שניות — הגוף צריך ליצור קו ישר אחד", "חזור בשליטה, החלף צדדים"] },
      { name: "Scissor Kicks", sets: "4 × 20 חזרות", muscles: "ליבה", emoji: "✂️", tip: "רגליים ישרות, ליבה מהודקת.", howTo: ["שכב על הגב, ידיים מתחת לאגן לתמיכה", "רגליים ישרות, הרם שתיהן כ-15 ס\"מ מהרצפה", "בצע תנועת מספריים עם הרגליים במהירות", "שמור על גב תחתון צמוד למזרן — בלי להקשית"] },
    ],
    tempo: "3-1-3-0",
  },
];

// ============================================================
// GAMIFICATION SYSTEM
// ============================================================
const XP_REWARDS = {
  WORKOUT_COMPLETE: 100,
  DAILY_GOAL: 25,
  WATER_GOAL: 25,
  STREAK_DAY: 15,
  PERFECT_DAY: 50,
};

const LEVELS = [
  { name: "מתחיל", minXP: 0, emoji: "🌱", color: "text-gray-400" },
  { name: "טירון", minXP: 100, emoji: "🏃", color: "text-blue-400" },
  { name: "לוחם", minXP: 300, emoji: "🥊", color: "text-cyan-400" },
  { name: "לוחם מנוסה", minXP: 600, emoji: "⚔️", color: "text-green-400" },
  { name: "גלאדיאטור", minXP: 1000, emoji: "🛡️", color: "text-yellow-400" },
  { name: "אלוף", minXP: 1500, emoji: "🏅", color: "text-orange-400" },
  { name: "עילית", minXP: 2200, emoji: "💎", color: "text-purple-400" },
  { name: "אגדה", minXP: 3000, emoji: "👑", color: "text-pink-400" },
  { name: "טיטאן", minXP: 4000, emoji: "⚡", color: "text-red-400" },
  { name: "אל הברזל", minXP: 5000, emoji: "🔱", color: "text-amber-300" },
];

function getLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return { ...LEVELS[i], index: i };
  }
  return { ...LEVELS[0], index: 0 };
}

function getNextLevel(xp) {
  const current = getLevel(xp);
  if (current.index >= LEVELS.length - 1) return null;
  return LEVELS[current.index + 1];
}

const ACHIEVEMENTS = [
  { id: "first_workout", label: "אימון ראשון", emoji: "🔥", desc: "השלמת את האימון הראשון שלך!", check: (s) => s.totalWorkouts >= 1 },
  { id: "first_strength", label: "מתחיל כוח", emoji: "💪", desc: "סיימת אימון כוח ראשון", check: (s) => s.strengthDone >= 1 },
  { id: "first_hiit", label: "שורף קלוריות", emoji: "⚡", desc: "שרדת אימון HIIT ראשון", check: (s) => s.hiitDone >= 1 },
  { id: "first_swim", label: "אימון מים/פילאטיס", emoji: "🏊", desc: "סיימת אימון שחייה או פילאטיס", check: (s) => s.swimDone >= 1 },
  { id: "streak_7", label: "אש של שבוע", emoji: "📅", desc: "7 ימים ברציפות!", check: (s) => s.streak >= 7 },
  { id: "streak_14", label: "טיטאן שבועיים", emoji: "🗓️", desc: "14 ימים ברציפות!", check: (s) => s.streak >= 14 },
  { id: "streak_21", label: "יהלום 21 יום", emoji: "💎", desc: "21 ימים ברציפות — ההרגל כבר כאן!", check: (s) => s.streak >= 21 },
  { id: "streak_30", label: "אגדה של 30 יום", emoji: "🏆", desc: "השלמת את כל האתגר!", check: (s) => s.streak >= 30 },
  { id: "water_master", label: "מאסטר הידרציה", emoji: "💧", desc: "הגעת ליעד המים במשך 5 ימים", check: (s) => s.waterDays >= 5 },
  { id: "protein_champ", label: "אלוף החלבון", emoji: "🥩", desc: "עמדת ביעד החלבון במשך 5 ימים", check: (s) => s.proteinDays >= 5 },
  { id: "first_weigh", label: "התחלת שקילה", emoji: "⚖️", desc: "תיעדת את השקילה הראשונה שלך", check: (s) => s.weighIns >= 1 },
  { id: "perfect_day", label: "יום מושלם", emoji: "🎯", desc: "כל 4 המטרות ביום אחד", check: (s) => s.perfectDays >= 1 },
  { id: "perfect_week", label: "שבוע מושלם", emoji: "🌟", desc: "7 ימים מושלמים", check: (s) => s.perfectDays >= 7 },
  { id: "level_5", label: "סטטוס אלוף", emoji: "🏅", desc: "הגעת לרמה 5", check: (s) => getLevel(s.xp).index >= 4 },
  { id: "level_10", label: "אל הברזל", emoji: "🔱", desc: "הגעת לרמה המקסימלית!", check: (s) => getLevel(s.xp).index >= 9 },
];

// Returns { current, target } for quantifiable achievements, null for binary ones
function getAchievementProgress(achId, stats, day) {
  const streak = Math.max(0, day - 1);
  switch (achId) {
    case "first_workout": return { current: Math.min(stats.totalWorkouts || 0, 1), target: 1 };
    case "first_strength": return { current: Math.min(stats.strengthDone || 0, 1), target: 1 };
    case "first_hiit": return { current: Math.min(stats.hiitDone || 0, 1), target: 1 };
    case "first_swim": return { current: Math.min(stats.swimDone || 0, 1), target: 1 };
    case "first_weigh": return { current: Math.min(stats.weighIns || 0, 1), target: 1 };
    case "perfect_day": return { current: Math.min(stats.perfectDays || 0, 1), target: 1 };
    case "perfect_week": return { current: Math.min(stats.perfectDays || 0, 7), target: 7 };
    case "water_master": return { current: Math.min(stats.waterDays || 0, 5), target: 5 };
    case "protein_champ": return { current: Math.min(stats.proteinDays || 0, 5), target: 5 };
    case "streak_7": return { current: Math.min(streak, 7), target: 7 };
    case "streak_14": return { current: Math.min(streak, 14), target: 14 };
    case "streak_21": return { current: Math.min(streak, 21), target: 21 };
    case "streak_30": return { current: Math.min(streak, 30), target: 30 };
    default: return null;
  }
}

const TRANSFORMATION_TIMELINE = [
  {
    week: 1, days: "1-7", title: "הפעלה עצבית", emoji: "🧠", unlockDay: 1,
    body: "המוח שלך מתכנת את עצמו מחדש — בונה נתיבים עצביים חדשים לשליטה בשרירים. הקואורדינציה משתפרת מדי יום.",
    feel: "שרירים תפוסים, התנגדות מנטלית, אבל אנרגיה בעלייה."
  },
  {
    week: 2, days: "8-14", title: "חיזוק לב-ריאה", emoji: "❤️", unlockDay: 8,
    body: "יעילות הלב משתפרת. דופק המנוחה מתחיל לרדת. זרימת הדם לשרירים עולה.",
    feel: "פחות קוצר נשימה, שינה טובה יותר, שיפור במצב הרוח."
  },
  {
    week: 3, days: "15-21", title: "צמיחת שריר", emoji: "💪", unlockDay: 15,
    body: "סיבי השריר מתעבים. חילוף החומרים שלך עולה. שריפת השומן מואצת.",
    feel: "הבגדים יושבים אחרת. הכוח עולה משמעותית. הביטחון העצמי נוסק."
  },
  {
    week: 4, days: "22-30", title: "תוצאות נראות לעין", emoji: "🔥", unlockDay: 22,
    body: "השינויים בהרכב הגוף נראים לעין. הגדרת שריר מופיעה. הסיבולת טובה משמעותית.",
    feel: "אנשים שמים לב. אנרגיה לאורך כל היום. בנית הרגל לחיים."
  },
];


const MEAL_IDEAS = [
  // ── Existing favourites ──────────────────────────────────────────
  { name: "Protein Yogurt Bowl", emoji: "🥣", ingredients: "Greek yogurt + protein powder + berries + granola", protein: "~35g", prep: "2 min", imageUrl: "/images/meals/protein_yogurt_bowl.png" },
  { name: "Tuna Lettuce Wraps", emoji: "🥬", ingredients: "Canned tuna + avocado + lettuce + lemon", protein: "~30g", prep: "5 min", imageUrl: "/images/meals/tuna_lettuce_wraps.png" },
  { name: "Egg & Cottage Cheese", emoji: "🥚", ingredients: "Hard-boiled eggs + cottage cheese + cherry tomatoes", protein: "~28g", prep: "8 min", imageUrl: "/images/meals/egg_cottage_cheese_snack.png" },
  { name: "Chickpea Power Bowl", emoji: "🫘", ingredients: "Chickpeas + Greek yogurt dip + cucumber + olive oil", protein: "~22g", prep: "5 min", imageUrl: "/images/meals/chickpea_power_bowl.png" },
  { name: "Protein Smoothie", emoji: "🥤", ingredients: "Protein powder + banana + Greek yogurt + almond milk", protein: "~40g", prep: "3 min", imageUrl: "/images/meals/protein_smoothie_berry.png" },
  { name: "Cottage Cheese Toast", emoji: "🍞", ingredients: "Cottage cheese + whole grain toast + cucumber + herbs", protein: "~20g", prep: "3 min", imageUrl: "/images/meals/cottage_cheese_toast_modern.png" },
  { name: "Tuna & Legume Salad", emoji: "🥗", ingredients: "Tuna + chickpeas + cherry tomatoes + olive oil + lemon", protein: "~35g", prep: "5 min", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
  // ── ישראלי / ים-תיכוני ──────────────────────────────────────────
  { name: "שקשוקה ביצים", emoji: "🍳", ingredients: "3 ביצים + עגבניות + פלפלים + בצל + שמן זית + חומוס", protein: "~26g", prep: "12 min", imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&q=80&w=800" },
  { name: "קערת חומוס + ביצה", emoji: "🫙", ingredients: "חומוס ביתי + ביצה קשה + פפריקה + שמן זית + לחם מחיטה מלאה", protein: "~24g", prep: "3 min", imageUrl: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&q=80&w=800" },
  { name: "עוף על האש + סלט", emoji: "🍗", ingredients: "חזה עוף על גריל + טחינה + ירקות קלויים + לימון", protein: "~42g", prep: "20 min", imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?auto=format&fit=crop&q=80&w=800" },
  { name: "לבנה עם ירקות", emoji: "🧀", ingredients: "לבנה 5% + מלפפון + עגבנייה + זיתים + לחם שיפון", protein: "~18g", prep: "2 min", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800" },
  { name: "מג'דרה עם יוגורט", emoji: "🍲", ingredients: "עדשים + אורז + בצל מקורמל + יוגורט יווני", protein: "~22g", prep: "25 min", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800" },
  { name: "סלט טונה בולגרי", emoji: "🥗", ingredients: "טונה + גבינה בולגרית 5% + עגבנייה + מלפפון + שמן זית", protein: "~34g", prep: "4 min", imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800" },
  { name: "קערת סביח", emoji: "🍆", ingredients: "ביצה קשה + חציל קלוי + חומוס + טחינה + ירוקים", protein: "~20g", prep: "15 min", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" },
  // ── בינלאומי ─────────────────────────────────────────────────────
  { name: "Salmon Teriyaki Bowl", emoji: "🐟", ingredients: "Salmon fillet + brown rice + edamame + sesame + soy sauce", protein: "~40g", prep: "18 min", imageUrl: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&q=80&w=800" },
  { name: "Turkey Meatball Plate", emoji: "🍖", ingredients: "Turkey meatballs + sweet potato + Greek yogurt sauce + herbs", protein: "~38g", prep: "22 min", imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800" },
  { name: "Peanut Butter Oats", emoji: "🌾", ingredients: "Oats + natural PB + banana + protein powder + almond milk", protein: "~30g", prep: "5 min", imageUrl: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80&w=800" },
  { name: "Black Bean Quinoa Bowl", emoji: "🫘", ingredients: "Quinoa + black beans + corn + avocado + lime + cumin", protein: "~24g", prep: "10 min", imageUrl: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800" },
  { name: "Chicken Stir-Fry", emoji: "🥢", ingredients: "Chicken breast + broccoli + snap peas + ginger + soy sauce + rice", protein: "~38g", prep: "15 min", imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800" },
];

const MEAL_SLOTS = [
  { key: "breakfast", label: "ארוחת בוקר" },
  { key: "morningSnack", label: "ביניים בוקר" },
  { key: "lunch", label: "ארוחת צהריים" },
  { key: "afternoonSnack", label: "ביניים אחר הצהריים" },
  { key: "dinner", label: "ארוחת ערב" },
];

const BADGES = [
  { label: "יום 1", emoji: "🚀", requiredDay: 1 },
  { label: "יום 7", emoji: "⚡", requiredDay: 7 },
  { label: "יום 14", emoji: "🔥", requiredDay: 14 },
  { label: "יום 21", emoji: "💎", requiredDay: 21 },
  { label: "יום 30", emoji: "🏆", requiredDay: 30 },
  { label: "תמשיך ככה", emoji: "💪", requiredDay: 3 },
];

// ============================================================
// EXERCISE GIF LOOKUP — Animated human demonstrations via Giphy
// ============================================================
const EXERCISE_GIFS = {
  // Strength A
  "TRX Rows": "https://media.giphy.com/media/xUOwGkdSnU89ib4FnW/giphy.gif",
  "Goblet Squats": "https://media.giphy.com/media/xT8qBj4ERH6ROF9dHq/giphy.gif",
  "Pushups": "https://media.giphy.com/media/HZqfCJII5tz7zSLq0K/giphy.gif",
  "Lateral Raises (Band)": "https://media.giphy.com/media/lOqNS2HUyN8OJV0CuF/giphy.gif",
  "Biceps Curl (Dumbbell)": "https://media.giphy.com/media/KUVTfh1CUbRy5lNpVs/giphy.gif",
  "Ball Plank": "https://media.giphy.com/media/Rqn2jP5vJNebJ8nHqy/giphy.gif",
  "Foam Rolling": "https://media.giphy.com/media/POYzxzQnFkQW9VVXWN/giphy.gif",
  // Strength C
  "Kettlebell Deadlift": "https://media.giphy.com/media/54sY1xohVtzxSBFMOH/giphy.gif",
  "TRX Push": "https://media.giphy.com/media/HZqfCJII5tz7zSLq0K/giphy.gif",
  "Band Pull-Apart": "https://media.giphy.com/media/xUOwGkdSnU89ib4FnW/giphy.gif",
  "Dumbbell Overhead Press": "https://media.giphy.com/media/QAnF7fUn6ykSLlmZk9/giphy.gif",
  "Pilates Ball Ab Press": "https://media.giphy.com/media/Rqn2jP5vJNebJ8nHqy/giphy.gif",
  // Strength E
  "Kettlebell Swing (8kg)": "https://media.giphy.com/media/ieymaDWYotBsZwMvop/giphy.gif",
  "TRX Lunge": "https://media.giphy.com/media/BDta60HEH7374d4lSZ/giphy.gif",
  "Tricep Extension (5kg)": "https://media.giphy.com/media/MGS3u6aPWQkEBcjvfh/giphy.gif",
  "Banded Glute Bridge": "https://media.giphy.com/media/SJWtWnRFsTiNVSECVP/giphy.gif",
  "Plank Hold": "https://media.giphy.com/media/Rqn2jP5vJNebJ8nHqy/giphy.gif",
  // HIIT Circuit
  "Jumping Jacks": "https://media.giphy.com/media/joZMGjZCQj9NuR5g6r/giphy.gif",
  "Squat to Press (Band)": "https://media.giphy.com/media/cLNWDtDtAza9OQf1Be/giphy.gif",
  "Mountain Climbers": "https://media.giphy.com/media/vI2BMBcFDgbbFrB0bA/giphy.gif",
  "Kettlebell Deadlift (HIIT)": "https://media.giphy.com/media/54sY1xohVtzxSBFMOH/giphy.gif",
  "TRX Row (Explosive)": "https://media.giphy.com/media/xUOwGkdSnU89ib4FnW/giphy.gif",
  "Banded Lateral Walk": "https://media.giphy.com/media/SJWtWnRFsTiNVSECVP/giphy.gif",
};

// ============================================================
// localStorage PERSISTENCE HOOK
// ============================================================
function usePersist(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) { void e; /* quota exceeded — silently ignore */ }
  }, [key, state]);

  return [state, setState];
}

// ============================================================
// VISUAL PACER COMPONENT (D1 fix: unique keyframe per instance)
// ============================================================
let pacerCounter = 0;
function VisualPacer({ tempo = "2-0-2-0", running }) {
  const [down, hold1, up, hold2] = tempo.split("-").map(Number);
  const total = down + hold1 + up + hold2;
  // FIX: useRef instead of useMemo — guarantees a stable unique name per mount
  const animRef = useRef(null);
  if (!animRef.current) animRef.current = `pacer_${++pacerCounter}`;
  const animName = animRef.current;

  if (total === 0) return null;

  return (
    <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700/50 glass-card">
      <div className="flex justify-between text-[10px] text-gray-500 mb-2 uppercase font-bold tracking-tighter">
        <span className="flex items-center gap-1"><ChevronDown className="w-3 h-3" /> ירידה ({down} ש')</span>
        <span className="text-emerald-500">החזקה ({hold1} ש')</span>
        <span className="flex items-center gap-1"><ChevronUp className="w-3 h-3" /> עלייה ({up} ש')</span>
        <span className="text-indigo-400">החזקה בשיא ({hold2} ש')</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
        {running && (
          <div
            className="h-full absolute top-0 left-0 rounded-full"
            style={{
              animation: `${animName} ${total}s linear infinite`,
              width: "100%"
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes ${animName} {
          0% { width: 0%; background: linear-gradient(90deg, #3b82f6, #60a5fa); }
          ${(down / total) * 100}% { width: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); }
          ${((down + hold1) / total) * 100}% { width: 100%; background: linear-gradient(90deg, #10b981, #34d399); }
          ${((down + hold1 + up) / total) * 100}% { width: 0%; background: linear-gradient(90deg, #6366f1, #818cf8); }
          100% { width: 0%; background: linear-gradient(90deg, #6366f1, #818cf8); }
        }
      `}</style>
      <div className="mt-3 flex justify-center items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${running ? "bg-blue-500 animate-pulse" : "bg-gray-600"}`} />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {running ? "⚡ קצב פעיל" : "לחץ הפעל"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SAFETY BANNER — always visible at top
// ============================================================
function SafetyBanner({ onDismiss }) {
  return (
    <div className="bg-red-950 border-b border-red-800 px-4 py-2 flex items-center gap-2 sticky top-0 z-50">
      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
      <span className="text-red-200 text-xs font-semibold tracking-wide flex-1">
        בטיחות הצוואר: שמור על צוואר נייטרלי בכל עת. הפסק מיד אם מופיע כאב.
      </span>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-100 ml-2 text-lg leading-none flex-shrink-0 active:scale-90 transition-transform"
        aria-label="Dismiss safety banner"
      >✕</button>
    </div>
  );
}

// ============================================================
// AI TRAINER — Claude Vision API helper + components
// ============================================================

async function callClaudeVision(apiKey, imageBase64, mediaType, systemPrompt, userPrompt) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
          { type: "text", text: userPrompt },
        ],
      }],
    }),
  });
  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}));
    throw new Error(e.error?.message || `API error ${resp.status}`);
  }
  const data = await resp.json();
  return data.content[0].text;
}

async function callClaudeText(apiKey, systemPrompt, userPrompt) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });
  if (!resp.ok) {
    const e = await resp.json().catch(() => ({}));
    throw new Error(e.error?.message || `API error ${resp.status}`);
  }
  const data = await resp.json();
  return data.content[0].text;
}

// Reads a File/Blob to base64 string (no data:... prefix)
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Settings Modal ───────────────────────────────────────────
function SettingsModal({ apiKey, setApiKey, onClose }) {
  const [draft, setDraft] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  function save() {
    setApiKey(draft.trim());
    setSaved(true);
    setTimeout(onClose, 800);
  }

  return (
    <div className="fixed inset-0 z-[300] bg-gray-950/90 backdrop-blur-md flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700/60 rounded-[24px] p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h2 className="text-white font-black text-lg">הגדרות מאמן AI</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          הכנס את מפתח ה-API של Anthropic כדי להפעיל ניתוח AI של תמונות אוכל, בדיקת טכניקה ומאמן אישי.
        </p>

        <div className="bg-purple-950/30 border border-purple-700/40 rounded-xl p-3 mb-4">
          <div className="text-purple-300 text-xs font-bold mb-1">🔑 איפה מקבלים מפתח?</div>
          <div className="text-gray-400 text-xs">console.anthropic.com → API Keys → Create Key</div>
        </div>

        <input
          type="password"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="sk-ant-api03-..."
          className="w-full bg-gray-800 border border-gray-600/60 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-purple-500/60 mb-4"
        />

        <button
          onClick={save}
          disabled={!draft.trim()}
          className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-sm transition-all ${
            saved ? "bg-green-600 text-white" : "bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40"
          }`}
        >
          {saved ? "✓ נשמר!" : "שמור מפתח"}
        </button>

        <p className="text-gray-600 text-[10px] text-center mt-3">המפתח נשמר רק על המכשיר שלך — לא נשלח לאף שרת חיצוני.</p>
      </div>
    </div>
  );
}

// ── AI Form Checker (photo → form feedback) ──────────────────
function AIFormCheck({ exercise, apiKey }) {
  const [phase, setPhase] = useState("idle"); // idle | preview | loading | done | error
  const [imageBase64, setImageBase64] = useState(null);
  const [mediaType, setMediaType] = useState("image/jpeg");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();

  async function handleFile(file) {
    if (!file) return;
    setMediaType(file.type || "image/jpeg");
    const b64 = await fileToBase64(file);
    setImageBase64(b64);
    setPhase("preview");
    setFeedback("");
    setError("");
  }

  async function analyze() {
    if (!apiKey) { setError("⚙️ הכנס מפתח API בהגדרות קודם."); setPhase("error"); return; }
    setPhase("loading");
    const system = `אתה מאמן כושר אישי מוסמך וחמול. אתה מנתח תמונות של תרגילים ונותן משוב ספציפי, חם ומעודד בעברית.
תמיד מתחיל במשהו חיובי שאתה רואה, אחר כך נותן 2-3 נקודות שיפור ספציפיות לתרגיל הזה, ומסיים בעידוד.
אתה דואג לבטיחות — מדגיש הגנה על הצוואר והגב.`;

    const user = `אני מבצע ${exercise.name}.
מוקד התרגיל: ${exercise.focus}
טיפ הטכניקה: ${exercise.tip}

נתח את הטכניקה שלי בתמונה. תן לי משוב ספציפי ל-${exercise.name} — מה אני עושה טוב, מה לשפר, ואיך להמשיך בבטחה.`;

    try {
      const result = await callClaudeVision(apiKey, imageBase64, mediaType, system, user);
      setFeedback(result);
      setPhase("done");
    } catch (e) {
      setError(e.message);
      setPhase("error");
    }
  }

  function reset() { setPhase("idle"); setImageBase64(null); setFeedback(""); setError(""); }

  return (
    <div className="mt-3 border-t border-gray-700/40 pt-3">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-4 h-4 text-purple-400" />
        <span className="text-purple-300 text-xs font-black uppercase tracking-widest">AI Form Check</span>
      </div>

      {phase === "idle" && (
        <div className="flex gap-2">
          <button
            onClick={() => { fileRef.current.accept = "image/*"; fileRef.current.capture = "environment"; fileRef.current.click(); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-900/30 border border-purple-600/40 text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-900/50 active:scale-95 transition-all"
          >
            <Camera className="w-4 h-4" /> צלם עכשיו
          </button>
          <button
            onClick={() => { fileRef.current.accept = "image/*,video/*"; fileRef.current.removeAttribute("capture"); fileRef.current.click(); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-800/60 border border-gray-700/40 text-gray-400 rounded-xl text-xs font-bold hover:bg-gray-700/60 active:scale-95 transition-all"
          >
            <ImagePlus className="w-4 h-4" /> העלה תמונה
          </button>
          <input ref={fileRef} type="file" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        </div>
      )}

      {phase === "preview" && imageBase64 && (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-purple-700/40">
            <img src={`data:${mediaType};base64,${imageBase64}`} alt="form check" className="w-full h-40 object-cover" />
            <button onClick={reset} className="absolute top-2 right-2 bg-gray-950/80 rounded-full p-1 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <button onClick={analyze} className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all flex items-center justify-center gap-2">
            <Bot className="w-4 h-4" /> נתח טכניקה
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="flex items-center justify-center gap-3 py-6 bg-purple-950/20 rounded-xl border border-purple-700/30">
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          <span className="text-purple-300 text-sm font-bold">המאמן מנתח את הטכניקה שלך...</span>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-3">
          <div className="bg-purple-950/20 border border-purple-700/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-xs font-black uppercase">משוב המאמן</span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{feedback}</p>
          </div>
          <button onClick={reset} className="w-full py-2 border border-gray-700/40 text-gray-400 rounded-xl text-xs font-bold hover:border-purple-600/40 hover:text-purple-300 transition-all">
            צלם שוב
          </button>
        </div>
      )}

      {phase === "error" && (
        <div className="bg-red-950/30 border border-red-700/40 rounded-xl p-4 space-y-2">
          <p className="text-red-300 text-sm">{error}</p>
          <button onClick={reset} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">נסה שוב</button>
        </div>
      )}
    </div>
  );
}

// ── AI Meal Analyzer (food photo → nutrition feedback) ───────
function AIMealAnalyzer({ mealLabel, apiKey }) {
  const [phase, setPhase] = useState("idle");
  const [imageBase64, setImageBase64] = useState(null);
  const [mediaType, setMediaType] = useState("image/jpeg");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();

  async function handleFile(file) {
    if (!file) return;
    setMediaType(file.type || "image/jpeg");
    const b64 = await fileToBase64(file);
    setImageBase64(b64);
    setPhase("preview");
    setFeedback(""); setError("");
  }

  async function analyze() {
    if (!apiKey) { setError("⚙️ הכנס מפתח API בהגדרות."); setPhase("error"); return; }
    setPhase("loading");
    const system = `אתה דיאטן ספורט מוסמך שמתמחה בתזונה לספורטאים.
אתה מנתח תמונות אוכל ונותן הערכת חלבון, ערכי מזון, וטיפים תזונתיים ספציפיים בעברית.
אתה חמול, מעשי, ומוסר מידע מדויק. הטון שלך חיובי — תמיד מצביע על מה שטוב לפני מה שאפשר לשפר.`;

    const user = `זוהי התמונה שלי של ${mealLabel}.

נתח את הארוחה הזו:
1. **הערכת חלבון** — כמה גרם חלבון בערך?
2. **מה טוב כאן** — מה המזון הזה תורם לאימון?
3. **טיפ אחד לשיפור** — מה אפשר להוסיף/לשנות?
4. **תזמון** — האם זה ארוחת טרום/אחרי אימון טובה?`;

    try {
      const result = await callClaudeVision(apiKey, imageBase64, mediaType, system, user);
      setFeedback(result);
      setPhase("done");
    } catch (e) {
      setError(e.message);
      setPhase("error");
    }
  }

  function reset() { setPhase("idle"); setImageBase64(null); setFeedback(""); setError(""); }

  if (phase === "idle") return (
    <button
      onClick={() => { fileRef.current.accept = "image/*"; fileRef.current.capture = "environment"; fileRef.current.click(); fileRef.current.onchange = e => handleFile(e.target.files[0]); }}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/30 border border-emerald-700/40 text-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-900/50 active:scale-95 transition-all"
    >
      <Camera className="w-3.5 h-3.5" /> נתח AI
      <input ref={fileRef} type="file" accept="image/*" className="hidden" />
    </button>
  );

  return (
    <div className="mt-3 space-y-2">
      {phase === "preview" && imageBase64 && (
        <div className="space-y-2">
          <div className="relative rounded-xl overflow-hidden border border-emerald-700/40">
            <img src={`data:${mediaType};base64,${imageBase64}`} alt="meal" className="w-full h-36 object-cover" />
            <button onClick={reset} className="absolute top-2 right-2 bg-gray-950/80 rounded-full p-1 text-gray-400"><X className="w-3 h-3" /></button>
          </div>
          <button onClick={analyze} className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
            נתח תמונה
          </button>
        </div>
      )}
      {phase === "loading" && (
        <div className="flex items-center gap-2 py-3 bg-emerald-950/20 border border-emerald-700/30 rounded-xl justify-center">
          <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
          <span className="text-emerald-300 text-xs font-bold">מנתח את הארוחה...</span>
        </div>
      )}
      {phase === "done" && (
        <div className="bg-emerald-950/20 border border-emerald-700/30 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 text-[10px] font-black uppercase">ניתוח תזונתי</span>
            </div>
            <button onClick={reset} className="text-gray-600 hover:text-gray-400 transition-colors"><X className="w-3.5 h-3.5" /></button>
          </div>
          <p className="text-gray-200 text-xs leading-relaxed whitespace-pre-wrap">{feedback}</p>
        </div>
      )}
      {phase === "error" && (
        <div className="bg-red-950/20 border border-red-700/40 rounded-xl p-3 space-y-1">
          <p className="text-red-300 text-xs">{error}</p>
          <button onClick={reset} className="text-gray-600 text-xs hover:text-gray-400">נסה שוב</button>
        </div>
      )}
    </div>
  );
}

// ── AI Coach Card (text-only, stats-based coaching) ──────────
function AICoachCard({ apiKey, day, stats, xp, achievements, checklist }) {
  const [phase, setPhase] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  async function getCoaching() {
    if (!apiKey) { setError("⚙️ הכנס מפתח API בהגדרות."); setPhase("error"); return; }
    setPhase("loading");
    const streak = Math.max(0, day - 1);
    const system = `אתה מאמן כושר אישי שמכיר את הספורטאי שלך לעומק.
אתה נותן ניתוח אישי ואמיתי — לא מתנשא, לא שטחי. אתה רואה את הנתונים ומדבר ישירות לאדם.
הסגנון: כמו חבר שגם מאמן — חם, כנה, מעשי. תמיד בעברית.
אורך: 4-6 משפטים, עם טיפ מעשי אחד ספציפי לשבוע הבא.`;

    const user = `זה הספורטאי שלי:
- יום ${day} מתוך 30 באתגר
- רצף: ${streak} ימים רצופים
- אימונים שהושלמו: ${stats.totalWorkouts || 0}
- ימי Perfect Day: ${stats.perfectDays || 0}
- XP שנצבר: ${xp}
- ימי מים: ${stats.waterDays || 0}/30
- ישגים שנפתחו: ${Object.keys(achievements || {}).length}
- היום (${["יום", day].join(" ")}): ${Object.values(checklist).filter(Boolean).length}/4 משימות הושלמו

תן לי ניתוח אישי — מה אני עושה טוב, מה הנקודה הכי חלשה שלי, ומה הפוקוס שלי לשבוע הבא.`;

    try {
      const result = await callClaudeText(apiKey, system, user);
      setFeedback(result);
      setPhase("done");
    } catch (e) {
      setError(e.message);
      setPhase("error");
    }
  }

  return (
    <div className="glass-card rounded-2xl p-5 border border-purple-700/40 bg-gradient-to-br from-purple-950/30 to-gray-900/80">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-black text-sm uppercase tracking-wider">מאמן אישי AI</h3>
        {phase === "done" && <CheckCheck className="w-4 h-4 text-green-400 mr-auto" />}
      </div>

      {phase === "idle" && (
        <div className="space-y-3">
          <p className="text-gray-400 text-sm leading-relaxed">
            קבל ניתוח אישי מהמאמן AI שלך — מה עובד, מה לשפר, ופוקוס לשבוע הבא.
          </p>
          <button
            onClick={getCoaching}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white rounded-xl font-black uppercase tracking-widest text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> קבל ניתוח אישי
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="flex items-center justify-center gap-3 py-6">
          <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          <span className="text-purple-300 text-sm font-bold">המאמן מנתח את הביצועים שלך...</span>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-3">
          <div className="bg-gray-900/60 rounded-xl p-4 border border-gray-700/40">
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{feedback}</p>
          </div>
          <button
            onClick={() => { setPhase("idle"); setFeedback(""); }}
            className="w-full py-2 border border-gray-700/40 text-gray-500 hover:text-purple-300 hover:border-purple-700/40 rounded-xl text-xs font-bold transition-all"
          >
            רענן ניתוח
          </button>
        </div>
      )}

      {phase === "error" && (
        <div className="space-y-2">
          <div className="bg-red-950/20 border border-red-700/40 rounded-xl p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
          <button onClick={() => { setPhase("idle"); setError(""); }} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">נסה שוב</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// BOTTOM NAV
// ============================================================
function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "בית", Icon: Home },
    { id: "workout", label: "אימון", Icon: Dumbbell },
    { id: "nutrition", label: "תזונה", Icon: Apple },
    { id: "coach", label: "מאמן", Icon: Bot },
    { id: "progress", label: "סטטיסטיקה", Icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-gray-950/95 backdrop-blur-lg border-t border-gray-800/60 flex justify-around items-center px-2 py-2 z-40">
      {tabs.map(({ id, label, Icon: NavIcon }) => { // eslint-disable-line no-unused-vars
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 ${active
              ? "bg-blue-600/90 text-white nav-active scale-105"
              : "text-gray-500 hover:text-gray-300 active:scale-95"
              }`}
          >
            <NavIcon className={`w-5 h-5 ${active ? "drop-shadow-lg" : ""}`} />
            <span className="text-[10px] font-semibold tracking-wide">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ============================================================
// DASHBOARD TAB
// ============================================================
function DashboardTab({ day, setDay, checklist, setChecklist, water, setWater, xp, achievements, stats, addXp }) {
  const [recentPenalty, setRecentPenalty] = useState(null);
  const progress = ((day - 1) / TOTAL_DAYS) * 100;
  const dayKey = WEEK_PATTERN[(day - 1) % WEEK_PATTERN.length];
  const meta = DAY_META[dayKey];
  const daysLeft = TOTAL_DAYS - day + 1;
  const quote = DAILY_QUOTES[(day - 1) % DAILY_QUOTES.length];

  const waterPct = Math.min((water / WATER_GOAL_ML) * 100, 100);
  const drops = Math.round(water / WATER_STEP_ML);
  const totalDrops = Math.round(WATER_GOAL_ML / WATER_STEP_ML);

  // Gamification Data
  const currentLevel = getLevel(xp);
  const nextLevel = getNextLevel(xp);
  const levelProgress = nextLevel
    ? ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  function toggleCheck(key) {
    const wasChecked = checklist[key];
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    if (!wasChecked) {
      addXp(XP_REWARDS.DAILY_GOAL);
    }
  }

  const DAILY_GOALS = [
    { key: "workout", label: "אימון הושלם", emoji: "🏋️" },
    { key: "protein", label: "יעד חלבון הושג", emoji: "🥩" },
    { key: "water", label: "יעד מים (2.5 ליטר)", emoji: "💧" },
    { key: "sleep", label: "7+ שעות שינה", emoji: "😴" },
  ];

  const doneCount = DAILY_GOALS.filter(g => checklist[g.key]).length;
  const allDone = doneCount === DAILY_GOALS.length;

  // Today's mission summary
  const completedMissions = [
    checklist.workout, checklist.protein, checklist.water, checklist.sleep
  ].filter(Boolean).length;
  const missionPercent = Math.round((completedMissions / 4) * 100);

  return (
    <div className="p-4 space-y-4 pb-6 tab-enter">

      {/* ===== TODAY'S MISSION CARD ===== */}
      <div className={`rounded-2xl p-5 border relative overflow-hidden ${completedMissions === 4
        ? "bg-gradient-to-br from-green-900/40 to-emerald-900/20 border-green-500/50"
        : "bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border-blue-500/30"
        }`}>
        {/* background glow */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">🎯 המשימה להיום</div>
            <div className="text-white font-black text-xl mt-0.5">אתגר יום {day}</div>
          </div>
          <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center border-2 font-black ${completedMissions === 4 ? "border-green-400 text-green-400" : "border-blue-400 text-blue-400"
            }`}>
            <span className="text-lg leading-none">{completedMissions}</span>
            <span className="text-[9px] text-gray-500 font-bold">/4</span>
          </div>
        </div>
        {/* Mission items — tap to check off */}
        <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">לחץ לסימון ביצוע</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { key: "workout", icon: "🏋️", label: "אימון" },
            { key: "protein", icon: "🥩", label: "חלבון" },
            { key: "water", icon: "💧", label: "2.5 ל' מים" },
            { key: "sleep", icon: "😴", label: "7 ש' שינה" },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => toggleCheck(key)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold text-left transition-all active:scale-95 card-interactive ${checklist[key]
                ? "bg-green-900/30 border-green-600/50 text-green-300"
                : "bg-gray-800/50 border-gray-700/40 text-gray-400 hover:border-gray-600/60"
                }`}
            >
              <span>{icon}</span>
              <span className="flex-1">{label}</span>
              {checklist[key] && <span className="text-green-400 text-xs">✓</span>}
            </button>
          ))}
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full progress-smooth ${completedMissions === 4
              ? "bg-gradient-to-r from-green-500 to-emerald-400"
              : "bg-gradient-to-r from-blue-600 to-cyan-400"
              }`}
            style={{ width: `${missionPercent}%` }}
          />
        </div>
        {completedMissions === 4 && (
          <div className="text-center text-green-400 font-black text-sm mt-2 confetti-burst">
            🎉 יום מושלם! +50 XP נוספו!
          </div>
        )}
      </div>

      {/* XP & Level Bar */}
      <div className="glass-card rounded-2xl p-4 border border-blue-500/30 overflow-hidden relative">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentLevel.emoji}</span>
            <div>
              <div className={`font-black text-xs uppercase tracking-widest ${currentLevel.color}`}>
                רמה {currentLevel.index + 1}: {currentLevel.name}
              </div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                {xp} XP סה"כ
              </div>
            </div>
          </div>
          {nextLevel && (
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-bold uppercase">הבאה: {nextLevel.name}</div>
              <div className="text-[10px] text-blue-400 font-black">עוד {nextLevel.minXP - xp} XP לעלייה</div>
            </div>
          )}
        </div>
        <div className="h-2.5 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 progress-smooth"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        {/* Glow effect */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/10 blur-2xl rounded-full" />
      </div>

      {/* Motivational Quote */}
      <div className="glass-card rounded-2xl p-4 border border-blue-800/30">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm italic leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>

      {/* Day Card */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">האתגר היומי</div>
            <div className="text-4xl font-black text-gradient mt-0.5">יום {day}</div>
            <div className="text-lg text-gray-300 mt-1">
              {meta.emoji} {meta.label}
            </div>
          </div>
          <div className="text-right bg-blue-900/30 border border-blue-700/40 rounded-xl px-4 py-3 glass-card">
            <div className="text-3xl font-black text-blue-400">{daysLeft}</div>
            <div className="text-gray-500 text-xs font-semibold">ימים נותרו</div>
          </div>
        </div>

        {/* Streak */}
        {day > 1 && (
          <div className="flex items-center gap-2 mb-4 bg-orange-950/30 border border-orange-700/30 rounded-xl px-4 py-2.5">
            <span className="text-xl streak-fire">🔥</span>
            <span className="text-orange-300 font-bold text-sm">רצף של {day - 1} ימים!</span>
            <span className="text-gray-500 text-xs mr-auto text-left">תמשיך ככה!</span>
          </div>
        )}

        {/* 30-day progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold">התקדמות האתגר</span>
            <span className="font-bold text-gray-300">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 progress-smooth"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>התחלה</span>
            <span>יום 30 🏆</span>
          </div>
        </div>

        {/* Daily goal mini-stat */}
        <div className={`mt-4 rounded-xl px-4 py-2.5 flex items-center justify-between transition-all duration-500 ${allDone ? "bg-green-900/30 border border-green-600/50 confetti-burst" : "bg-gray-700/40 border border-gray-700/50"
          }`}>
          <span className="text-gray-300 text-sm font-medium">מטרות יומיות הושלמו</span>
          <span className={`font-bold text-lg ${allDone ? "text-green-400" : "text-white"}`}>
            {doneCount}/{DAILY_GOALS.length}
            {allDone && " 🎉"}
          </span>
        </div>

        {/* Day Selector */}
        <div className="mt-5 pt-4 border-t border-gray-700/50">
          <div className="text-gray-500 text-xs font-bold tracking-widest mb-3 uppercase flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> תצוגה מקדימה לתוכנית
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max={TOTAL_DAYS}
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="bg-gray-700/80 px-3 py-1.5 rounded-lg text-white font-bold text-sm min-w-[60px] text-center border border-gray-600/40">
              יום {day}
            </div>
          </div>
        </div>
      </div>

      {/* Water Tracker */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-400" />
          מעקב מים
        </h3>
        <div className="text-gray-400 text-sm mb-3">
          {water} מ"ל / {WATER_GOAL_ML} מ"ל
          {waterPct >= 100 && <span className="text-cyan-400 font-semibold mr-2">— היעד הושג! 💧</span>}
        </div>

        {/* Drop icons */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Array.from({ length: totalDrops }).map((_, i) => (
            <div
              key={i}
              onClick={() => setWater(Math.min(WATER_GOAL_ML + 500, (i + 1) * WATER_STEP_ML))}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-base cursor-pointer transition-all active:scale-90 ${i < drops ? "bg-cyan-500/20 text-cyan-400 water-drop-active" : "bg-gray-700/60 text-gray-600"
                }`}
            >
              💧
            </div>
          ))}
        </div>

        <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-blue-400 progress-smooth"
            style={{ width: `${waterPct}%` }}
          />
        </div>

        {/* Quick-fill buttons */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setWater(Math.round(WATER_GOAL_ML / 2))}
            className="flex-1 py-2.5 bg-gray-700/60 text-cyan-300 rounded-xl text-xs font-bold border border-gray-600/40 active:scale-95 transition-all hover:bg-gray-700"
          >
            חצי יעד (1.25ל')
          </button>
          <button
            onClick={() => setWater(WATER_GOAL_ML)}
            className="flex-1 py-2.5 bg-gray-700/60 text-cyan-300 rounded-xl text-xs font-bold border border-gray-600/40 active:scale-95 transition-all hover:bg-gray-700"
          >
            יעד מלא (2.5ל')
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setWater(w => Math.max(0, w - WATER_STEP_ML))}
            className="flex-none w-14 py-4 bg-gray-700/60 text-white rounded-xl font-bold text-xl active:scale-95 transition-transform border border-gray-600/40"
          >
            −
          </button>
          <button
            onClick={() => setWater(w => Math.min(WATER_GOAL_ML + 1000, w + WATER_STEP_ML))}
            className="flex-1 py-4 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white rounded-xl font-bold text-base active:scale-95 transition-all"
          >
            + 250 מ"ל
          </button>
          <button
            onClick={() => setWater(0)}
            className="flex-none w-14 py-4 bg-gray-700/60 text-gray-400 rounded-xl flex items-center justify-center active:scale-95 transition-transform border border-gray-600/40"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 30-Day Body Evolution Roadmap */}
      <div className="glass-card rounded-2xl p-5 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-black text-sm uppercase tracking-widest">אבולוציה של 30 יום</h3>
        </div>
        <div className="space-y-4">
          {TRANSFORMATION_TIMELINE.map((step) => {
            const isUnlocked = day >= step.unlockDay;
            return (
              <div key={step.week} className={`relative pr-8 border-r-2 ${isUnlocked ? "border-purple-500/50" : "border-gray-800"}`}>
                <div className={`absolute -right-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${isUnlocked ? "bg-purple-900 border-purple-500 text-purple-100" : "bg-gray-900 border-gray-800 text-gray-700"}`}>
                  {step.week}
                </div>
                <div className={isUnlocked ? "" : "opacity-40 grayscale"}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-white uppercase tracking-tight">{step.title}</span>
                    <span className="text-xs">{step.emoji}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 leading-relaxed italic mb-1">{step.body}</div>
                  <div className="text-[10px] text-purple-300 font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {step.feel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Unlocks */}
      <div className="glass-card rounded-2xl p-5 border border-amber-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-white font-black text-sm uppercase tracking-widest">הישגים</h3>
          </div>
          <div className="text-[10px] text-amber-500 font-black uppercase">
            {Object.keys(achievements || {}).length} / {ACHIEVEMENTS.length}
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {ACHIEVEMENTS.map((ach) => {
            const isDone = achievements?.[ach.id] === true;
            const prog = !isDone ? getAchievementProgress(ach.id, stats || {}, day) : null;
            const pct = prog ? Math.round((prog.current / prog.target) * 100) : 0;
            return (
              <div key={ach.id} className={`flex-shrink-0 w-24 p-3 rounded-xl border text-center transition-all ${isDone ? "bg-amber-900/20 border-amber-500/40" : "bg-gray-900/40 border-gray-800"}`}>
                <div className={`text-2xl mb-1 ${isDone ? "" : "grayscale opacity-50"}`}>{ach.emoji}</div>
                <div className={`text-[9px] font-black uppercase leading-tight line-clamp-2 mb-1 ${isDone ? "text-amber-300" : "text-gray-500"}`}>{ach.label}</div>
                {isDone
                  ? <div className="text-green-400 text-[9px] font-black">✓ בוצע</div>
                  : prog
                    ? (
                      <div className="mt-1">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                            style={{ width: `${Math.max(4, pct)}%` }}
                          />
                        </div>
                        <div className="text-gray-600 text-[8px] mt-0.5">{prog.current}/{prog.target}</div>
                      </div>
                    )
                    : <div className="text-gray-700 text-[9px]">🔒</div>
                }
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Achievement nudge */}
      {(() => {
        const nextAch = ACHIEVEMENTS.find(a => !achievements?.[a.id]);
        if (!nextAch) return null;
        return (
          <div className="glass-card rounded-2xl p-4 border border-purple-700/30 bg-purple-900/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-2xl flex-shrink-0">
                {nextAch.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-widest font-black text-purple-400 mb-0.5">הישג הבא</div>
                <div className="text-white font-bold text-sm">{nextAch.label}</div>
                <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">{nextAch.desc}</div>
              </div>
              <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
            </div>
          </div>
        );
      })()}

      {/* ===== DAILY ACCOUNTABILITY — PENALTY BOARD ===== */}
      <div className="glass-card rounded-2xl p-5 border border-red-900/40 bg-red-950/10">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-red-300 font-bold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            לוח אחריות יומי
          </h3>
          {recentPenalty && (
            <div className="text-red-400 font-black text-xs animate-pulse">{recentPenalty} XP ⬇</div>
          )}
        </div>
        <div className="text-gray-500 text-xs mb-4 leading-relaxed">
          דווח בכנות על כל התנהגות לא בריאה שביצעת היום. העונש הקטן הוא תמריץ — לא ביקורת.
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "meal",    label: "ארוחה לא בריאה",      emoji: "🍔", xp: -15, desc: "ג'אנק, ממתקים, מטוגן" },
            { key: "water",   label: "לא שתיתי מספיק מים",  emoji: "💧", xp: -10, desc: "פחות מ-2 ליטר" },
            { key: "workout", label: "דילגתי על אימון",      emoji: "🏋️", xp: -20, desc: "יום אימון שהוחמץ" },
            { key: "sleep",   label: "שינה לא מספקת",       emoji: "😴", xp: -10, desc: "פחות מ-7 שעות" },
            { key: "stress",  label: "אכילה מלחץ / שעמום",  emoji: "😤", xp: -10, desc: "אכלתי כי לחוץ/משועמם" },
            { key: "skip",    label: "דילגתי על ארוחה",     emoji: "⏭️", xp: -10, desc: "פספסתי ארוחה מתוכננת" },
          ].map(p => (
            <button
              key={p.key}
              onClick={() => {
                addXp(p.xp);
                setRecentPenalty(p.xp);
                setTimeout(() => setRecentPenalty(null), 2000);
              }}
              className="flex flex-col items-start gap-1 p-3 bg-red-950/30 hover:bg-red-900/30 border border-red-900/40 hover:border-red-700/50 rounded-xl active:scale-95 transition-all text-right"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xl">{p.emoji}</span>
                <span className="text-red-400 font-black text-xs">{p.xp} XP</span>
              </div>
              <div className="text-red-200 text-[11px] font-bold leading-tight">{p.label}</div>
              <div className="text-gray-600 text-[9px]">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EXERCISE CARD (Strength days) — with muscle pills + rest timer
// ============================================================
function ExerciseCard({ exercise, completed, onToggle }) {
  const [open, setOpen] = useState(false);
  const [pacingActive, setPacingActive] = useState(false);
  const [restTimer, setRestTimer] = useState(null); // null = not running, number = seconds left
  const restRef = useRef(null);

  const MUSCLE_COLORS = {
    "גב ויד קדמית": "bg-blue-900/40 text-blue-300 border-blue-700/40",
    "ארבע-ראשי וישבן": "bg-green-900/40 text-green-300 border-green-700/40",
    "חזה ויד אחורית": "bg-red-900/40 text-red-300 border-red-700/40",
    "כתפיים": "bg-violet-900/40 text-violet-300 border-violet-700/40",
    "יד קדמית": "bg-blue-900/40 text-blue-300 border-blue-700/40",
    "ליבה": "bg-amber-900/40 text-amber-300 border-amber-700/40",
    "התאוששות": "bg-emerald-900/40 text-emerald-300 border-emerald-700/40",
    "שרשרת אחורית": "bg-orange-900/40 text-orange-300 border-orange-700/40",
    "חזה וכתפיים": "bg-pink-900/40 text-pink-300 border-pink-700/40",
    "גב עליון": "bg-cyan-900/40 text-cyan-300 border-cyan-700/40",
    "ישבן וגב": "bg-teal-900/40 text-teal-300 border-teal-700/40",
    "רגליים": "bg-lime-900/40 text-lime-300 border-lime-700/40",
    "יד אחורית": "bg-rose-900/40 text-rose-300 border-rose-700/40",
    "ישבן": "bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-700/40",
  };

  function startRest(seconds) {
    setRestTimer(seconds);
    clearInterval(restRef.current);
    restRef.current = setInterval(() => {
      setRestTimer(prev => {
        if (prev <= 1) {
          clearInterval(restRef.current);
          if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => () => clearInterval(restRef.current), []);

  const pillClass = MUSCLE_COLORS[exercise.muscles] || "bg-gray-700/40 text-gray-300 border-gray-600/40";

  return (
    <div className={`rounded-2xl border transition-all duration-200 card-interactive ${completed ? "border-green-700/60 bg-green-900/15" : "border-gray-700/50 bg-gray-800/80 glass-card"
      }`}>
      <div className="flex items-center gap-3 p-4">
        <button onClick={onToggle} className="flex-shrink-0 active:scale-90 transition-transform">
          {completed
            ? <CheckCircle className="w-7 h-7 text-green-400" />
            : <Circle className="w-7 h-7 text-gray-500" />
          }
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white">
            {exercise.emoji} {exercise.name}
          </div>
          <div className="text-gray-400 text-sm">{exercise.sets}</div>
          <div className={`muscle-pill mt-1 border ${pillClass}`}>
            {exercise.muscles}
          </div>
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-gray-500 p-1 active:scale-90 transition-transform"
        >
          <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="px-4 pb-4 border-t border-gray-700/40 pt-4 space-y-4">
          {/* Exercise Demo GIF */}
          {(EXERCISE_GIFS[exercise.name] || exercise.image) && (
            <div className="relative rounded-xl overflow-hidden mb-4 border border-blue-700/40 shadow-inner demo-glow">
              <img
                src={EXERCISE_GIFS[exercise.name] || exercise.image}
                alt={`${exercise.name} demonstration`}
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-blue-500/30">
                <Play className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">הדגמה חיה</span>
              </div>
            </div>
          )}

          {/* Pacing */}
          <div className="flex justify-between items-center bg-gray-900/40 p-2.5 rounded-lg border border-gray-700/40">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">מדריך קצב ויזואלי</span>
            <button
              onClick={() => setPacingActive(!pacingActive)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${pacingActive ? "bg-red-600/90 text-white" : "bg-blue-600/90 text-white hover:bg-blue-500"
                }`}
            >
              {pacingActive ? "עצור" : "הפעל מדריך"}
            </button>
          </div>

          <VisualPacer tempo={exercise.tempo} running={pacingActive} />

          {/* Rest Timer */}
          <div className="bg-gray-900/40 rounded-xl p-3 border border-gray-700/40">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Timer className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">טיימר מנוחה</span>
              {restTimer !== null && (
                <span className="mr-auto text-2xl font-black text-cyan-400 tabular-nums">{restTimer} ש'</span>
              )}
            </div>
            {restTimer === null ? (
              <div className="flex gap-2">
                {[60, 90, 120].map(s => (
                  <button
                    key={s}
                    onClick={() => startRest(s)}
                    className="flex-1 py-2 bg-gray-700/60 text-gray-300 rounded-lg text-xs font-bold active:scale-95 transition-all hover:bg-gray-600/60 border border-gray-600/30"
                  >
                    {s} ש'
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => { clearInterval(restRef.current); setRestTimer(null); }}
                className="w-full py-2 bg-red-900/40 text-red-300 rounded-lg text-xs font-bold active:scale-95 transition-all border border-red-700/40"
              >
                בטל מנוחה
              </button>
            )}
          </div>

          {/* Step-by-Step Instructions */}
          {exercise.howTo && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">מדריך צעד אחר צעד</span>
              </div>
              <div className="space-y-2.5 pr-6">
                {exercise.howTo.map((step, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black border border-emerald-500/30">
                      {idx + 1}
                    </span>
                    <span className="text-gray-300 leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert Guidance */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-blue-400">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">דגש המאמן</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed pr-6 italic">
              "{exercise.focus || "שמור על נשימה קצובה ושליטה לאורך כל התנועה."}"
            </p>
          </div>

          {/* Form tip */}
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-3 flex gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-amber-400 text-xs font-bold tracking-widest mb-1">טיפ טכניקה</div>
              <div className="text-amber-200/80 text-sm leading-relaxed">{exercise.tip}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// HIIT TIMER
// ============================================================
function HIITTimer({ useAlt = false }) {
  const HIIT_LIST = useAlt ? HIIT_EXERCISES_ALT : HIIT_EXERCISES;
  const [exIdx, setExIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isWork, setIsWork] = useState(true);
  const [running, setRunning] = useState(false);
  const [round, setRound] = useState(1);
  const TOTAL_ROUNDS = 5;
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setExIdx(0);
    setTimeLeft(WORK_TIME);
    setIsWork(true);
    setRound(1);
    setDone(false);
  }, []);

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }

    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t > 1) return t - 1;

        // Phase transition
        if (isWork) {
          setIsWork(false);
          return REST_TIME;
        }

        // Move to next exercise
        const nextEx = exIdx + 1;
        if (nextEx >= HIIT_LIST.length) {
          if (round >= TOTAL_ROUNDS) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setDone(true);
            return 0;
          }
          setRound(r => r + 1);
          setExIdx(0);
        } else {
          setExIdx(nextEx);
        }
        setIsWork(true);
        return WORK_TIME;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running, isWork, exIdx, round]);

  const maxTime = isWork ? WORK_TIME : REST_TIME;
  const pct = timeLeft / maxTime;
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const ex = HIIT_LIST[exIdx];

  return (
    <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-400" />
        אימון HIIT — 40 ש' עבודה / 20 ש' מנוחה
      </h3>

      {done ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">🎉</div>
          <div className="text-white font-black text-2xl">סיימת את ה-HIIT!</div>
          <div className="text-gray-400 mt-2">{TOTAL_ROUNDS} סבבים · עבודה מצוינת!</div>
          <button
            onClick={reset}
            className="mt-5 px-8 py-3 bg-orange-600 text-white rounded-xl font-bold active:scale-95 transition-transform"
          >
            הפעל סבב מחדש
          </button>
        </div>
      ) : (
        <>
          {/* Circular Timer */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg width="130" height="130" className={`-rotate-90 ${running ? (isWork ? "timer-pulse-work" : "timer-pulse-rest") : ""}`}>
                <circle cx="65" cy="65" r={radius} fill="none" stroke="#1f2937" strokeWidth="10" />
                <circle
                  cx="65" cy="65" r={radius}
                  fill="none"
                  stroke={isWork ? "url(#workGrad)" : "url(#restGrad)"}
                  strokeWidth="10"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct)}
                  strokeLinecap="round"
                  className="rest-timer-ring"
                />
                <defs>
                  <linearGradient id="workGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                  <linearGradient id="restGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-white tabular-nums">{timeLeft}</div>
                <div className={`text-xs font-bold tracking-widest ${isWork ? "text-orange-400" : "text-cyan-400"}`}>
                  {isWork ? "עבודה" : "מנוחה"}
                </div>
              </div>
            </div>
          </div>

          {/* Current exercise + GIF */}
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-white">{ex.name}</div>
            <div className="text-gray-400 text-sm mt-0.5">
              סבב {round}/{TOTAL_ROUNDS} · תרגיל {exIdx + 1}/{HIIT_LIST.length}
            </div>
          </div>

          {/* Exercise GIF - shows only during WORK phase */}
          {EXERCISE_GIFS[ex.name] && isWork && (
            <div className="relative rounded-xl overflow-hidden mb-3 border border-orange-700/40">
              <img
                src={EXERCISE_GIFS[ex.name]}
                alt={ex.name}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/60 rounded-lg border border-orange-500/30">
                <span className="text-[10px] font-bold text-orange-300 uppercase">צא!</span>
              </div>
            </div>
          )}
          {!isWork && (
            <div className="rounded-xl bg-cyan-900/20 border border-cyan-700/40 p-4 mb-3 text-center">
              <div className="text-cyan-400 font-black text-lg">😮‍💨 מנוחה</div>
              <div className="text-gray-400 text-xs mt-1">הבא: {HIIT_LIST[(exIdx + 1) % HIIT_LIST.length]?.name}</div>
            </div>
          )}

          {/* Form tip */}
          <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3 mb-4 flex gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-amber-200 text-sm">{ex.tip}</div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setRunning(r => !r)}
              className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all ${running ? "bg-gray-700 text-white" : "bg-orange-600 text-white"
                }`}
            >
              {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={reset}
              className="w-14 py-4 bg-gray-700 text-gray-300 rounded-xl flex items-center justify-center active:scale-95 transition-transform"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Exercise list */}
          <div className="space-y-1">
            {HIIT_LIST.map((e, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${i === exIdx && running
                  ? "bg-orange-600/20 text-orange-300 border border-orange-700/50 font-semibold"
                  : i < exIdx
                    ? "text-gray-600 line-through"
                    : "text-gray-500"
                  }`}
              >
                <span className="font-mono w-4">{i + 1}.</span>
                <span>{e.name}</span>
                {i === exIdx && running && (
                  <span className="ml-auto text-orange-400 text-xs animate-pulse">▶ NOW</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// WORKOUT TAB
// ============================================================
function WorkoutTab({ day, completedExercises, setCompletedExercises, addXp, stats, setStats, penalizedDays, setPenalizedDays }) {
  const dayKey = WEEK_PATTERN[(day - 1) % WEEK_PATTERN.length];
  const meta = DAY_META[dayKey];
  // Weeks 2 & 4 (cycle index 1 & 3) use alternate workouts for progression variety
  const weekCycle = Math.floor((day - 1) / 7); // 0=wk1, 1=wk2, 2=wk3, 3=wk4+
  const useAlt = weekCycle % 2 === 1;
  const exercises = (useAlt && STRENGTH_EXERCISES_ALT[dayKey])
    ? STRENGTH_EXERCISES_ALT[dayKey]
    : (STRENGTH_EXERCISES[dayKey] || []);
  const doneCount = exercises.filter(e => completedExercises[e.name]).length;
  const allDone = exercises.length > 0 && doneCount === exercises.length;

  // Detect 2+ consecutive missed workout days (non-REST days before today with no workout logged)
  let missedStreak = 0;
  for (let d = day - 1; d >= 1; d--) {
    const dtype = WEEK_PATTERN[(d - 1) % 7];
    if (dtype === "REST") continue;
    const stored = localStorage.getItem(`ft_checklist_d${d}`);
    if (!stored) break; // no per-day data yet — stop (avoids false positives on migration)
    try {
      const cl = JSON.parse(stored);
      if (cl.workout) { missedStreak = 0; break; }
      missedStreak++;
    } catch { break; }
    if (missedStreak >= 2) break;
  }
  const showMissPenaltyBanner = missedStreak >= 2 && !(penalizedDays || []).includes(day);

  function toggle(name) {
    const isNowDone = !completedExercises[name];
    setCompletedExercises(prev => ({ ...prev, [name]: !prev[name] }));

    if (isNowDone) {
      addXp(XP_REWARDS.DAILY_GOAL); // Give XP per exercise too for motivation
    }
  }

  // Update stats when all exercises are done
  // FIX: added `stats` to deps so the guard check uses fresh state
  useEffect(() => {
    if (allDone && !stats.lastWorkoutDay?.includes(day)) {
      addXp(XP_REWARDS.WORKOUT_COMPLETE);
      setStats(prev => ({
        ...prev,
        totalWorkouts: prev.totalWorkouts + 1,
        strengthDone: ["A", "C", "E"].includes(dayKey) ? prev.strengthDone + 1 : prev.strengthDone,
        hiitDone: dayKey === "B" ? prev.hiitDone + 1 : prev.hiitDone,
        swimDone: dayKey === "D" ? prev.swimDone + 1 : prev.swimDone,
        lastWorkoutDay: [...(prev.lastWorkoutDay || []), day]
      }));
    }
  }, [allDone, day, dayKey, addXp, setStats, stats]);

  return (
    <div className="p-4 space-y-4 pb-6 tab-enter">
      {/* Header card */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">יום {day} · אימון היום</div>
            <div className="text-2xl font-black text-white mt-1">
              {meta.emoji} {meta.label}
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                כ-35-45 דקות בעצימות גבוהה
              </span>
              {useAlt && ["A", "C", "E"].includes(dayKey) && (
                <span className="bg-purple-900/40 border border-purple-600/40 text-purple-300 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                  וריאציה שבוע {weekCycle + 1}
                </span>
              )}
            </div>
          </div>
          {exercises.length > 0 && (
            <div className="bg-gray-700/40 rounded-xl px-4 py-2 text-right border border-gray-600/30">
              <div className="text-2xl font-black text-blue-400">{doneCount}/{exercises.length}</div>
              <div className="text-gray-500 text-xs font-semibold">הושלמו</div>
            </div>
          )}
        </div>

        {exercises.length > 0 && (
          <div className="mt-4">
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full progress-smooth ${allDone ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-blue-500 to-cyan-400"
                  }`}
                style={{ width: `${(doneCount / exercises.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {allDone && (
        <div className="bg-green-900/20 border border-green-700/50 rounded-2xl p-5 text-center confetti-burst glass-card">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-green-400 font-black text-xl">אימון הושלם!</div>
          <div className="text-gray-400 text-sm mt-1">עבודה מעולה. אל תשכח עיסוי עם גלגלת!</div>
        </div>
      )}

      {/* Content per day type */}
      {dayKey === "B" && <HIITTimer useAlt={useAlt} />}

      {["A", "C", "E"].includes(dayKey) && (
        <div className="space-y-3">
          <div className="text-gray-500 text-xs px-1 uppercase tracking-wider font-semibold">
            לחץ על תרגיל לסימון ביצוע · לחץ על החץ לפרטים
          </div>
          {exercises.map(ex => (
            <ExerciseCard
              key={ex.name}
              exercise={ex}
              completed={!!completedExercises[ex.name]}
              onToggle={() => toggle(ex.name)}
            />
          ))}
        </div>
      )}

      {dayKey === "D" && (
        <div className="space-y-4">
          {SWIM_PILATES_ACTIVITIES.map(act => (
            <div key={act.label} className="glass-card rounded-2xl border border-gray-700/50 overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <img src={act.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={act.label} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl">{act.emoji}</span>
                    <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{act.label}</h3>
                  </div>
                  <p className="text-cyan-300 text-xs font-bold uppercase tracking-wider">{act.detail}</p>
                </div>
              </div>
              <div className="p-5">

                {/* Exercise List */}
                <div className="space-y-2 mb-4">
                  {act.exercises.map(ex => (
                    <div key={ex.name} className="flex justify-between items-center bg-gray-700/30 p-3 rounded-xl border border-gray-600/30">
                      <div>
                        <div className="text-white text-sm font-semibold">{ex.name}</div>
                        <div className="text-gray-400 text-xs">{ex.tip}</div>
                      </div>
                      <div className="text-blue-400 text-sm font-bold">{ex.sets}</div>
                    </div>
                  ))}
                </div>

                {/* Session Pacer */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">מדריך קצב</span>
                  </div>
                  <VisualPacer tempo={act.tempo} running={true} />
                </div>

                <div className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-3 flex gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-200/80 text-sm">שמור על צוואר ניטרלי. תמוך עם מגבת אם צריך בפילאטיס.</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {dayKey === "REST" && (
        <div className="glass-card rounded-2xl border border-gray-700/50 p-8 text-center">
          <div className="text-6xl mb-4">😴</div>
          <div className="text-white font-black text-2xl">יום מנוחה</div>
          <div className="text-gray-400 mt-2 mb-4">התאוששות היא קריטית — הרווחת אותה ביושר.</div>
          <div className="bg-gray-700/30 rounded-xl p-4 text-right space-y-2 border border-gray-600/30">
            <div className="text-gray-300 text-sm font-semibold">הצעות להתאוששות:</div>
            {["מתיחות קלות או יוגה", 'גליל עיסוי (Foam Roll) - הימנע מהצוואר', "הליכה נעימה של 20 דקות", "שתה הרבה מים", "שינה של 7–9 שעות"].map(s => (
              <div key={s} className="text-gray-400 text-sm flex gap-2">
                <span className="text-green-500">✓</span><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consecutive missed workout penalty banner */}
      {showMissPenaltyBanner && (
        <div className="bg-orange-950/40 border border-orange-700/50 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-orange-300 font-bold text-sm">2 אימונים רצופים הוחמצו</div>
              <div className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                היעדרות רצופה שוברת מומנטום. קבל את העונש וחזור למסלול — זה הצעד הראשון.
              </div>
            </div>
          </div>
          <button
            onClick={() => { addXp(-30); setPenalizedDays(prev => [...(prev || []), day]); }}
            className="w-full py-2.5 bg-orange-800/60 hover:bg-orange-700/60 border border-orange-700/50 text-orange-200 rounded-xl font-bold text-sm active:scale-95 transition-transform"
          >
            קבל עונש ואפס מצב (−30 XP)
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// NUTRITION TAB
// ============================================================
function NutritionTab({ day, proteinMeals, setProteinMeals, addXp, stats, setStats }) {
  const [randomMeal, setRandomMeal] = useState(null);
  const doneCount = MEAL_SLOTS.filter(m => proteinMeals[m.key]).length;
  const allDone = doneCount === MEAL_SLOTS.length;

  function toggleMeal(key) {
    const wasDone = proteinMeals[key];
    setProteinMeals(prev => ({ ...prev, [key]: !prev[key] }));
    if (!wasDone) {
      addXp(10);
    }
  }

  // FIX: added `stats` to deps so the guard check uses fresh state
  useEffect(() => {
    if (allDone && !stats.lastProteinDay?.includes(day)) {
      addXp(XP_REWARDS.PERFECT_DAY / 2);
      setStats(prev => ({
        ...prev,
        proteinDays: prev.proteinDays + 1,
        lastProteinDay: [...(prev.lastProteinDay || []), day]
      }));
    }
  }, [allDone, day, addXp, setStats, stats]);

  function pickMeal() {
    const idx = Math.floor(Math.random() * MEAL_IDEAS.length);
    setRandomMeal(MEAL_IDEAS[idx]);
  }

  return (
    <div className="p-4 space-y-4 pb-6 tab-enter">
      {/* Protein per meal tracker */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-400" />
          חלבון בכל ארוחה
        </h3>
        <div className="text-gray-400 text-sm mb-3">
          {doneCount}/{MEAL_SLOTS.length} ארוחות עם חלבון היום
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / MEAL_SLOTS.length) * 100}%` }}
          />
        </div>
        <div className="space-y-2">
          {MEAL_SLOTS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleMeal(key)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all active:scale-98 ${proteinMeals[key]
                ? "bg-green-900/30 border-green-600"
                : "bg-gray-700/40 border-gray-600"
                }`}
            >
              {proteinMeals[key]
                ? <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                : <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
              }
              <span className={`font-medium ${proteinMeals[key] ? "text-green-300" : "text-gray-300"}`}>
                🥩 {label}
              </span>
              {proteinMeals[key] && <span className="ml-auto text-green-500 text-sm">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Meal idea generator */}
      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
        <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-yellow-400" />
          רעיונות לארוחות ללא בישול
        </h3>
        <div className="text-gray-400 text-sm mb-4">
          ארוחות עשירות בחלבון — אפס עבודה במטבח
        </div>

        <button
          onClick={pickMeal}
          className="w-full py-3.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold text-base active:scale-95 transition-transform mb-4"
        >
          🎲 הפתע אותי!
        </button>

        {randomMeal && (
          <div className="bg-gray-700 rounded-2xl overflow-hidden border border-yellow-600 mb-4 animate-pulse-once">
            {randomMeal.imageUrl && (
              <img src={randomMeal.imageUrl} alt={randomMeal.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <div className="text-xl font-bold text-white">
                {randomMeal.emoji} {randomMeal.name}
              </div>
              <div className="text-gray-300 text-sm mt-1">{randomMeal.ingredients}</div>
              <div className="flex gap-4 mt-2">
                <span className="text-green-400 text-xs font-semibold">💪 {randomMeal.protein} חלבון</span>
                <span className="text-gray-400 text-xs">⏱ {randomMeal.prep} הכנה</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {MEAL_IDEAS.map(meal => (
            <div key={meal.name} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              {meal.imageUrl && (
                <img src={meal.imageUrl} alt={meal.name} className="w-full h-40 object-cover opacity-80 hover:opacity-100 transition-opacity" />
              )}
              <div className="p-4">
                <div className="font-semibold text-white text-base">{meal.emoji} {meal.name}</div>
                <div className="text-gray-400 text-xs mt-1 leading-relaxed">{meal.ingredients}</div>
                <div className="flex gap-4 mt-2">
                  <span className="text-green-400 text-xs font-semibold">💪 {meal.protein}</span>
                  <span className="text-gray-500 text-xs">⏱ {meal.prep}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder note */}
      <div className="bg-blue-950/40 border border-blue-800 rounded-2xl p-4 flex gap-3">
        <Bell className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-blue-300 font-semibold text-sm mb-0.5">תזכורות מים וחלבון</div>
          <div className="text-gray-400 text-xs leading-relaxed">
            אשר הודעות דפדפן בהפעלה הראשונה כדי לקבל תזכורות מים כל שעה ותזכורות חלבון כל 3 שעות.
          </div>
        </div>
      </div>

      {/* Unhealthy meal penalty */}
      <div className="bg-red-950/30 border border-red-800/50 rounded-2xl p-4">
        <h3 className="text-red-300 font-bold text-sm mb-1 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          אכלתי משהו לא בריא?
        </h3>
        <div className="text-gray-400 text-xs mb-3 leading-relaxed">
          דיווח עצמי כנה מחזיר אחריות. כל דיווח מוריד −15 XP — לא עונש, תמריץ לחשוב פעמיים.
        </div>
        <button
          onClick={() => addXp(-15)}
          className="w-full py-2.5 bg-red-800/60 hover:bg-red-700/60 border border-red-700/50 text-red-200 rounded-xl font-bold text-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          דווח על ארוחה לא בריאה (−15 XP)
        </button>
      </div>
    </div>
  );
}

// ============================================================
// IMAGE COMPRESSION UTILITY
// ============================================================
async function compressImage(file, maxWidth = 800) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

// ============================================================
// PHOTO SLOT COMPONENT
// ============================================================
function PhotoSlot({ week, day, photo, onUpload, onDelete }) {
  const unlocked = day >= week.unlock;
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    if (compressed) onUpload(week.key, compressed);
    e.target.value = "";
  }

  return (
    <div className={`rounded-xl overflow-hidden border-2 transition-all ${unlocked ? "border-pink-600/50" : "border-gray-700 opacity-50"}`}>
      {photo ? (
        <div className="relative">
          <img src={photo} alt={week.label} className="w-full h-36 object-cover" />
          <button
            onClick={() => onDelete(week.key)}
            className="absolute top-1 right-1 bg-red-600/80 rounded-full p-1 active:scale-90"
          >
            <X className="w-3 h-3 text-white" />
          </button>
          <div className="bg-gray-900/80 text-xs text-pink-300 font-bold text-center py-1">{week.label}</div>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center py-5 bg-pink-900/10 ${unlocked ? "cursor-pointer" : "cursor-default pointer-events-none"}`}
          onClick={() => unlocked && inputRef.current?.click()}
        >
          <Camera className={`w-6 h-6 mb-2 ${unlocked ? "text-pink-400" : "text-gray-700"}`} />
          <div className={`text-xs font-bold ${unlocked ? "text-pink-300" : "text-gray-600"}`}>{week.label}</div>
          <div className="text-gray-600 text-[9px]">{week.range}</div>
          {unlocked
            ? <div className="text-pink-500 text-[9px] mt-1">הקש להעלאה</div>
            : <div className="text-gray-700 text-[9px] mt-1">🔒 יום {week.unlock}</div>
          }
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ============================================================
// WEEKLY ANALYSIS COMPONENT
// ============================================================
const REST_DAY_NUMS = new Set(
  Array.from({ length: 30 }, (_, i) => i + 1).filter(d => WEEK_PATTERN[(d - 1) % 7] === "REST")
);

function WeeklyAnalysis({ weekDays, currentDay }) {
  const doneDays = weekDays.filter(d => d <= currentDay);
  if (doneDays.length === 0) return null;

  // Only analyze days that have per-day checklist data
  const workoutDays = doneDays.filter(d => !REST_DAY_NUMS.has(d));
  let workouts = 0, protein = 0, water = 0, hasData = false;

  doneDays.forEach(d => {
    const stored = localStorage.getItem(`ft_checklist_d${d}`);
    if (!stored) return;
    hasData = true;
    try {
      const cl = JSON.parse(stored);
      if (cl.workout) workouts++;
      if (cl.protein) protein++;
      if (cl.water) water++;
    } catch { /* ignore */ }
  });

  if (!hasData) return null;

  const pct = (n, total) => total === 0 ? 0 : Math.round((n / total) * 100);
  const workoutPct = pct(workouts, workoutDays.filter(d => d <= currentDay).length);
  const proteinPct = pct(protein, doneDays.length);
  const waterPct = pct(water, doneDays.length);

  const bars = [
    { label: "אימונים", value: workoutPct, color: "bg-blue-500" },
    { label: "חלבון", value: proteinPct, color: "bg-green-500" },
    { label: "מים", value: waterPct, color: "bg-cyan-500" },
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700/40 rounded-xl p-3 mt-3 space-y-2">
      <div className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">ניתוח שבועי</div>
      {bars.map(bar => (
        <div key={bar.label}>
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-gray-400">{bar.label}</span>
            <span className={`font-bold ${bar.value >= 80 ? "text-green-400" : bar.value >= 50 ? "text-yellow-400" : "text-red-400"}`}>{bar.value}%</span>
          </div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full ${bar.color} rounded-full transition-all duration-500`} style={{ width: `${bar.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// Photo week definitions
const PHOTO_WEEKS = [
  { key: "week1", label: "שבוע 1", range: "יום 1–7", unlock: 1, days: [1,2,3,4,5,6,7] },
  { key: "week2", label: "שבוע 2", range: "יום 8–14", unlock: 8, days: [8,9,10,11,12,13,14] },
  { key: "week3", label: "שבוע 3", range: "יום 15–21", unlock: 15, days: [15,16,17,18,19,20,21] },
  { key: "week4", label: "שבוע 4", range: "יום 22–30", unlock: 22, days: [22,23,24,25,26,27,28,29,30] },
];

// ============================================================
// PROGRESS TAB
// ============================================================
function ProgressTab({ weightLog, setWeightLog, day, addXp, setStats, stats, xp, achievements, photos, setPhotos }) {
  const [inputWeight, setInputWeight] = useState("");

  function logWeight() {
    const w = parseFloat(inputWeight);
    if (!w || w < 30 || w > 300) return;
    const dateStr = new Date().toLocaleDateString("he-IL", {
      day: "numeric", month: "short", year: "numeric",
    });
    setWeightLog(prev => [...prev, { date: dateStr, weight: w, day }]);
    setInputWeight("");
    addXp(25);
    setStats(prev => ({ ...prev, weighIns: prev.weighIns + 1 }));
  }

  const first = weightLog[0];
  const latest = weightLog[weightLog.length - 1];
  const change = first && latest && weightLog.length > 1
    ? (latest.weight - first.weight).toFixed(1)
    : null;

  // Build 30-day completion history from localStorage
  const dayHistory = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const d = i + 1;
    if (d > day) return { day: d, done: -1, isPast: false, isToday: false }; // future
    try {
      const stored = localStorage.getItem(`ft_checklist_d${d}`);
      if (!stored) return { day: d, done: 0, isPast: d < day, isToday: d === day };
      const cl = JSON.parse(stored);
      const done = [cl.workout, cl.protein, cl.water, cl.sleep].filter(Boolean).length;
      return { day: d, done, isPast: d < day, isToday: d === day };
    } catch {
      return { day: d, done: 0, isPast: d < day, isToday: d === day };
    }
  });

  const perfectDaysCount = dayHistory.filter(h => h.done === 4 && h.done !== -1).length;
  const daysWithAnyActivity = dayHistory.filter(h => h.done > 0 && h.done !== -1).length;
  const currentStreak = Math.max(0, day - 1);

  // Weight chart config
  const maxWeight = weightLog.length ? Math.max(...weightLog.map(e => e.weight)) : 100;
  const minWeight = weightLog.length ? Math.min(...weightLog.map(e => e.weight)) : 50;
  const weightRange = maxWeight - minWeight || 5;

  return (
    <div className="p-4 space-y-4 pb-6 tab-enter">

      {/* ===== STATS OVERVIEW ===== */}
      <div className="glass-card rounded-2xl p-5 border border-blue-700/30">
        <div className="text-gray-400 text-[10px] uppercase tracking-widest font-black mb-3 flex items-center gap-2">
          <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
          סטטיסטיקת האתגר
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "רצף", value: currentStreak, icon: "🔥", color: "text-orange-400", sub: "ימים" },
            { label: "אימונים", value: stats?.totalWorkouts || 0, icon: "💪", color: "text-blue-400", sub: "בוצעו" },
            { label: "מושלם", value: perfectDaysCount, icon: "🎯", color: "text-green-400", sub: "ימים" },
            { label: "XP סה\"כ", value: xp || 0, icon: "⭐", color: "text-yellow-400", sub: "נקודות" },
          ].map(s => (
            <div key={s.label} className="bg-gray-900/60 rounded-xl p-2.5 text-center border border-gray-800/60">
              <div className="text-lg mb-0.5">{s.icon}</div>
              <div className={`font-black text-lg leading-none ${s.color}`}>{s.value}</div>
              <div className="text-gray-600 text-[9px] uppercase tracking-widest mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
        {/* Overall completion bar */}
        <div className="mt-3 text-right">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>ימים עם פעילות: {daysWithAnyActivity}</span>
            <span>עברו {day - 1} ימים</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-400 progress-smooth"
              style={{ width: `${day <= 1 ? 0 : Math.round((daysWithAnyActivity / (day - 1)) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ===== 30-DAY CHALLENGE CALENDAR ===== */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            לוח שנה של האתגר
          </h3>
          <div className="flex items-center gap-3 text-[9px] text-gray-500 uppercase font-bold">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500 inline-block" />מושלם</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" />חלקי</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-gray-700 inline-block" />פספוס</span>
          </div>
        </div>
        {/* Grid: 6 rows × 5 cols = 30 cells */}
        <div className="grid grid-cols-6 gap-1.5">
          {dayHistory.map(({ day: d, done, isToday }) => {
            let bg, textColor;
            if (done === -1) {
              bg = "bg-gray-900/40 border-gray-800/50"; textColor = "text-gray-700";
            } else if (done === 0) {
              bg = "bg-red-950/50 border-red-900/40"; textColor = "text-red-800";
            } else if (done === 4) {
              bg = "bg-green-900/50 border-green-700/60"; textColor = "text-green-300";
            } else {
              bg = "bg-blue-900/40 border-blue-700/40"; textColor = "text-blue-400";
            }
            return (
              <div
                key={d}
                className={`relative rounded-lg border flex flex-col items-center justify-center py-1.5 transition-all ${bg} ${isToday ? "ring-2 ring-yellow-400/80 ring-offset-1 ring-offset-gray-950" : ""}`}
              >
                <div className={`text-[9px] font-black leading-none ${textColor}`}>{d}</div>
                {done > 0 && done < 4 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className={`w-1 h-1 rounded-full ${i < done ? "bg-blue-400" : "bg-gray-700"}`} />
                    ))}
                  </div>
                )}
                {done === 4 && <div className="text-[8px] leading-none text-green-400">✓</div>}
                {isToday && <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full" />}
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-center text-gray-600 text-xs">
          🟡 נקודה = היום · נקודות בפנים = יעדים שהושלמו (1–3 מתוך 4)
        </div>
      </div>

      {/* ===== WEIGHT TRACKER ===== */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
          <Scale className="w-4 h-4 text-purple-400" />
          יומן משקל
        </h3>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            step="0.1"
            min="30"
            max="300"
            value={inputWeight}
            onChange={e => setInputWeight(e.target.value)}
            onKeyDown={e => e.key === "Enter" && logWeight()}
            placeholder='למשל 72.5 ק"ג'
            className="flex-1 bg-gray-900/60 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-purple-500 text-base"
          />
          <button
            onClick={logWeight}
            className="px-5 py-3 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-xl font-bold active:scale-95 transition-transform"
          >
            תעד
          </button>
        </div>

        {change !== null && (
          <div className={`flex items-center gap-2 mb-3 p-3 rounded-xl border ${Number(change) <= 0 ? "bg-green-900/20 border-green-800" : "bg-amber-900/20 border-amber-800"}`}>
            <TrendingUp className={`w-4 h-4 flex-shrink-0 ${Number(change) <= 0 ? "text-green-400" : "text-amber-400"}`} />
            <span className={`text-sm font-semibold ${Number(change) <= 0 ? "text-green-300" : "text-amber-300"}`}>
              {Number(change) <= 0 ? "⬇️" : "⬆️"} {Number(change) > 0 ? "+" : ""}{change} ק"ג מההתחלה
            </span>
          </div>
        )}

        {/* Visual weight chart */}
        {weightLog.length >= 2 && (
          <div className="mb-3">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">מגמת משקל</div>
            <div className="flex items-end gap-1 h-20 bg-gray-900/50 rounded-xl p-2 border border-gray-800">
              {weightLog.map((entry, i) => {
                const pct = weightRange > 0
                  ? ((entry.weight - minWeight) / weightRange) * 80 + 10
                  : 50;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 justify-end h-full gap-0.5">
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-purple-700 to-purple-400 min-h-[4px] transition-all"
                      style={{ height: `${pct}%` }}
                    />
                    <div className="text-[7px] text-gray-600 leading-none">{entry.weight}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {weightLog.length === 0 ? (
            <div className="text-center text-gray-600 py-4 text-sm">תעד את המשקל הראשון שלך כדי להתחיל מעקב!</div>
          ) : (
            [...weightLog].reverse().map((entry, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-900/50 rounded-xl px-4 py-2.5 border border-gray-800">
                <div>
                  <div className="text-gray-300 text-sm">{entry.date}</div>
                  <div className="text-gray-600 text-xs">יום {entry.day}</div>
                </div>
                <div className="text-white font-bold">{entry.weight} ק"ג</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== MILESTONE BADGES ===== */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          הישגים
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map(badge => {
            const achieved = day >= badge.requiredDay;
            const daysTo = badge.requiredDay - day;
            return (
              <div
                key={badge.label}
                className={`rounded-xl p-3 text-center border transition-all ${achieved
                  ? "bg-yellow-900/30 border-yellow-600/60"
                  : "bg-gray-900/40 border-gray-800/60"
                  }`}
              >
                <div className={`text-3xl ${achieved ? "" : "grayscale opacity-40"}`}>{badge.emoji}</div>
                <div className={`text-xs mt-1.5 font-bold ${achieved ? "text-yellow-300" : "text-gray-600"}`}>
                  {badge.label}
                </div>
                {achieved
                  ? <div className="text-green-400 text-[10px] mt-0.5 font-bold">✓ הושג</div>
                  : <div className="text-gray-700 text-[9px] mt-0.5">יום {badge.requiredDay}{daysTo > 0 ? ` (עוד ${daysTo} ימים)` : ""}</div>
                }
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== PROGRESS PHOTOS ===== */}
      <div className="glass-card rounded-2xl p-5 border border-gray-700/50">
        <h3 className="text-white font-bold text-base mb-1 flex items-center gap-2">
          <Camera className="w-4 h-4 text-pink-400" />
          תמונות התקדמות
        </h3>
        <div className="text-gray-500 text-xs mb-3">צלם תמונה אחת בשבוע — אותו מקום, אותה שעה, אותה תאורה.</div>
        <div className="space-y-4">
          {PHOTO_WEEKS.map(w => (
            <div key={w.key}>
              <PhotoSlot
                week={w}
                day={day}
                photo={photos?.[w.key] || null}
                onUpload={(key, dataUrl) => setPhotos(prev => ({ ...prev, [key]: dataUrl }))}
                onDelete={(key) => setPhotos(prev => { const n = { ...prev }; delete n[key]; return n; })}
              />
              <WeeklyAnalysis weekDays={w.days} currentDay={day} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LEVEL UP MODAL (Upgraded)
// ============================================================
function LevelUpModal({ level, onClose }) {
  if (!level) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-gray-950/90 backdrop-blur-xl" onClick={onClose}>
      <div
        className="rounded-[32px] p-8 border border-blue-500/50 text-center max-w-xs w-full relative overflow-hidden level-up-pulse shadow-2xl"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f172a 100%)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
        <div className="text-8xl mb-4 relative drop-shadow-2xl animate-bounce">{level.emoji}</div>
        <div className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-2 leading-none">אבן דרך בהתקדמות</div>
        <h2 className="text-4xl font-black text-white mb-1 uppercase tracking-tighter shadow-sm">עלית רמה!</h2>
        <div className="text-xl font-black text-cyan-300 mb-6 uppercase tracking-[0.2em]">{level.name}</div>

        <div className="bg-blue-950/40 border border-blue-700/50 rounded-2xl p-4 mb-6">
          <div className="text-blue-300 text-sm font-bold italic">"הגבולות שלך מוגדרים מחדש."</div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm active:scale-95 transition-transform shadow-lg"
        >
          🔥 בואו נגרום לזה לקרות!
        </button>
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [day, setDay] = usePersist("ft_day", getCurrentDay());
  const [xp, setXp] = usePersist("ft_xp", 0);
  const [water, setWater] = usePersist("ft_water", 0);
  const [completedExercises, setCompletedExercises] = usePersist("ft_completedExercises", {});
  const [proteinMeals, setProteinMeals] = usePersist("ft_proteinMeals", {});
  const [weightLog, setWeightLog] = usePersist("ft_weightLog", []);
  const [stats, setStats] = usePersist("ft_stats", {
    totalWorkouts: 0, strengthDone: 0, hiitDone: 0, swimDone: 0,
    weighIns: 0, proteinDays: 0, waterDays: 0, perfectDays: 0, streak: 0,
    lastWorkoutDay: [], lastProteinDay: [],
  });
  const [achievements, setAchievements] = usePersist("ft_achievements", {});
  const [photos, setPhotos] = usePersist("ft_photos", {});
  const [penalizedDays, setPenalizedDays] = usePersist("ft_penalizedDays", []);
  const [apiKey, setApiKey] = usePersist("ft_apiKey", "");
  const [showSettings, setShowSettings] = useState(false);
  const [showSafety, setShowSafety] = useState(true);
  const [levelUpModal, setLevelUpModal] = useState(null);

  // Per-day checklist (primary store + mirror to ft_checklist_d${day} for WeeklyAnalysis)
  const [checklist, _setChecklist] = usePersist("ft_checklist", {
    workout: false, protein: false, water: false, sleep: false,
  });
  const dayRef = useRef(day);
  const prevLevelRef = useRef(getLevel(xp).name);

  function setChecklist(fn) {
    _setChecklist(prev => {
      const next = typeof fn === "function" ? fn(prev) : fn;
      try { localStorage.setItem(`ft_checklist_d${day}`, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  // When day changes: reload per-day checklist from history, reset per-day counters
  useEffect(() => {
    if (day === dayRef.current) return;
    dayRef.current = day;
    try {
      const stored = localStorage.getItem(`ft_checklist_d${day}`);
      _setChecklist(stored ? JSON.parse(stored) : { workout: false, protein: false, water: false, sleep: false });
    } catch {
      _setChecklist({ workout: false, protein: false, water: false, sleep: false });
    }
    setWater(0);
    setCompletedExercises({});
    setProteinMeals({});
  }, [day, _setChecklist, setWater, setCompletedExercises, setProteinMeals]);

  // XP helper — detects level-up and fires modal
  function addXp(amount) {
    setXp(prev => {
      const next = Math.max(0, prev + amount);
      const newLevelName = getLevel(next).name;
      if (amount > 0 && newLevelName !== prevLevelRef.current) {
        prevLevelRef.current = newLevelName;
        setLevelUpModal(getLevel(next));
      }
      return next;
    });
  }

  // Check achievements whenever stats or xp change
  useEffect(() => {
    ACHIEVEMENTS.forEach(ach => {
      if (!achievements[ach.id] && ach.check({ ...stats, xp })) {
        setAchievements(prev => ({ ...prev, [ach.id]: true }));
      }
    });
  }, [stats, xp, achievements, setAchievements]);

  // Browser notification setup
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") Notification.requestPermission();
    const water = setInterval(() => {
      if (Notification.permission === "granted")
        new Notification("💧 תזכורת מים", { body: "שתה כוס מים עכשיו!" });
    }, 60 * 60 * 1000);
    const protein = setInterval(() => {
      if (Notification.permission === "granted")
        new Notification("🥩 תזכורת חלבון", { body: "האם אכלת חלבון בארוחה האחרונה?" });
    }, 3 * 60 * 60 * 1000);
    return () => { clearInterval(water); clearInterval(protein); };
  }, []);

  const currentLevel = getLevel(xp);

  return (
    <div className="min-h-screen bg-gray-950 text-white" dir="rtl">
      <div className="max-w-md mx-auto relative">

        {/* ── Header ── */}
        <div className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-lg border-b border-gray-800/60 px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-white font-black text-lg leading-none">💪 אתגר 30 יום</div>
            <div className="text-gray-500 text-xs">
              יום {day} · {currentLevel.emoji} {currentLevel.name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-900/40 border border-blue-700/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 font-black text-sm">{xp.toLocaleString()}</span>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Safety Banner ── */}
        {showSafety && <SafetyBanner onDismiss={() => setShowSafety(false)} />}

        {/* ── Tab Content ── */}
        <div className="pb-20">
          {tab === "dashboard" && (
            <DashboardTab
              day={day}
              setDay={setDay}
              checklist={checklist}
              setChecklist={setChecklist}
              water={water}
              setWater={setWater}
              xp={xp}
              achievements={achievements}
              stats={stats}
              addXp={addXp}
            />
          )}
          {tab === "workout" && (
            <WorkoutTab
              day={day}
              completedExercises={completedExercises}
              setCompletedExercises={setCompletedExercises}
              addXp={addXp}
              stats={stats}
              setStats={setStats}
              penalizedDays={penalizedDays}
              setPenalizedDays={setPenalizedDays}
            />
          )}
          {tab === "nutrition" && (
            <NutritionTab
              day={day}
              proteinMeals={proteinMeals}
              setProteinMeals={setProteinMeals}
              addXp={addXp}
              stats={stats}
              setStats={setStats}
            />
          )}
          {tab === "coach" && (
            <CoachTab addXp={addXp} apiKey={apiKey} />
          )}
          {tab === "progress" && (
            <ProgressTab
              weightLog={weightLog}
              setWeightLog={setWeightLog}
              day={day}
              addXp={addXp}
              setStats={setStats}
              stats={stats}
              xp={xp}
              achievements={achievements}
              photos={photos}
              setPhotos={setPhotos}
            />
          )}
        </div>

        {/* ── Bottom Nav ── */}
        <BottomNav activeTab={tab} setActiveTab={setTab} />

        {/* ── Modals ── */}
        {showSettings && (
          <SettingsModal
            apiKey={apiKey}
            setApiKey={setApiKey}
            onClose={() => setShowSettings(false)}
          />
        )}
        {levelUpModal && (
          <LevelUpModal level={levelUpModal} onClose={() => setLevelUpModal(null)} />
        )}
      </div>
    </div>
  );
}