import products from "../data/products";

const STORE_LABELS = {
  noFrills: "No Frills",
  walmart: "Walmart",
  zehrs: "Zehrs",
  superstore: "Superstore*",
};

const ITEM_EMOJIS = {
  Dairy: "🥛",
  Meat: "🍗",
  Seafood: "🐟",
  Legumes: "🫘",
  "Plant Protein": "🌱",
  Pantry: "🥜",
  Grains: "🌾",
  Seeds: "🌿",
};

export default function DealsCard() {
  const deals = products
    .map((product) => {
      const available = Object.entries(product.prices).filter(
        ([_, price]) => price !== null
      );
      if (available.length === 0) return null;

      const cheapest = available.sort((a, b) => a[1] - b[1])[0];
      const servings = 4;

      return {
        ...product,
        displayEmoji: ITEM_EMOJIS[product.category] || "🛒",
        cheapestStore: STORE_LABELS[cheapest[0]] || cheapest[0],
        cheapestPrice: cheapest[1],
        proteinPerServing: Math.round(product.protein / servings),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.proteinPerServing / b.cheapestPrice - a.proteinPerServing / a.cheapestPrice)
    .slice(0, 8);

  return (
    <div
      style={{
        background: "#161F2C",
        borderRadius: 24,
        padding: 24,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginBottom: 4, fontSize: 18 }}>Best Protein Deals</h2>
      <p style={{ color: "#8FA3B8", fontSize: 13, marginBottom: 20 }}>
        Ranked by protein per dollar
      </p>

      {deals.map((item, index) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: index < deals.length - 1 ? "1px solid #263243" : "none",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>
              {item.displayEmoji} {item.name}
            </div>
            <div style={{ color: "#8FA3B8", fontSize: 13, marginTop: 4 }}>
              {item.cheapestStore} · {item.unit}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#C7F464", fontWeight: 700, fontSize: 18 }}>
              ${item.cheapestPrice.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: "#8FA3B8" }}>
              {item.proteinPerServing}g protein/serving
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}