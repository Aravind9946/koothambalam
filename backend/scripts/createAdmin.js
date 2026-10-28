
require("dotenv").config();

const readline = require("readline");
const bcrypt = require("bcryptjs");
const pool = require("../src/db/pool");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function askHidden(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;
    let answer = "";

    stdout.write(question);

    if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
      rl.question("", resolve);
      return;
    }

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    function onData(char) {
      if (char === "\u0003") {
        stdin.setRawMode(false);
        stdin.pause();
        process.exit(1);
      }

      if (char === "\r" || char === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        stdout.write("\n");
        resolve(answer);
        return;
      }

      if (char === "\u007f" || char === "\b") {
        answer = answer.slice(0, -1);
        return;
      }

      if (char >= " ") {
        answer += char;
      }
    }

    stdin.on("data", onData);
  });
}

async function createAdmin() {
  try {
    const email = (await ask("Admin email: ")).trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const existing = await pool.query(
      "SELECT id FROM admin_users WHERE email = $1",
      [email]
    );

    if (existing.rowCount > 0) {
      throw new Error(
        "An admin with that email already exists. No changes were made."
      );
    }

    const password = await askHidden("Admin password (input hidden): ");

    if (password.length < 8) {
      throw new Error("Use a password with at least 8 characters.");
    }

    const confirmation = await askHidden("Confirm password: ");

    if (password !== confirmation) {
      throw new Error("Passwords do not match.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `INSERT INTO admin_users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, passwordHash]
    );

    console.log("\nAdmin account created successfully.");
    console.log("Admin ID:", result.rows[0].id);
    console.log("Admin email:", result.rows[0].email);
    console.log("Your password was stored as a hash.");
  } catch (error) {
    console.error("\nCould not create admin:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await pool.end();
  }
}

createAdmin();
