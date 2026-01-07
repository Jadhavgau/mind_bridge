export async function sendMessage(message) {
  try {
    const res = await fetch(
      "https://mind-bridge-backend-xxvp.onrender.com/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          sessionId: "mindbridge-session",
        }),
      }
    );

    if (!res.ok) {
      throw new Error("API response not OK");
    }

    const data = await res.json();
    console.log("API RESPONSE ", data);
    return data;

  } catch (err) {
    console.error("Frontend API Error:", err);
    return {
      reply: "I’m here with you. Something went wrong, please try again.",
    };
  }
}

