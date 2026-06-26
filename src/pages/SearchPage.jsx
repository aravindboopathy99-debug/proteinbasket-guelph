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

const CATEGORIES = ["All", "Meat", "Dairy", "Seafood", "Legumes", "Plant Protein", "Grains", "Seeds", "Pantry"];

const ITEM_EMOJIS = {
  Dairy: "🥛", Meat: "🍗", Seafood: "🐟", Legumes: "🫘",
  "Plant Protein": "🌱", Pantry: "🥜", Grains: "🌾", Seeds: "🌿",
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = products.filter((p) => {
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchQuery && matchCat;
  });

  if (selected) {
    const item = products.find((p) => p.id === selected);
    const prices = Object.entries(item.prices)
      .filter(([_, v]) => v !== null)
      .sort((a, b) => a[1] - b[1]);
    const cheapest = prices[0];
    const most = prices[prices.length - 1];
    const saving = most && cheapest ? (most[1] - cheapest[1]).toFixed(2) : 0;

    return (
      <div style={{ padding: 20, maxWidth: 430, margin: "0 auto" }}>
        <button
          onClick={() => setSelected(null)}
          style={{ background: "#1A2333", border: "none", color: "#C7F464", padding: "8px 16px", borderRadius: 10, cursor: "pointer", marginBottom: 20, fontWeight: 700 }}
        >
          Back
        </button>

        <div style={{ background: "#161F2C", borderRadius: 20, padding: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{ITEM_EMOJIS[item.category] || "🛒"}</div>
          <h2 style={{ margin: "0 0 4px 0" }}>{item.name}</h2>
          <p style={{ color: "#8FA3B8", margin: "0 0 20px 0" }}>{item.unit} · {item.category}</p>

          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, background: "#0F1923", borderRadius: 12, padding: 14, textAlign: "center" }}>
              <div style={{ color: "#C7F464", fontWeight: 800, fontSize: 22 }}>{item.protein}g</div>
              <div style={{ color: "#8FA3B8", fontSize: 12 }}>protein/pkg</div>
            </div>
            <div style={{ flex: 1, background: "#0F1923", borderRadius: 12, padding: 14, textAlign: "center" }}>
              <div style={{ color: "#4ED6F2", fontWeight: 800, fontSize: 22 }}>{item.calories}</div>
              <div style={{ color: "#8FA3B8", fontSize: 12 }}>cal/pkg</div>
            </div>
            {Number(saving) > 0 && (
              <div style={{ flex: 1, background: "#0F1923", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ color: "#FF9F43", fontWeight: 800, fontSize: 22 }}>${saving}</div>
                <div style={{ color: "#8FA3B8", fontSize: 12 }}>max saving</div>
              </div>
            )}
          </div>

          <div style={{ fontWeight: 700, marginBottom: 12 }}>Price by store</div>
          {prices.map(([key, price], i) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < prices.length - 1 ? "1px solid #263243" : "none",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{STORE_LABELS[key] || key}</div>
                {i === 0 && <div style={{ fontSize: 11, color: "#C7F464", marginTop: 2 }}>Cheapest</div>}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 20,
                  color: i === 0 ? "#C7F464" : "#E6EBF2",
                }}
              >
                ${price.toFixed(2)}
              </div>
            </div>
          ))}

          {prices.length === 0 && (
            <p style={{ color: "#8FA3B8" }}>No prices available yet. Check back after Thursday update.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 430, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 16 }}>Protein Prices</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search items..."
        style={{
          width: "100%",
          background: "#161F2C",
          border: "1px solid #263243",
          borderRadius: 12,
          padding: "12px 16px",
          color: "#E6EBF2",
          fontSize: 16,
          marginBottom: 16,
          boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 4 }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              whiteSpace: "nowrap",
              padding: "6px 14px",
              borderRadius: 20,
              border: "none",
              background: category === cat ? "#C7F464" : "#1A2333",
              color: category === cat ? "#111827" : "#8FA3B8",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.map((item) => {
        const available = Object.values(item.prices).filter((v) => v !== null);
        const cheapest = available.length ? Math.min(...available) : null;

        return (
          <div
            key={item.id}
            onClick={() => setSelected(item.id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom: "1px solid #1A2333",
              cursor: "pointer",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>
                {ITEM_EMOJIS[item.category] || "🛒"} {item.name}
              </div>
              <div style={{ color: "#8FA3B8", fontSize: 13, marginTop: 3 }}>
                {item.unit} · {item.protein}g protein
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              {cheapest !== null ? (
                <>
                  <div style={{ color: "#C7F464", fontWeight: 800, fontSize: 18 }}>
                    ${cheapest.toFixed(2)}
                  </div>
                  <div style={{ fontSize: 11, color: "#8FA3B8" }}>best price</div>
                </>
              ) : (
                <div style={{ color: "#8FA3B8", fontSize: 13 }}>No price</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}