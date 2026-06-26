import { useState, useMemo, useEffect } from "react";
import products from "../data/products";

const STORE_LABELS = {
  metro: "Metro",
  noFrills: "No Frills",
  walmart: "Walmart",
  zehrs: "Zehrs",
  superstore: "Superstore*",
  foodBasics: "Food Basics",
};

const SERVING_INFO = {
  "Large eggs":         { amount: "150g", protein: 18, cals: 210 },
  "Cottage cheese 2%": { amount: "125g", protein: 15, cals: 90  },
  "Greek yogurt plain": { amount: "200g", protein: 20, cals: 120 },
  "Milk 2%":            { amount: "250ml", protein: 8, cals: 120 },
  "Cheddar cheese":     { amount: "50g",  protein: 13, cals: 200 },
  "Mozzarella cheese":  { amount: "50g",  protein: 11, cals: 150 },
  "Chicken breast":     { amount: "200g", protein: 46, cals: 220 },
  "Chicken thighs":     { amount: "200g", protein: 28, cals: 280 },
  "Ground turkey":      { amount: "150g", protein: 30, cals: 195 },
  "Canned tuna":        { amount: "170g", protein: 39, cals: 130 },
  "Canned salmon":      { amount: "213g", protein: 40, cals: 180 },
  "Canned sardines":    { amount: "106g", protein: 19, cals: 130 },
  "Red lentils":        { amount: "100g", protein: 24, cals: 350 },
  "Chickpeas":          { amount: "270g", protein: 11, cals: 140 },
  "Black beans":        { amount: "270g", protein: 10, cals: 130 },
  "Kidney beans":       { amount: "270g", protein: 10, cals: 130 },
  "Soya chunks":        { amount: "50g",  protein: 26, cals: 175 },
  "Firm tofu":          { amount: "175g", protein: 14, cals: 135 },
  "Edamame":            { amount: "150g", protein: 13, cals: 140 },
  "Peanut butter":      { amount: "32g",  protein: 8,  cals: 190 },
  "Rolled oats":        { amount: "100g", protein: 13, cals: 350 },
  "Quinoa":             { amount: "100g", protein: 13, cals: 368 },
  "Spaghetti":          { amount: "100g", protein: 13, cals: 360 },
  "Hemp hearts":        { amount: "30g",  protein: 10, cals: 170 },
  "Chia seeds":         { amount: "28g",  protein: 5,  cals: 140 },
};

const SERVINGS_PER_PKG = {
  "Large eggs": 4, "Cottage cheese 2%": 4, "Greek yogurt plain": 3,
  "Milk 2%": 8, "Cheddar cheese": 8, "Mozzarella cheese": 8,
  "Chicken breast": 4, "Chicken thighs": 4, "Ground turkey": 4,
  "Canned tuna": 1, "Canned salmon": 1, "Canned sardines": 1,
  "Red lentils": 6, "Chickpeas": 3, "Black beans": 3, "Kidney beans": 3,
  "Soya chunks": 4, "Firm tofu": 2, "Edamame": 3, "Peanut butter": 10,
  "Rolled oats": 10, "Quinoa": 8, "Spaghetti": 6, "Hemp hearts": 8, "Chia seeds": 10,
};

const MEAL_SLOT = {
  "Large eggs": "Breakfast", "Rolled oats": "Breakfast",
  "Greek yogurt plain": "Breakfast", "Milk 2%": "Breakfast",
  "Cottage cheese 2%": "Snack", "Peanut butter": "Snack",
  "Chia seeds": "Snack", "Hemp hearts": "Snack",
  "Canned tuna": "Lunch", "Canned salmon": "Lunch",
  "Chicken breast": "Lunch", "Firm tofu": "Lunch", "Edamame": "Snack",
  "Chicken thighs": "Dinner", "Ground turkey": "Dinner",
  "Red lentils": "Dinner", "Chickpeas": "Dinner",
  "Black beans": "Dinner", "Kidney beans": "Dinner",
  "Soya chunks": "Dinner", "Spaghetti": "Dinner",
  "Canned sardines": "Snack", "Cheddar cheese": "Snack",
  "Mozzarella cheese": "Snack",
};

