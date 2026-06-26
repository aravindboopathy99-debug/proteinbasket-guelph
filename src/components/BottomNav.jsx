const tabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "search", label: "Prices", icon: "🔍" },
  { id: "plan", label: "Plan", icon: "🛒" },
  { id: "ai", label: "AI", icon: "✨" },
];

export default function BottomNav({ page, setPage }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#161F2C",
        borderTop: "1px solid #263243",
        display: "flex",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setPage(tab.id)}
          style={{
            flex: 1,
            padding: "12px 0",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: page === tab.id ? "#C7F464" : "#8FA3B8",
            }}
          >
            {tab.label}
          </span>
          {page === tab.id && (
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#C7F464",
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}