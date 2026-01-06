export async function getAIResponse(messages) {
  try {
    const url = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_KEY
      },
      body: JSON.stringify({
        messages: [
          {
          role: "system",
          content: `
You are MindBridge — a calm, empathetic mental health support assistant.

Rules:
- Never say “I can’t remember” or generic chatbot lines.
- Respond like a caring human, not a robot.
- If user is stressed, slow down and comfort.
- If user asks for advice, give 2–3 practical steps.
- Do NOT give medical diagnosis.
- Encourage reflection, not dependency.
`
        },
          ...messages
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("AZURE RAW RESPONSE ", JSON.stringify(data, null, 2));

    return (
      data.choices?.[0]?.message?.content ||
      "I’m here with you."
    );

  } catch (err) {
    console.error("Azure OpenAI Fetch Error:", err);
    return "I’m here with you.";
  }
}
