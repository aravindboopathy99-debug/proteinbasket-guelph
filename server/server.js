import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const SYSTEM_PROMPT = `You are a friendly, knowledgeable grocery coach for Guelph, Ontario, Canada. You help people eat high protein on a budget using real local store prices.

You have access to current prices from No Frills, Walmart, Zehrs, and Superstore in Guelph.

Your personality:
- Talk like a real person, not a robot
- Be direct and specific — give actual prices and quantities
- Keep responses short and conversational (3-5 sentences max unless they ask for a plan)
- Use grams not vague amounts like "a serving"
- When someone gives you a budget and protein goal, extract it and build a plan

When someone asks for a grocery plan, respond conversationally AND include a JSON block at the very end in this exact format (nothing after it):
PLAN_JSON:{"budget":50,"proteinGoal":150,"calGoal":2000,"days":7,"restrictions":[],"excludeCategories":[]}

Only include PLAN_JSON when the user has given you enough info to build a real basket (budget + protein goal at minimum). Do not include it for general questions.

Example good responses:
- "Red lentils at Superstore ($2.00/900g) are your cheapest protein right now — about $0.009 per gram. Hard to beat."
- "For $50 over 7 days, you are looking at about $7/day. That can easily get you 130-150g protein if you lean on eggs, lentils, and canned tuna."
- "Chicken breast is $12/kg at Zehrs. At 200g per meal that is $2.40 per meal and 46g protein. Good value."`;

// Chat endpoint — multi-turn conversation
app.post("/api/chat", async (req, res) => {
  const { messages, products } = req.body;

  // Build price context string
  const priceContext = products
    .map((p) => {
      const prices = Object.entries(p.prices)
        .filter(([_, v]) => v !== null)
        .map(([store, price]) => {
          const labels = { noFrills: "No Frills", walmart: "Walmart", zehrs: "Zehrs", superstore: "Superstore" };
          return `${labels[store] || store}: $${price}`;
        })
        .join(", ");
      return prices ? `${p.name} (${p.unit}, ${p.protein}g protein): ${prices}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const systemWithPrices = SYSTEM_PROMPT + "\n\nCurrent Guelph prices:\n" + priceContext;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemWithPrices },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
    });

    const data = await response.json();
    const fullReply = data.choices[0].message.content.trim();

    // Check if AI included a plan
    let reply = fullReply;
    let plan = null;

    if (fullReply.includes("PLAN_JSON:")) {
      const parts = fullReply.split("PLAN_JSON:");
      reply = parts[0].trim();
      try {
        plan = JSON.parse(parts[1].trim());
      } catch (e) {
        console.error("Could not parse plan JSON:", e);
      }
    }

    res.json({ success: true, reply, plan });
  } catch (err) {
    console.error("Groq error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Keep old /api/ask for backward compat
app.post("/api/ask", async (req, res) => {
  const { query, products } = req.body;
  req.body.messages = [{ role: "user", content: query }];
  // Redirect to chat handler logic inline
  res.json({ success: true, budget: 50, proteinGoal: 150, calGoal: 2000, days: 7, restrictions: [], excludeCategories: [], message: "Use /api/chat instead", tip: "" });
});

app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));