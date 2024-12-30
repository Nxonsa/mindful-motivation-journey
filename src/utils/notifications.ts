import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

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
  },
  {
    quote: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    reference: "Isaiah 40:31"
  },
  {
    quote: "Commit to the Lord whatever you do, and he will establish your plans.",
    reference: "Proverbs 16:3"
  },
  {
    quote: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.",
    reference: "Psalm 28:7"
  }
];

const motivationalMessages = [
  "Remember, every step forward is progress. Keep going!",
  "Tomorrow is a new day with new opportunities.",
  "Your dedication will pay off. Stay focused!",
  "Small progress is still progress. Keep pushing!",
  "You're stronger than you think. Keep believing!",
  "Success is built one day at a time. Stay consistent!",
  "Your future self will thank you for not giving up today."
];

export const getRandomBibleQuote = (isSuccess: boolean) => {
  const randomIndex = Math.floor(Math.random() * bibleQuotes.length);
  const quote = bibleQuotes[randomIndex];
  
  if (isSuccess) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  
  return {
    ...quote,
    message: isSuccess ? "Congratulations on achieving your goal!" : "Keep striving for excellence!"
  };
};

export const getRandomMotivationalMessage = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

export const setupNotifications = () => {
  // Water reminder every hour
  setInterval(() => {
    const randomQuote = bibleQuotes[Math.floor(Math.random() * bibleQuotes.length)];
    toast({
      title: "Stay Hydrated! 💧",
      description: "Time to drink a glass of water for your health!\n\n" +
        `"${randomQuote.quote}" - ${randomQuote.reference}`,
    });
  }, 60 * 60 * 1000);

  // Goal check-in every 3 hours
  setInterval(() => {
    const motivationalMessage = getRandomMotivationalMessage();
    const randomQuote = bibleQuotes[Math.floor(Math.random() * bibleQuotes.length)];
    toast({
      title: "Goal Check-in 🎯",
      description: `${motivationalMessage}\n\n` +
        `"${randomQuote.quote}" - ${randomQuote.reference}`,
    });
  }, 3 * 60 * 60 * 1000);
};