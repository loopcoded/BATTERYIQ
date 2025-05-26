async function fetchBatteryRecommendation(prompt) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",  // or llama3-70b if needed
      messages: [
        {
          role: "system",
          content: "You are a battery expert. Recommend the optimal battery pack for the given real-world scenario."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
document.getElementById("submit-btn").addEventListener("click", async () => {
  const scenario = document.getElementById("input-box").value;
  const outputElement = document.getElementById("output-section");

  outputElement.innerText = "Fetching recommendation...";
  
  try {
    const recommendation = await fetchBatteryRecommendation(scenario);
    const parsed = parseBatteryOutput(recommendation);  // Optional parsing
    renderBatteryInfo(parsed);  // Map parsed fields to your UI
  } catch (err) {
    outputElement.innerText = "Error: " + err.message;
  }
});