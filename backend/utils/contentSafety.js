import fetch from "node-fetch";

export async function checkContentSafety(text) {
  try {
    const endpoint = process.env.AZURE_CONTENT_SAFETY_ENDPOINT;
    const key = process.env.AZURE_CONTENT_SAFETY_KEY;

    const url = `${endpoint}/contentsafety/text:analyze?api-version=2023-10-01`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": key
      },
      body: JSON.stringify({
        text: text
      })
    });

    const data = await response.json();

    console.log("Content Safety RAW ", JSON.stringify(data, null, 2));

    const selfHarm = data?.categoriesAnalysis?.find(
      c => c.category === "SelfHarm"
    );

    if (selfHarm && selfHarm.severity > 0) {
      return { isHarmful: true };
    }

    return { isHarmful: false };

  } catch (err) {
    console.error("Content Safety Error:", err.message);
    return { isHarmful: false }; 
  }
}

