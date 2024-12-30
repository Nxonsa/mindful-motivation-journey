import { toast } from "@/hooks/use-toast";

const bibleQuotes = [
  {
    quote: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },
  {
    quote: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    quote: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  },
  {
    quote: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5"
  }
];

const motivationalMessages = [
  "Remember, every step forward is progress. Keep going!",
  "Tomorrow is a new day with new opportunities.",
  "Your dedication will pay off. Stay focused!",
  "Small progress is still progress. Keep pushing!"
];

export const getRandomBibleQuote = (isSuccess: boolean) => {
  const randomIndex = Math.floor(Math.random() * bibleQuotes.length);
  return {
    ...bibleQuotes[randomIndex],
    message: isSuccess ? "Congratulations on achieving your goal!" : "Keep striving for excellence!"
  };
};

export const getRandomMotivationalMessage = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

export const setupNotifications = () => {
  // Water reminder every hour
  setInterval(() => {
    toast({
      title: "Stay Hydrated! 💧",
      description: "Time to drink a glass of water for your health!",
    });
  }, 60 * 60 * 1000); // Every hour

  // Goal check-in every 3 hours
  setInterval(() => {
    toast({
      title: "Goal Check-in 🎯",
      description: "How are you progressing with your daily goals?",
    });
  }, 3 * 60 * 60 * 1000); // Every 3 hours
};