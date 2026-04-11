// api/claude.js — Vercel serverless function (Groq backend)
// Place this file at: /api/claude.js in your project root.
// Add your Groq API key as an environment variable in Vercel:
//   GROQ_API_KEY = gsk_...

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not configured" });
  }

  try {
    // Convert Anthropic-style body { messages, max_tokens } → Groq format
    const { messages, max_tokens } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model:      "llama-3.3-70b-versatile",
        max_tokens: max_tokens || 8000,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Groq API error" });
    }

    // Normalize to Anthropic-style response so the frontend code needs no changes
    const text = data.choices?.[0]?.message?.content || "";
    return res.status(200).json({
      content: [{ type: "text", text }]
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
