
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = 5000;
require("dotenv").config();
const pool = require("./src/db/pool");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from backend/.env");
}


function requireAdmin(req, res, next) {
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Please log in to access this resource.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.admin = {
      adminId: decoded.adminId,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(401).json({
      status: "error",
      message: "Your session is invalid or expired. Please log in again.",
    });
  }
}



 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

 
app.use(express.json());
app.use(cookieParser());


app.post("/api/admin/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, email, password_hash, is_active
       FROM admin_users
       WHERE email = $1
       LIMIT 1`,
      [normalizedEmail]
    );

    const admin = result.rows[0];

    if (
      !admin ||
      !admin.is_active ||
      !(await bcrypt.compare(password, admin.password_hash))
    ) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { adminId: admin.id.toString(), email: admin.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
      path: "/",
    });

    await pool.query(
      "UPDATE admin_users SET last_login_at = NOW() WHERE id = $1",
      [admin.id]
    );

    return res.json({
      status: "ok",
      message: "Login successful.",
      admin: {
        id: admin.id.toString(),
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      status: "error",
      message: "Unable to log in right now. Please try again.",
    });
  }
});


app.post("/api/admin/logout", (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.json({
    status: "success",
    message: "Logged out successfully.",
  });
});


app.get("/api/admin/me", requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, is_active
       FROM admin_users
       WHERE id = $1
       LIMIT 1`,
      [req.admin.adminId]
    );

    const admin = result.rows[0];

    if (!admin || !admin.is_active) {
      res.clearCookie("admin_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        status: "error",
        message: "This admin account is inactive or no longer exists.",
      });
    }

    return res.json({
      status: "ok",
      admin: {
        id: admin.id.toString(),
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin session check error:", error.message);

    return res.status(500).json({
      status: "error",
      message: "Unable to verify your session right now.",
    });
  }
});


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


app.get("/api/gallery", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         id,
         title,
         description,
         category,
         media_type,
         media_url,
         created_at
       FROM gallery_media
       WHERE is_published = TRUE
       ORDER BY created_at DESC`
    );

    res.json({
      status: "ok",
      count: result.rows.length,
      media: result.rows,
    });
  } catch (error) {
    console.error("Fetching gallery media failed:", error.message);

    res.status(500).json({
      status: "error",
      message: "Could not fetch gallery media",
    });
  }
});



app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
