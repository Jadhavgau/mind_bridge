export function getReflection(emotion) {
  const reflections = {
    sad: "What do you think has been weighing on you the most lately?",
    anxious: "When did you first start feeling this anxiety today?",
    angry: "What do you wish had gone differently in that situation?",
    overwhelmed: "If you could remove just one pressure right now, what would it be?",
    neutral: null
  };

  return reflections[emotion];
}
