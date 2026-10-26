
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

require("dotenv").config();
const pool = require("./src/db/pool");

// Allow requests from our local React frontend.
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Parse incoming JSON request bodies.
app.use(express.json());

// Basic health-check endpoint.
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Koothambalam backend is running",
  });
});

app.get("/api/db-health", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database() AS database, NOW() AS server_time"
    );

    res.json({
      status: "ok",
      message: "Connected to Neon PostgreSQL",
      database: result.rows[0].database,
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(500).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});


app.get("/api/dance-forms", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, is_active, created_at, updated_at
       FROM dance_forms
       ORDER BY name ASC`
    );

    res.json({
      status: "ok",
      count: result.rows.length,
      danceForms: result.rows,
    });
  } catch (error) {
    console.error("Fetching dance forms failed:", error.message);

    res.status(500).json({
      status: "error",
      message: "Could not fetch dance forms",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
