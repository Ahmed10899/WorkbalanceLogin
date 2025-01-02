const sqlite3 = require("sqlite3").verbose();

// Datenbank erstellen oder öffnen
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Datenbankfehler:", err.message);
  } else {
    console.log("Datenbank wurde erfolgreich erstellt.");
  }
});

// Tabelle USERS erstellen
db.run(
  `CREATE TABLE IF NOT EXISTS USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    pass_hash TEXT,
    full_name TEXT,
    is_admin BOOLEAN
  )`,
  (err) => {
    if (err) {
      console.error("Fehler beim Erstellen der Tabelle:", err.message);
    } else {
      console.log("Tabelle USERS wurde erfolgreich erstellt.");
    }
  }
);

// Benutzer hinzufügen
const bcrypt = require("bcrypt");
const users = [
  { username: "Workbalance", password: "workbalance1234", full_name: "Workbalance User", is_admin: false },
  { username: "admin", password: "admin", full_name: "Administrator", is_admin: true },
];

users.forEach((user) => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.error("Fehler beim Hashen des Passworts:", err.message);
    } else {
      db.run(
        `INSERT INTO USERS (username, pass_hash, full_name, is_admin) VALUES (?, ?, ?, ?)`,
        [user.username, hash, user.full_name, user.is_admin],
        (err) => {
          if (err) {
            console.error(`Fehler beim Hinzufügen von Benutzer ${user.username}:`, err.message);
          } else {
            console.log(`Benutzer ${user.username} wurde erfolgreich hinzugefügt.`);
          }
        }
      );
    }
  });
});

// Datenbankverbindung schließen
db.close((err) => {
  if (err) {
    console.error("Fehler beim Schließen der Datenbank:", err.message);
  } else {
    console.log("Datenbankverbindung geschlossen.");
  }
});
