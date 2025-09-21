import express from "express";
import cors from "cors";
import fs from "fs";
import { parse } from "csv-parse";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5174;
const CSV_PATH = process.env.CSV_PATH || "../data/titanic_sample.csv";

// Lazy in-memory cache so we don't re-read the CSV on every request
let titanicCache = null;
async function loadCSVOnce(path) {
  if (titanicCache) return titanicCache;
  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });
  titanicCache = rows;
  return rows;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get("/api/titanic", async (_req, res) => {
  try {
    const data = await loadCSVOnce(CSV_PATH);
    res.json({ count: data.length, columns: Object.keys(data[0] || {}), data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read CSV" });
  }
});

// Simple aggregate: survivors by Pclass
app.get("/api/titanic/survivors-by-class", async (_req, res) => {
  try {
    const data = await loadCSVOnce(CSV_PATH);
    const agg = {};
    for (const row of data) {
      const cls = row.Pclass || "Unknown";
      const survived = row.Survived === "1" || row.Survived === 1;
      if (!agg[cls]) agg[cls] = { survived: 0, total: 0 };
      agg[cls].total += 1;
      if (survived) agg[cls].survived += 1;
    }
    const result = Object.entries(agg).map(([pclass, { survived, total }]) => ({
      pclass,
      survived,
      total,
      rate: total ? survived / total : 0
    }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to aggregate" });
  }
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
