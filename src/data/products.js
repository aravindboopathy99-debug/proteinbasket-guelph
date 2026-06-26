const products = [

  // ── EGGS & DAIRY ──────────────────────────────────────────────────
  { id:1,  name:"Large eggs",              category:"Dairy",        unit:"12 ct",   protein:72,  calories:840,  prices:{ metro:null, noFrills:3.88, zehrs:6.29,  walmart:4.13,  foodBasics:3.99 } },
  { id:2,  name:"Cottage cheese 2%",       category:"Dairy",        unit:"500g",    protein:60,  calories:360,  prices:{ metro:null, noFrills:4.49, zehrs:4.49,  walmart:4.70,  foodBasics:5.49 } },
  { id:3,  name:"Greek yogurt plain",      category:"Dairy",        unit:"750g",    protein:75,  calories:450,  prices:{ metro:null, noFrills:6.0, zehrs:6.00,  walmart:5.84,  foodBasics:4.99 } },
  { id:4,  name:"Milk 2% 4L",              category:"Dairy",        unit:"4L",      protein:132, calories:2600, prices:{ metro:6.44, noFrills:5.49, zehrs:6.44,  walmart:6.44,  foodBasics:6.44 } },
  { id:5,  name:"Cheddar cheese",          category:"Dairy",        unit:"400g",    protein:100, calories:1600, prices:{ metro:null, noFrills:null, zehrs:8.99,  walmart:4.98,  foodBasics:null } },
  { id:6,  name:"Mozzarella cheese",       category:"Dairy",        unit:"400g",    protein:88,  calories:1200, prices:{ metro:null, noFrills:null, zehrs:null,  walmart:5.75,  foodBasics:null } },
  { id:7,  name:"fairlife Milk 2%",        category:"Dairy",        unit:"1.5L",    protein:46,  calories:390,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:8.25,  foodBasics:null } },
  { id:8,  name:"Protein milk Neilson",    category:"Dairy",        unit:"1.89L",   protein:56,  calories:500,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:7.68,  foodBasics:null } },

  // ── CHICKEN ───────────────────────────────────────────────────────
  { id:10, name:"Chicken breast",          category:"Meat",         unit:"per kg",  protein:310, calories:1650, prices:{ metro:21.58, noFrills:11.00, zehrs:12.00, walmart:14.24, foodBasics:14.31 } },
  { id:11, name:"Chicken thighs",          category:"Meat",         unit:"per kg",  protein:180, calories:2200, prices:{ metro:13.87, noFrills:8.82, zehrs:13.05, walmart:8.38,  foodBasics:8.8 } },
  { id:12, name:"Chicken drumsticks",      category:"Meat",         unit:"per kg",  protein:200, calories:1800, prices:{ metro:null, noFrills:null, zehrs:null,  walmart:8.38,  foodBasics:null } },

  // ── BEEF & PORK ───────────────────────────────────────────────────
  { id:20, name:"Ground beef regular",     category:"Meat",         unit:"per pkg", protein:112, calories:1200, prices:{ metro:9.49, noFrills:8.5, zehrs:8.5,  walmart:6.27,  foodBasics:8.0 } },
  { id:21, name:"Ground beef lean",        category:"Meat",         unit:"1.09kg",  protein:310, calories:2800, prices:{ metro:null, noFrills:9.0, zehrs:15.41,  walmart:10.48, foodBasics:13.99 } },
  { id:28, name:"Beef sirloin steak",     category:"Meat",         unit:"per kg",  protein:280, calories:2200, prices:{ metro:28.64, noFrills:31.95, zehrs:null,  walmart:28.92, foodBasics:26.43 } },
  { id:22, name:"Ground turkey",           category:"Meat",         unit:"454g",    protein:112, calories:800,  prices:{ metro:null, noFrills:3.19, zehrs:null,  walmart:7.98,  foodBasics:7.99 } },
  { id:23, name:"Pork loin chops",         category:"Meat",         unit:"per kg",  protein:260, calories:1800, prices:{ metro:null, noFrills:12.13, zehrs:13.23,  walmart:8.38,  foodBasics:13.21 } },
  { id:24, name:"Lean ground pork",        category:"Meat",         unit:"454g",    protein:88,  calories:900,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:5.22,  foodBasics:null } },
  { id:25, name:"Bacon",                   category:"Meat",         unit:"375g",    protein:72,  calories:1200, prices:{ metro:5.99, noFrills:6.0, zehrs:6.0,  walmart:5.22,  foodBasics:3.49 } },
  { id:26, name:"Peameal bacon",           category:"Meat",         unit:"454g",    protein:112, calories:800,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:6.27,  foodBasics:null } },
  { id:27, name:"Deli chicken breast",     category:"Meat",         unit:"175g",    protein:36,  calories:130,  prices:{ metro:null, noFrills:null, zehrs:4.0,  walmart:3.13,  foodBasics:null } },

  // ── SEAFOOD ───────────────────────────────────────────────────────
  { id:30, name:"Canned tuna",             category:"Seafood",      unit:"170g",    protein:42,  calories:80,   prices:{ metro:null, noFrills:1.29, zehrs:1.78,  walmart:1.30,  foodBasics:1.49 } },
  { id:31, name:"Canned salmon",           category:"Seafood",      unit:"213g",    protein:45,  calories:130,  prices:{ metro:null, noFrills:4.79, zehrs:4.79,  walmart:4.64,  foodBasics:4.49 } },
  { id:32, name:"Canned sardines",         category:"Seafood",      unit:"106g",    protein:22,  calories:130,  prices:{ metro:1.79, noFrills:1.79, zehrs:1.79,  walmart:2.28,  foodBasics:1.09 } },
  { id:33, name:"Canned mackerel",         category:"Seafood",      unit:"155g",    protein:26,  calories:200,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:1.32,  foodBasics:null } },
  { id:34, name:"Frozen shrimp",           category:"Seafood",      unit:"625g",    protein:100, calories:400,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:8.38,  foodBasics:null } },
  { id:35, name:"Tilapia fillets",         category:"Seafood",      unit:"per kg",  protein:280, calories:800,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:25.18, foodBasics:null } },

  // ── PLANT PROTEIN ─────────────────────────────────────────────────
  { id:40, name:"Red lentils",             category:"Legumes",      unit:"900g",    protein:216, calories:3060, prices:{ metro:3.99, noFrills:3.19, zehrs:3.00,  walmart:3.12,  foodBasics:3.49 } },
  { id:41, name:"Chickpeas",               category:"Legumes",      unit:"540ml",   protein:32,  calories:420,  prices:{ metro:1.79, noFrills:1.5, zehrs:1.5,  walmart:1.51,  foodBasics:1.49 } },
  { id:42, name:"Black beans",             category:"Legumes",      unit:"540ml",   protein:28,  calories:380,  prices:{ metro:1.99, noFrills:1.5, zehrs:1.5,  walmart:1.51,  foodBasics:1.59 } },
  { id:43, name:"Kidney beans",            category:"Legumes",      unit:"540ml",   protein:28,  calories:370,  prices:{ metro:1.99, noFrills:1.5, zehrs:1.5,  walmart:1.51,  foodBasics:1.49 } },
  { id:44, name:"Soya chunks",             category:"Plant Protein",unit:"200g",    protein:104, calories:700,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:3.24,  foodBasics:null } },
  { id:45, name:"Firm tofu",               category:"Plant Protein",unit:"350g",    protein:28,  calories:270,  prices:{ metro:2.99, noFrills:2.79, zehrs:2.89,  walmart:null,  foodBasics:2.79 } },
  { id:47, name:"Paneer",                   category:"Dairy",        unit:"300-375g", protein:60,  calories:900,  prices:{ metro:7.99, noFrills:4.79, zehrs:null,  walmart:4.96,  foodBasics:5.99 } },
  { id:46, name:"Edamame frozen",          category:"Plant Protein",unit:"500g",    protein:43,  calories:470,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:4.59,  foodBasics:null } },

  // ── SUPPLEMENTS & BARS ────────────────────────────────────────────
  { id:50, name:"Quest protein bar 4pk",   category:"Supplements",  unit:"4x60g",   protein:84,  calories:720,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:17.09, foodBasics:4.49 } },
  { id:51, name:"Quest protein chips",     category:"Supplements",  unit:"32g",     protein:19,  calories:120,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:4.45,  foodBasics:null } },
  { id:52, name:"Pure Protein whey 907g",  category:"Supplements",  unit:"907g",    protein:630, calories:2800, prices:{ metro:null, noFrills:null, zehrs:null,  walmart:29.68, foodBasics:null } },
  { id:53, name:"Six Star whey protein",   category:"Supplements",  unit:"907g",    protein:540, calories:2400, prices:{ metro:null, noFrills:null, zehrs:null,  walmart:34.64, foodBasics:null } },
  { id:54, name:"Premier Protein powder",  category:"Supplements",  unit:"697g",    protein:490, calories:2100, prices:{ metro:null, noFrills:null, zehrs:null,  walmart:39.98, foodBasics:null } },
  { id:55, name:"Premier Protein shake 4pk",category:"Supplements", unit:"4x325ml", protein:120, calories:480,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:13.62, foodBasics:null } },
  { id:56, name:"Core Power shake",        category:"Supplements",  unit:"414ml",   protein:26,  calories:230,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:5.01,  foodBasics:null } },
  { id:57, name:"Muscle Milk 4pk",         category:"Supplements",  unit:"4x330ml", protein:100, calories:600,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:10.56, foodBasics:null } },
  { id:58, name:"Milk2Go Sport shake",     category:"Supplements",  unit:"325ml",   protein:20,  calories:180,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:2.75,  foodBasics:null } },
  { id:62, name:"ONE protein bar",           category:"Supplements",  unit:"60g",     protein:20,  calories:220,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:null,  foodBasics:3.49 } },
  { id:59, name:"Creatine monohydrate",    category:"Supplements",  unit:"414g",    protein:0,   calories:0,    prices:{ metro:16.51, noFrills:null, zehrs:null,  walmart:26.22, foodBasics:null } },
  { id:60, name:"Gatorade protein bar",    category:"Supplements",  unit:"80g",     protein:20,  calories:280,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:3.12,  foodBasics:null } },
  { id:61, name:"Maple Leaf protein stick",category:"Supplements",  unit:"1 stick", protein:12,  calories:70,   prices:{ metro:null, noFrills:null, zehrs:null,  walmart:1.97,  foodBasics:null } },

  // ── GRAINS & CARBS ────────────────────────────────────────────────
  { id:70, name:"Rolled oats",             category:"Grains",       unit:"1kg",     protein:130, calories:3500, prices:{ metro:4.79, noFrills:3.29, zehrs:3.79,  walmart:2.91,  foodBasics:2.88 } },
  { id:71, name:"Long grain rice",         category:"Grains",       unit:"2kg",     protein:140, calories:6600, prices:{ metro:2.99, noFrills:5.99, zehrs:5.0,  walmart:5.43,  foodBasics:3.49 } },
  { id:72, name:"Spaghetti",               category:"Grains",       unit:"900g",    protein:117, calories:3240, prices:{ metro:null, noFrills:3.99, zehrs:2.29,  walmart:2.15,  foodBasics:1.97 } },
  { id:73, name:"Whole wheat bread",       category:"Grains",       unit:"675g",    protein:60,  calories:1400, prices:{ metro:null, noFrills:2.48, zehrs:2.48,  walmart:2.60,  foodBasics:2.48 } },
  { id:74, name:"Sweet potato",            category:"Grains",       unit:"per kg",  protein:16,  calories:860,  prices:{ metro:8.8, noFrills:13.87, zehrs:13.87,  walmart:3.33,  foodBasics:8.8 } },
  { id:75, name:"Rice cakes plain",        category:"Grains",       unit:"120g",    protein:10,  calories:440,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:null,  foodBasics:null } },

  // ── PANTRY & HEALTHY FATS ─────────────────────────────────────────
  { id:80, name:"Peanut butter",           category:"Pantry",       unit:"1kg",     protein:250, calories:5800, prices:{ metro:null, noFrills:4.5, zehrs:6.00,  walmart:6.03,  foodBasics:4.44 } },
  { id:81, name:"Almond butter",           category:"Pantry",       unit:"500g",    protein:100, calories:2900, prices:{ metro:8.99, noFrills:10.0, zehrs:10.0,  walmart:14.99,  foodBasics:8.49 } },
  { id:82, name:"Olive oil",               category:"Pantry",       unit:"750ml",   protein:0,   calories:6000, prices:{ metro:null, noFrills:9.0, zehrs:9.0,  walmart:8.36,  foodBasics:8.99 } },
  { id:83, name:"Chia seeds",              category:"Seeds",        unit:"300g",    protein:48,  calories:600,  prices:{ metro:4.49, noFrills:8.0, zehrs:8.0,  walmart:5.25,  foodBasics:4.49 } },
  { id:84, name:"Hemp hearts",             category:"Seeds",        unit:"227g",    protein:80,  calories:1450, prices:{ metro:8.92, noFrills:8.5, zehrs:8.5,  walmart:10.47, foodBasics:7.49 } },

  // ── DRINKS ────────────────────────────────────────────────────────
  { id:90, name:"Diet Coke 12pk",          category:"Drinks",       unit:"12x355ml",protein:0,   calories:0,    prices:{ metro:8.49, noFrills:8.5, zehrs:8.5,  walmart:8.69,  foodBasics:7.98 } },
  { id:93, name:"Gatorade 6pk",             category:"Drinks",       unit:"6x591ml", protein:0,   calories:840,  prices:{ metro:7.99, noFrills:6.50, zehrs:null,  walmart:6.27,  foodBasics:5.99 } },
  { id:91, name:"Bubly sparkling water",   category:"Drinks",       unit:"12x355ml",protein:0,   calories:0,    prices:{ metro:null, noFrills:null, zehrs:null,  walmart:6.27,  foodBasics:null } },
  { id:92, name:"Chocolate milk 1L",       category:"Drinks",       unit:"1L",      protein:36,  calories:680,  prices:{ metro:null, noFrills:2.73, zehrs:2.73,  walmart:null,  foodBasics:2.49 } },
  // ── PRODUCE ───────────────────────────────────────────────────────
  { id:95, name:"Sweet potato",            category:"Produce",      unit:"per kg",  protein:16,  calories:860,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:3.33,  foodBasics:null } },
  { id:96, name:"Avocado",                 category:"Produce",      unit:"each",    protein:4,   calories:240,  prices:{ metro:null, noFrills:null, zehrs:null,  walmart:1.03,  foodBasics:null } },
  { id:97, name:"Broccoli",                category:"Produce",      unit:"each",    protein:8,   calories:50,   prices:{ metro:null, noFrills:null, zehrs:null,  walmart:2.49,  foodBasics:null } },
  { id:98, name:"Banana",                  category:"Produce",      unit:"per kg",  protein:5,   calories:890,  prices:{ metro:1.96, noFrills:1.52, zehrs:1.52,  walmart:1.52,  foodBasics:1.52 } },
];

export default products;