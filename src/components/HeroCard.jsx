import products from "../data/products";

const STORE_LABELS = {
  noFrills: "No Frills",
  walmart: "Walmart",
  zehrs: "Zehrs",
  superstore: "Superstore*",
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

function buildWeeklyBasket(budget = 50) {
  const candidates = products
    .map((p) => {
      const available = Object.entries(p.prices).filter(([_, v]) => v !== null);
      if (!available.length) return null;
      const [storeKey, price] = available.sort((a, b) => a[1] - b[1])[0];
      const servings = SERVINGS[p.name] || 4;
      const proteinPerServing = p.protein / servings;
      const value = proteinPerServing / price;
      return { ...p, storeKey, price, proteinPerServing, value };
    })
    .filter(Boolean)
    .sort((a, b) => b.value - a.value);

  const chosen = [];
  let spent = 0;
  let totalProteinPerDay = 0;

  for (const item of candidates) {
    if (spent + item.price <= budget) {
      chosen.push(item);
      spent += item.price;
      totalProteinPerDay += item.proteinPerServing;
    }
  }

  const byStore = {};
  for (const item of chosen) {
    const store = STORE_LABELS[item.storeKey] || item.storeKey;
    if (!byStore[store]) byStore[store] = [];
    byStore[store].push(item);
  }

  return {
    chosen,
    spent: Math.round(spent * 100) / 100,
    proteinPerDay: Math.round(totalProteinPerDay),
    byStore,
    storeCount: Object.keys(byStore).length,
  };
}

export default function HeroCard() {
  const basket = buildWeeklyBasket(50);

  return (
    <div style={{ background: "linear-gradient(135deg,#1A2333,#111827)", borderRadius: 24, padding: 24, marginBottom: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
      <p style={{ color: "#C7F464", fontWeight: 700, marginBottom: 4, fontSize: 13 }}>
        BEST WEEKLY BASKET - $50 BUDGET
      </p>

      <h1 style={{ fontSize: 52, margin: "0 0 4px 0", color: "#C7F464" }}>
        ${basket.spent.toFixed(2)}
      </h1>

      <p style={{ color: "#cbd5e1", marginTop: 8, marginBottom: 16, fontSize: 14 }}>
        {basket.proteinPerDay}g protein/day - {basket.chosen.length} items - {basket.storeCount} stores
      </p>

      <div style={{ marginBottom: 16 }}>
        {Object.entries(basket.byStore).map(([store, items]) => (
          <div key={store} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8FA3B8", padding: "4px 0" }}>
            <span>{store}</span>
            <span style={{ color: "#C7F464" }}>
              {items.length} items - ${items.reduce((s, i) => s + i.price, 0).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8FA3B8", marginBottom: 6 }}>
          <span>Protein vs 150g/day goal</span>
          <span style={{ color: basket.proteinPerDay >= 150 ? "#C7F464" : "#FF9F43" }}>
            {Math.round((basket.proteinPerDay / 150) * 100)}%
          </span>
        </div>
        <div style={{ height: 6, background: "#263243", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: Math.min((basket.proteinPerDay / 150) * 100, 100) + "%", background: basket.proteinPerDay >= 150 ? "linear-gradient(90deg,#C7F464,#4ED6F2)" : "linear-gradient(90deg,#FF9F43,#FF6B6B)", transition: "width 0.5s" }} />
        </div>
      </div>

      <button style={{ width: "100%", padding: 16, borderRadius: 16, border: "none", background: "#C7F464", fontWeight: 700, fontSize: 16, cursor: "pointer", color: "#111827" }}>
        View Full Basket
      </button>
    </div>
  );
}