const COOKING_NOTE = {
  "Chicken breast": "Pan fry with garlic, salt, pepper - 6 min each side until cooked through",
  "Chicken thighs": "Simmer in curry sauce or roast at 200C for 35 min",
  "Ground turkey": "Fry with onion and garlic, season well, add to rice or pasta",
  "Red lentils": "Boil in 3x water for 15 min until soft, add cumin and turmeric",
  "Chickpeas": "Drain can, pan fry with curry powder or add to salad",
  "Black beans": "Drain can, mix with rice and any spices you have",
  "Kidney beans": "Drain can, add to dal or make a quick chili",
  "Soya chunks": "Soak in hot water 10 min, squeeze dry, cook with onion and spices",
  "Canned tuna": "Drain and mix with lemon juice, serve on rice or toast",
  "Canned salmon": "Drain, flake over pasta with olive oil and lemon",
  "Canned sardines": "Eat straight from can on toast with hot sauce or lemon",
  "Large eggs": "Scramble 3 eggs with butter, or boil exactly 9 min for hard boiled",
  "Rolled oats": "Cook 100g with 300ml water for 3-4 min, stir in peanut butter",
  "Greek yogurt plain": "Eat with honey and fruit, or mix into a smoothie",
  "Cottage cheese 2%": "Eat cold with salt and pepper, or mix with fruit",
  "Peanut butter": "2 tbsp on toast, mix into oats, or blend with milk for a shake",
  "Spaghetti": "Cook 100g in boiling water 10 min, add any protein on top",
  "Firm tofu": "Press, cube, pan fry in oil until golden - 4 min per side",
  "Edamame": "Microwave frozen 3 min, sprinkle salt, eat from pod",
  "Milk 2%": "Drink with meals or use in oats and shakes",
  "Cheddar cheese": "Slice and eat with crackers or melt on eggs",
  "Mozzarella cheese": "Slice and eat fresh or melt on pasta",
  "Canned salmon": "Drain, flake over pasta with olive oil and lemon",
};

