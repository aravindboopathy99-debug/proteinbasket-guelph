import { useState } from "react";
import products from "../data/products";

const STORE_LABELS = {
  metro: "Metro",
  noFrills: "No Frills",
  walmart: "Walmart",
  zehrs: "Zehrs",
  superstore: "Superstore*",
  foodBasics: "Food Basics",
};

const SERVINGS = {
  "Large eggs": 4, "Cottage cheese 2%": 4, "Greek yogurt plain": 3,
  "Milk 2%": 8, "Cheddar cheese": 8, "Mozzarella cheese": 8,
  "Chicken breast": 4, "Chicken thighs": 4, "Ground turkey": 4,
  "Canned tuna": 1, "Canned salmon": 1, "Canned sardines": 1,
  "Red lentils": 6, "Chickpeas": 3, "Black beans": 3, "Kidney beans": 3,
  "Soya chunks": 4, "Firm tofu": 2, "Edamame": 3, "Peanut butter": 10,
  "Rolled oats": 10, "Quinoa": 8, "Spaghetti": 6, "Hemp hearts": 8, "Chia seeds": 10,
};

const ITEM_VISUAL = {
  "Large eggs":         { emoji: "🥚", color: "#FFF3CD", accent: "#F59E0B", dark: "#92400E" },
  "Cottage cheese 2%": { emoji: "🫙", color: "#DBEAFE", accent: "#3B82F6", dark: "#1E3A8A" },
  "Greek yogurt plain":{ emoji: "🥛", color: "#E0E7FF", accent: "#6366F1", dark: "#312E81" },
  "Milk 2%":           { emoji: "🥛", color: "#DBEAFE", accent: "#3B82F6", dark: "#1E3A8A" },
  "Cheddar cheese":    { emoji: "🧀", color: "#FEF3C7", accent: "#D97706", dark: "#78350F" },
  "Mozzarella cheese": { emoji: "🧀", color: "#F0FDF4", accent: "#16A34A", dark: "#14532D" },
  "Chicken breast":    { emoji: "🍗", color: "#FEF9C3", accent: "#CA8A04", dark: "#713F12" },
  "Chicken thighs":    { emoji: "🍗", color: "#FEF2F2", accent: "#DC2626", dark: "#7F1D1D" },
  "Ground turkey":     { emoji: "🦃", color: "#FEF3C7", accent: "#B45309", dark: "#78350F" },
  "Canned tuna":       { emoji: "🐟", color: "#ECFEFF", accent: "#0891B2", dark: "#164E63" },
  "Canned salmon":     { emoji: "🐟", color: "#FFF1F2", accent: "#E11D48", dark: "#881337" },
  "Canned sardines":   { emoji: "🐠", color: "#F0FDF4", accent: "#15803D", dark: "#14532D" },
  "Red lentils":       { emoji: "🫘", color: "#FEF2F2", accent: "#DC2626", dark: "#7F1D1D" },
  "Chickpeas":         { emoji: "🫘", color: "#FEF9C3", accent: "#CA8A04", dark: "#713F12" },
  "Black beans":       { emoji: "🫘", color: "#F3F4F6", accent: "#374151", dark: "#111827" },
  "Kidney beans":      { emoji: "🫘", color: "#FEF2F2", accent: "#B91C1C", dark: "#7F1D1D" },
  "Soya chunks":       { emoji: "🌱", color: "#F0FDF4", accent: "#16A34A", dark: "#14532D" },
  "Firm tofu":         { emoji: "⬜", color: "#F9FAFB", accent: "#6B7280", dark: "#1F2937" },
  "Edamame":           { emoji: "🫛", color: "#DCFCE7", accent: "#16A34A", dark: "#14532D" },
  "Peanut butter":     { emoji: "🥜", color: "#FEF3C7", accent: "#B45309", dark: "#78350F" },
  "Rolled oats":       { emoji: "🌾", color: "#FEF9C3", accent: "#A16207", dark: "#713F12" },
  "Quinoa":            { emoji: "🌾", color: "#F0FDF4", accent: "#15803D", dark: "#14532D" },
  "Spaghetti":         { emoji: "🍝", color: "#FFF7ED", accent: "#C2410C", dark: "#7C2D12" },
  "Hemp hearts":       { emoji: "🌿", color: "#DCFCE7", accent: "#15803D", dark: "#14532D" },
  "Chia seeds":        { emoji: "🌱", color: "#F0FDF4", accent: "#166534", dark: "#14532D" },
};

