import products from "../data/products";
import stores from "../data/stores";

export default function StoresCard() {
  const summary = stores.map((store) => {
    let cheapestCount = 0;

    products.forEach((product) => {
      const prices = Object.entries(product.prices).filter(
        ([_, value]) => value !== null
      );
      if (prices.length === 0) return;

      const lowest = Math.min(...prices.map(([, price]) => price));

      const key =
        store.name === "No Frills"
          ? "noFrills"
          : store.name === "Walmart"
          ? "walmart"
          : store.name === "Zehrs"
          ? "zehrs"
          : "superstore";

      const storePrice = product.prices[key];
      if (storePrice !== null && storePrice === lowest) {
        cheapestCount++;
      }
    });

    return { ...store, cheapestCount };
  });

  summary.sort((a, b) => b.cheapestCount - a.cheapestCount);

  const medals = ["🥇", "🥈", "🥉", "⭐"];

  return (
    <div
      style={{
        background: "#161F2C",
        borderRadius: 24,
        padding: 24,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginBottom: 20 }}>🏪 Best Stores</h2>

      {summary.map((store, index) => (
        <div
          key={store.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
            borderBottom: index < summary.length - 1 ? "1px solid #263243" : "none",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>
              {medals[index] || "⭐"} {store.name}
            </div>
            <div style={{ color: "#8FA3B8", fontSize: 13, marginTop: 4 }}>
              {store.address}
            </div>
            <div style={{ color: "#8FA3B8", fontSize: 12, marginTop: 2 }}>
              {store.distance} away
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#C7F464", fontWeight: 700, fontSize: 20 }}>
              {store.cheapestCount}
            </div>
            <div style={{ fontSize: 12, color: "#8FA3B8" }}>best prices</div>
          </div>
        </div>
      ))}
    </div>
  );
}