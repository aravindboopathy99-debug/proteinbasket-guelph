export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div>
        <div style={{ fontWeight: 800, fontSize: 20, color: "#C7F464" }}>
          ProteinBasket
        </div>
        <div style={{ fontSize: 12, color: "#8FA3B8" }}>Guelph, ON</div>
      </div>
      <div
        style={{
          background: "#1A2333",
          borderRadius: 12,
          padding: "8px 14px",
          fontSize: 13,
          color: "#8FA3B8",
        }}
      >
        Updated today
      </div>
    </div>
  );
}