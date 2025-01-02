const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000', // URL deines Frontends
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
// Setze den Ordner 'public' als statisches Verzeichnis
app.use(express.static(path.join(__dirname, "../client/public"))); // Stellt sicher, dass alle Dateien im 'public' Ordner bereitgestellt werden

// Route für die Startseite
app.get("/", (req, res) => {
  // Sende die 'index.html' als Antwort
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
});

// SQLite-Datenbank initialisieren
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Datenbankfehler:", err.message);
  } else {
    console.log("Datenbankverbindung hergestellt.");
  }
});

// SQLite-Tabelle für Benutzer erstellen, falls sie noch nicht existiert
db.run(
  `CREATE TABLE IF NOT EXISTS USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    pass_hash TEXT,
    full_name TEXT,
    is_admin BOOLEAN
  )`
);

// Beispiel-Benutzer für den Test
const exampleUsers = [
  { username: "admin", password: "admin", full_name: "Admin", is_admin: true },
  { username: "guest", password: "guest", full_name: "Gast", is_admin: false },
  { username: "Workbalance", password: "workbalance1234", full_name: "Workbalance User", is_admin: false },
];

// Benutzer und Passwörter in die Datenbank einfügen, falls sie noch nicht existieren
exampleUsers.forEach((user) => {
  db.get("SELECT * FROM USERS WHERE username = ?", [user.username], (err, row) => {
    if (err) {
      console.error("Datenbankfehler:", err.message);
    } else if (!row) {
      bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Fehler beim Hashen des Passworts:", err.message);
        } else {
          db.run(
            "INSERT INTO USERS (username, pass_hash, full_name, is_admin) VALUES (?, ?, ?, ?)",
            [user.username, hashedPassword, user.full_name, user.is_admin],
            (err) => {
              if (err) {
                console.error("Fehler beim Hinzufügen des Benutzers:", err.message);
              } else {
                console.log(`${user.username} wurde erfolgreich hinzugefügt.`);
              }
            }
          );
        }
      });
    }
  });
});

// Middleware
app.use(bodyParser.json());

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM USERS WHERE username = ?", [username], (err, row) => {
      if (err) {
          console.error("Datenbankfehler:", err.message);
          return res.status(500).json({ message: "Interner Serverfehler." });
      }

      if (row) {
          bcrypt.compare(password, row.pass_hash, (err, result) => {
              if (err) {
                  console.error("Fehler beim Passwortvergleich:", err.message);
                  return res.status(500).json({ message: "Interner Serverfehler." });
              }

              if (result) {
                  return res.status(200).json({
                      message: "Login erfolgreich!",
                      user: {
                          username: row.username,
                          fullName: row.full_name,
                          isAdmin: row.is_admin
                      }
                  });
              } else {
                  return res.status(401).json({ message: "Falsches Passwort." });
              }
          });
      } else {
          return res.status(401).json({ message: "Benutzername oder Passwort falsch." });
      }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server läuft auf http://0.0.0.0:${port}`);
});

