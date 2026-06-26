import { useState } from "react";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import PlanPage from "./pages/PlanPage";
import AIPage from "./pages/AIPage";
import BottomNav from "./components/BottomNav";

function App() {
  const [page, setPage] = useState("home");
  const [planOverrides, setPlanOverrides] = useState({});

  function handleApplyPlan(result) {
    setPlanOverrides({
      budget: result.budget || 40,
      proteinGoal: result.proteinGoal || 150,
      calGoal: result.calGoal || 2000,
      days: result.days || 7,
      excludeCategories: result.excludeCategories || [],
    });
    setPage("plan");
  }

  const renderPage = () => {
    switch (page) {
      case "home": return <Home onNavigate={setPage} />;
      case "search": return <SearchPage />;
      case "plan": return <PlanPage overrides={planOverrides} />;
      case "ai": return <AIPage onApplyPlan={handleApplyPlan} />;
      default: return <Home onNavigate={setPage} />;
    }
  };

  return (
    <div style={{ background: "#0F1923", minHeight: "100vh", paddingBottom: 80, color: "#E6EBF2" }}>
      {renderPage()}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}

export default App;