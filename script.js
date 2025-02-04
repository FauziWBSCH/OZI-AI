const API_KEY = "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"; // Ganti dengan API Key Anda

function typeWriter(text, element, speed = 50) {
  let i = 0;
  element.textContent = ""; // Kosongkan elemen sebelum memulai animasi
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed); // Atur kecepatan mengetik (dalam milidetik)
    }
  }
  type();
}

document.getElementById("submit").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value.trim();
  const responseBox = document.getElementById("response");

  if (!userInput) {
    responseBox.textContent = "Please enter a question.";
    return;
  }

  responseBox.textContent = "Loading...";

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userInput }],
          model: "llama-3.1-8b-instant",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse =
      data.choices[0]?.message?.content || "No response received.";
    typeWriter(aiResponse, responseBox);
  } catch (error) {
    console.error(error);
    responseBox.textContent = "An error occurred. Check console for details.";
  }
});
