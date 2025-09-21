import fs from "fs";
import { parse } from "csv-parse";
import dotenv from "dotenv";
import pkg from "pg";
const { Client } = pkg;

dotenv.config();

const csvPath = process.env.CSV_PATH || "../data/titanic_sample.csv";

async function readCSV(path) {
  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row) => rows.push(row))
      .on("end", resolve)
      .on("error", reject);
  });
  return rows;
}

async function main() {
  const client = new Client({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432", 10),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });
  await client.connect();

  console.log("Connected to Postgres");

  // Create table
  await client.query(`
    CREATE TABLE IF NOT EXISTS passengers (
      passenger_id INT PRIMARY KEY,
      survived INT,
      pclass INT,
      name TEXT,
      sex TEXT,
      age FLOAT,
      sibsp INT,
      parch INT,
      ticket TEXT,
      fare FLOAT,
      cabin TEXT,
      embarked TEXT
    );
  `);

  // Truncate
  await client.query("TRUNCATE TABLE passengers;");

  // Insert
  const rows = await readCSV(csvPath);
  for (const r of rows) {
    await client.query(
      `INSERT INTO passengers (passenger_id, survived, pclass, name, sex, age, sibsp, parch, ticket, fare, cabin, embarked)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       ON CONFLICT (passenger_id) DO NOTHING;`,
      [
        parseInt(r.PassengerId || "0", 10),
        r.Survived === "" ? null : parseInt(r.Survived || "0", 10),
        r.Pclass === "" ? null : parseInt(r.Pclass || "0", 10),
        r.Name || null,
        r.Sex || null,
        r.Age === "" ? null : parseFloat(r.Age),
        r.SibSp === "" ? null : parseInt(r.SibSp || "0", 10),
        r.Parch === "" ? null : parseInt(r.Parch || "0", 10),
        r.Ticket || null,
        r.Fare === "" ? null : parseFloat(r.Fare),
        r.Cabin || null,
        r.Embarked || null,
      ]
    );
  }

  console.log(`Inserted ${rows.length} rows into passengers`);
  await client.end();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