const TAGS = {
  "Chicken breast": "Best Value", "Large eggs": "Budget Pick",
  "Greek yogurt plain": "Breakfast", "Cottage cheese 2%": "Trending",
  "Ground turkey": "Lean", "Firm tofu": "Vegetarian",
  "Chicken thighs": "High Protein", "Canned tuna": "Quick Meal",
  "Red lentils": "Plant Protein", "Canned sardines": "Hidden Gem",
};

function enrichProducts() {
  return products
    .map((p) => {
      try {
        const available = Object.entries(p.prices || {}).filter(([_, v]) => v !== null && v > 0);
        if (!available.length) return null;
        const [storeKey, price] = available.sort((a, b) => a[1] - b[1])[0];
        if (!price || price <= 0 || !p.protein) return null;
        const servings = SERVINGS[p.name] || 4;
        const pps = p.protein / servings;
        const costPerG = price / p.protein;
        const visual = ITEM_VISUAL[p.name] || { emoji: "🛒", color: "#F3F4F6", accent: "#6B7280", dark: "#1F2937" };
        return {
          ...p, ...visual,
          store: STORE_LABELS[storeKey] || storeKey,
          bestPrice: price,
          proteinPerServing: Math.round(pps),
          costPerG: Math.round(costPerG * 1000) / 1000,
          ppd: price > 0 ? Math.round((pps / price) * 10) / 10 : 0,
          tag: TAGS[p.name] || "",
          storeKey,
        };
      } catch (e) { return null; }
    })
    .filter(Boolean);
}

