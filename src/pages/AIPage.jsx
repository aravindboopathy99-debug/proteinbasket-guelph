import { useState, useRef, useEffect } from "react";
import products from "../data/products";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const SUGGESTIONS = [
  "I have $40 for 7 days, need 150g protein",
  "What is the cheapest protein source right now?",
  "I am vegetarian, $35 budget, 5 days",
  "Compare chicken breast vs lentils for protein",
  "What should I buy for muscle gain on a budget?",
  "I have $25, what can I eat this week?",
];

export default function AIPage({ onApplyPlan }) {
  const WELCOME = {
    role: "assistant",
    content: "Hey! I am your Guelph grocery coach. Tell me your budget, how many days you are shopping for, and your protein goal — and I will build you a smart basket and meal plan. Or just ask me anything about protein and prices.",
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("pb_chat");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [WELCOME];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastPlan, setLastPlan] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("pb_chat", JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          products: products.map((p) => ({
            name: p.name,
            category: p.category,
            protein: p.protein,
            unit: p.unit,
            prices: p.prices,
          })),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      if (data.plan) {
        setLastPlan(data.plan);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I could not connect to the server. Make sure the backend is running on port 3001." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", maxWidth: 430, margin: "0 auto", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2333", background: "#0F1923", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>AI Grocery Coach</div>
          <div style={{ fontSize: 12, color: "#C7F464" }}>Powered by Groq - Guelph prices</div>
        </div>
        <button onClick={() => { setMessages([WELCOME]); setLastPlan(null); localStorage.removeItem("pb_chat"); }}
          style={{ background: "none", border: "1px solid #263243", borderRadius: 8, padding: "4px 10px", color: "#8FA3B8", fontSize: 12, cursor: "pointer" }}>
          Clear
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#C7F464", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
                AI
              </div>
            )}
            <div style={{
              maxWidth: "78%",
              background: msg.role === "user" ? "#C7F464" : "#161F2C",
              color: msg.role === "user" ? "#111827" : "#E6EBF2",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "12px 16px",
              fontSize: 14,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#C7F464", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>AI</div>
            <div style={{ background: "#161F2C", borderRadius: "18px 18px 18px 4px", padding: "12px 16px" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map((i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#C7F464", animation: "pulse 1.2s ease-in-out " + (i * 0.2) + "s infinite" }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Apply plan button if AI returned a plan */}
        {lastPlan && !loading && (
          <div style={{ background: "#1A2D1A", border: "1px solid #2D5C2D", borderRadius: 14, padding: 14, marginTop: 4 }}>
            <div style={{ fontSize: 13, color: "#C7F464", fontWeight: 700, marginBottom: 8 }}>Plan ready to build</div>
            <div style={{ fontSize: 13, color: "#8FA3B8", marginBottom: 10 }}>
              ${lastPlan.budget} budget · {lastPlan.proteinGoal}g protein/day · {lastPlan.days} days
            </div>
            <button onClick={() => { onApplyPlan && onApplyPlan(lastPlan); setLastPlan(null); }}
              style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", background: "#C7F464", color: "#111827", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
              Build This Basket
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions - only show at start */}
      {messages.length === 1 && (
        <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, overflowX: "auto" }}>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s)}
              style={{ whiteSpace: "nowrap", background: "#161F2C", border: "1px solid #263243", borderRadius: 20, padding: "8px 14px", color: "#E6EBF2", fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid #1A2333", background: "#0F1923", display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
          placeholder="Ask anything about groceries..."
          style={{ flex: 1, background: "#161F2C", border: "1px solid #263243", borderRadius: 24, padding: "12px 16px", color: "#E6EBF2", fontSize: 15, outline: "none" }}
        />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
          style={{ width: 46, height: 46, borderRadius: "50%", border: "none", background: input.trim() && !loading ? "#C7F464" : "#263243", cursor: input.trim() && !loading ? "pointer" : "not-allowed", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          &#8593;
        </button>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
    </div>
  );
}