function buildBasket(budget, proteinGoal, days, calGoal, excludeCategories) {
  const candidates = products
    .filter((p) => !excludeCategories.includes(p.category))
    .map((p) => {
      try {
        const available = Object.entries(p.prices || {}).filter(([_, v]) => v !== null && v > 0);
        if (!available.length) return null;
        const [storeKey, price] = available.sort((a, b) => a[1] - b[1])[0];
        const si = SERVING_INFO[p.name];
        if (!si) return null;
        const spp = SERVINGS_PER_PKG[p.name] || 4;
        const value = (si.protein * spp) / price;
        return { ...p, storeKey, price, si, spp, value };
      } catch (e) { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => b.value - a.value);

  const chosen = [];
  let spent = 0;
  for (const item of candidates) {
    if (spent + item.price <= budget) {
      chosen.push(item);
      spent += item.price;
    }
  }

  const totalProteinAvail = chosen.reduce((s, c) => s + c.si.protein * c.spp, 0);
  const weeklyGoal = proteinGoal * days;
  const coverage = Math.round((totalProteinAvail / weeklyGoal) * 100);

  const byStore = {};
  for (const item of chosen) {
    const store = STORE_LABELS[item.storeKey] || item.storeKey;
    if (!byStore[store]) byStore[store] = [];
    byStore[store].push(item);
  }

  const dayPlan = buildDayPlan(chosen, proteinGoal, calGoal);

  return {
    chosen, byStore, dayPlan,
    spent: Math.round(spent * 100) / 100,
    leftover: Math.round((budget - spent) * 100) / 100,
    perDayCost: Math.round((spent / days) * 100) / 100,
    proteinPerDay: dayPlan.totalProtein,
    calsPerDay: dayPlan.totalCals,
    totalProteinAvail, weeklyGoal, coverage, days, budget,
  };
}

function buildDayPlan(chosen, proteinGoal, calGoal) {
  const targets = {
    Breakfast: { protein: proteinGoal * 0.25, cals: calGoal * 0.25 },
    Lunch:     { protein: proteinGoal * 0.35, cals: calGoal * 0.35 },
    Dinner:    { protein: proteinGoal * 0.30, cals: calGoal * 0.30 },
    Snack:     { protein: proteinGoal * 0.10, cals: calGoal * 0.10 },
  };

  const bySlot = { Breakfast: [], Lunch: [], Dinner: [], Snack: [] };
  for (const item of chosen) {
    const slot = MEAL_SLOT[item.name] || "Snack";
    if (bySlot[slot]) bySlot[slot].push(item);
  }

  const plan = [];
  let totalProtein = 0;
  let totalCals = 0;

  for (const [slotName, target] of Object.entries(targets)) {
    const available = bySlot[slotName] || [];
    if (!available.length) continue;
    const slotItems = [];
    let slotProtein = 0;
    let slotCals = 0;

    for (const item of available) {
      if (slotProtein >= target.protein) break;
      if (slotCals + item.si.cals > target.cals * 1.3) continue;
      slotItems.push({
        name: item.name,
        amount: item.si.amount,
        protein: item.si.protein,
        cals: item.si.cals,
        note: COOKING_NOTE[item.name] || "",
      });
      slotProtein += item.si.protein;
      slotCals += item.si.cals;
    }

    if (slotItems.length) {
      plan.push({ slot: slotName, items: slotItems, protein: Math.round(slotProtein), cals: Math.round(slotCals) });
      totalProtein += slotProtein;
      totalCals += slotCals;
    }
  }

  return { slots: plan, totalProtein: Math.round(totalProtein), totalCals: Math.round(totalCals) };
}

export default function PlanPage({ overrides = {} }) {
  const [budget, setBudget] = useState(overrides.budget || 50);
  const [proteinGoal, setProteinGoal] = useState(overrides.proteinGoal || 150);
  const [calGoal, setCalGoal] = useState(overrides.calGoal || 2000);
  const [days, setDays] = useState(overrides.days || 7);
  const [tab, setTab] = useState("day");

  useEffect(() => {
    if (overrides.budget) setBudget(overrides.budget);
    if (overrides.proteinGoal) setProteinGoal(overrides.proteinGoal);
    if (overrides.calGoal) setCalGoal(overrides.calGoal);
    if (overrides.days) setDays(overrides.days);
  }, [overrides.budget, overrides.proteinGoal, overrides.calGoal, overrides.days]);

  const r = useMemo(
    () => buildBasket(Number(budget), Number(proteinGoal), Number(days), Number(calGoal), overrides.excludeCategories || []),
    [budget, proteinGoal, days, calGoal, overrides.excludeCategories]
  );

  return (
    <div style={{ padding: 20, maxWidth: 430, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 16 }}>Your Plan</h2>

      <div style={{ background: "#161F2C", borderRadius: 16, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "#8FA3B8", fontWeight: 700, display: "block", marginBottom: 4 }}>BUDGET ($)</label>
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
              style={{ width: "100%", background: "#0F1923", border: "1px solid #263243", borderRadius: 10, padding: "10px 12px", color: "#E6EBF2", fontSize: 16, boxSizing: "border-box" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: "#8FA3B8", fontWeight: 700, display: "block", marginBottom: 4 }}>PROTEIN (g/day)</label>
            <input type="number" value={proteinGoal} onChange={(e) => setProteinGoal(e.target.value)}
              style={{ width: "100%", background: "#0F1923", border: "1px solid #263243", borderRadius: 10, padding: "10px 12px", color: "#E6EBF2", fontSize: 16, boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, color: "#8FA3B8", fontWeight: 700, display: "block", marginBottom: 4 }}>CALORIE GOAL (kcal/day)</label>
          <input type="number" value={calGoal} onChange={(e) => setCalGoal(e.target.value)}
            style={{ width: "100%", background: "#0F1923", border: "1px solid #263243", borderRadius: 10, padding: "10px 12px", color: "#E6EBF2", fontSize: 16, boxSizing: "border-box" }} />
        </div>
        <label style={{ fontSize: 11, color: "#8FA3B8", fontWeight: 700, display: "block", marginBottom: 6 }}>MEAL PREP FOR</label>
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 3, 5, 7].map((d) => (
            <button key={d} onClick={() => setDays(d)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: "none", background: days === d ? "#C7F464" : "#0F1923", color: days === d ? "#111827" : "#8FA3B8", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              {d === 1 ? "1 day" : d + "d"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#1A2D1A,#111827)", border: "1px solid #2D5C2D", borderRadius: 16, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: "#8FA3B8", marginBottom: 4 }}>With ${r.budget} you can eat for</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "#C7F464", lineHeight: 1.1, marginBottom: 14 }}>{r.days} days</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          {[
            { label: "per day", value: "$" + r.perDayCost.toFixed(2), color: "#C7F464" },
            { label: "protein/day", value: r.proteinPerDay + "g", color: "#4ED6F2" },
            { label: "cal/day", value: r.calsPerDay, color: "#FF9F43" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "#0F1923", borderRadius: 10, padding: "10px 0", textAlign: "center" }}>
              <div style={{ fontWeight: 800, color: s.color, fontSize: 18 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#8FA3B8" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 6, background: "#263243", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: Math.min(r.coverage, 100) + "%", background: r.coverage >= 100 ? "linear-gradient(90deg,#C7F464,#4ED6F2)" : "linear-gradient(90deg,#FF9F43,#FF6B6B)" }} />
        </div>
        <div style={{ fontSize: 12, color: r.coverage >= 100 ? "#C7F464" : "#FF9F43" }}>
          {r.coverage >= 100 ? "Covers your full " + r.days + "-day protein goal" : "Covers " + r.coverage + "% of your protein goal"}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["day", "What to Eat Today"], ["list", "Shopping List"]].map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: tab === t ? "#C7F464" : "#161F2C", color: tab === t ? "#111827" : "#8FA3B8", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "day" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#8FA3B8" }}>One day of eating from your basket</div>
            <div style={{ fontWeight: 700, color: "#C7F464", fontSize: 13 }}>{r.dayPlan.totalProtein}g protein</div>
          </div>
          {r.dayPlan.slots.map((slot, i) => (
            <div key={i} style={{ background: "#161F2C", borderRadius: 14, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#C7F464", marginBottom: 12 }}>{slot.slot}</div>
              {slot.items.map((item, j) => (
                <div key={j} style={{ borderTop: j > 0 ? "1px solid #263243" : "none", paddingTop: j > 0 ? 12 : 0, marginTop: j > 0 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#4ED6F2", fontWeight: 700 }}>{item.protein}g protein</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#FF9F43", marginBottom: 6 }}>{item.amount} - {item.cals} cal</div>
                  {item.note && (
                    <div style={{ fontSize: 13, color: "#E6EBF2", background: "#0F1923", padding: "8px 10px", borderRadius: 8, lineHeight: 1.5 }}>
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          {r.dayPlan.slots.length === 0 && (
            <div style={{ background: "#161F2C", borderRadius: 14, padding: 20, textAlign: "center", color: "#8FA3B8" }}>
              Increase your budget to see meal suggestions
            </div>
          )}
          <div style={{ background: "#161F2C", borderRadius: 12, padding: 14, fontSize: 12, color: "#8FA3B8", lineHeight: 1.6 }}>
            Repeat this pattern each day. Rotate dinner options so you do not eat the same thing every night.
          </div>
        </div>
      )}

      {tab === "list" && (
        <div>
          <div style={{ fontSize: 13, color: "#8FA3B8", marginBottom: 12 }}>Buy this once - it lasts all {r.days} days</div>
          {Object.entries(r.byStore).map(([store, items]) => (
            <div key={store} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #263243" }}>
                <span style={{ fontWeight: 800, color: "#C7F464", fontSize: 15 }}>{store}</span>
                <span style={{ fontWeight: 700 }}>${items.reduce((s, i) => s + i.price, 0).toFixed(2)}</span>
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1A2333", fontSize: 14 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#8FA3B8", marginTop: 2 }}>
                      {item.si ? item.si.amount : item.unit} = {item.si ? item.si.protein : 0}g protein per serving
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "#C7F464" }}>${item.price.toFixed(2)}</div>
                    <div style={{ fontSize: 11, color: "#8FA3B8" }}>{item.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div style={{ background: "#161F2C", borderRadius: 12, padding: 14, fontSize: 12, color: "#8FA3B8" }}>
            Total: ${r.spent.toFixed(2)} - ${r.leftover.toFixed(2)} left from your budget
          </div>
        </div>
      )}
    </div>
  );
}