export default function Home({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const all = enrichProducts();
  const byPPD = [...all].sort((a, b) => b.ppd - a.ppd);
  const top5 = byPPD.slice(0, 5);

  const categories = ["All", "Meat", "Dairy", "Seafood", "Legumes", "Plant Protein", "Grains"];
  const filtered = activeCategory === "All" ? all : all.filter(p => p.category === activeCategory);
  const displayed = [...filtered].sort((a, b) => b.ppd - a.ppd).slice(0, 12);

  const insights = [
    byPPD[0] && { icon: "🏆", label: "Best Value", text: `${byPPD[0].name} at ${byPPD[0].store} — $${byPPD[0].bestPrice.toFixed(2)} for ${byPPD[0].protein}g protein` },
    byPPD[1] && { icon: "💰", label: "Runner Up", text: `${byPPD[1].name} at ${byPPD[1].store} — $${byPPD[1].costPerG.toFixed(3)}/g protein` },
    all.find(p => p.name === "Canned sardines") && {
      icon: "💡", label: "Hidden Gem",
      text: `Sardines at $${all.find(p => p.name === "Canned sardines").bestPrice.toFixed(2)} — most underrated cheap protein in Guelph`
    },
  ].filter(Boolean);

  const quickActions = [
    { label: "Weekly Plan", sub: "Build your basket", icon: "🛒", page: "plan", bg: "#C7F464", color: "#111827" },
    { label: "AI Coach", sub: "Ask anything", icon: "✨", page: "ai", bg: "#161F2C", color: "#E6EBF2" },
    { label: "All Prices", sub: "Compare stores", icon: "🔍", page: "search", bg: "#161F2C", color: "#E6EBF2" },
  ];

  return (
    <div style={{ background: "#0A0F1A", minHeight: "100vh", color: "#E6EBF2" }}>

      {/* Hero Banner */}
      <div style={{ background: "linear-gradient(135deg, #0A2E0A 0%, #0A1628 50%, #1A0A2E 100%)", padding: "28px 20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: "#C7F464", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Guelph, ON</div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>ProteinBasket</div>
            <div style={{ fontSize: 13, color: "#8FA3B8", marginTop: 2 }}>Eat more. Spend less.</div>
          </div>
          <div style={{ background: "rgba(199,244,100,0.15)", border: "1px solid rgba(199,244,100,0.3)", borderRadius: 12, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#C7F464" }}>{all.length}</div>
            <div style={{ fontSize: 10, color: "#8FA3B8", fontWeight: 700 }}>ITEMS</div>
          </div>
        </div>

        {/* Top 3 stat pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {top5.slice(0, 3).map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", borderRadius: 12, padding: "10px 8px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 22 }}>{item.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: "#E6EBF2" }}>{item.name.split(" ")[0]}</div>
              <div style={{ fontSize: 12, color: "#C7F464", fontWeight: 800 }}>${item.bestPrice.toFixed(2)}</div>
              <div style={{ fontSize: 10, color: "#8FA3B8" }}>{item.store}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 20px 20px" }}>

        {/* Quick Actions */}
        <div style={{ display: "flex", gap: 10, margin: "16px 0" }}>
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => onNavigate && onNavigate(a.page)}
              style={{ flex: i === 0 ? 2 : 1, background: a.bg, border: "none", borderRadius: 16, padding: "14px 12px", textAlign: "left", cursor: "pointer", color: a.color }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{a.label}</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{a.sub}</div>
            </button>
          ))}
        </div>

        {/* AI Insights */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>This Week's Insight</div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {insights.map((ins, i) => (
              <div key={i} style={{ background: "#161F2C", borderRadius: 16, padding: 16, minWidth: 220, flexShrink: 0, border: "1px solid #1E2D3D" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{ins.icon}</div>
                <div style={{ fontSize: 11, color: "#C7F464", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{ins.label}</div>
                <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.5 }}>{ins.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Protein Per Dollar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Best Protein Per Dollar</div>
            <button onClick={() => onNavigate && onNavigate("search")}
              style={{ background: "none", border: "none", color: "#C7F464", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>See all</button>
          </div>
          {top5.map((item, i) => {
            const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
            return (
              <div key={item.id} style={{ display: "flex", alignItems: "center", background: "#161F2C", borderRadius: 14, padding: "14px 16px", marginBottom: 8, border: "1px solid #1E2D3D", gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</span>
                    {item.tag && <span style={{ fontSize: 10, background: item.color, color: item.dark, padding: "2px 8px", borderRadius: 20, fontWeight: 700 }}>{item.tag}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "#8FA3B8" }}>{item.store} · {item.proteinPerServing}g protein/serving</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 900, color: "#C7F464", fontSize: 18 }}>${item.bestPrice.toFixed(2)}</div>
                  <div style={{ fontSize: 11, color: "#4ED6F2" }}>${item.costPerG.toFixed(3)}/g</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Browse by category */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 12 }}>Browse Proteins</div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ whiteSpace: "nowrap", padding: "8px 16px", borderRadius: 24, border: "none", background: activeCategory === cat ? "#C7F464" : "#161F2C", color: activeCategory === cat ? "#111827" : "#8FA3B8", fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {displayed.map((item) => (
              <div key={item.id} style={{ background: "#161F2C", borderRadius: 16, overflow: "hidden", border: "1px solid #1E2D3D" }}>
                {/* Color card top */}
                <div style={{ background: item.color, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                  {item.emoji}
                </div>
                <div style={{ padding: "12px 12px 14px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2, color: "#E6EBF2" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#8FA3B8", marginBottom: 8 }}>{item.store} · {item.unit}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 900, color: "#C7F464", fontSize: 18 }}>${item.bestPrice.toFixed(2)}</div>
                    <div style={{ fontSize: 11, background: "rgba(199,244,100,0.1)", color: "#C7F464", padding: "3px 8px", borderRadius: 20, fontWeight: 700 }}>{item.proteinPerServing}g</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}