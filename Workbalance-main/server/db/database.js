const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

module.exports = function initDatabase() {
    const db = new sqlite3.Database("./server/db/database.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err && err.code === "SQLITE_CANTOPEN") {
            console.log("Datenbank nicht gefunden. Initialisiere...");
            createDatabase();
        } else {
            console.log("Datenbank erfolgreich geöffnet.");
        }
    });

    return db;
};

function createDatabase() {
    const db = new sqlite3.Database("./server/db/database.db", (err) => {
        if (err) throw err;
        else {
            createTables(db);
        }
    });
}

function createTables(db) {
    const workbalancePassword = 'workbalance1234';
    const workbalancePasswordHash = bcrypt.hashSync(workbalancePassword, 10);  // bcrypt verwenden

    db.exec(
        `CREATE TABLE IF NOT EXISTS USERS (
            username TEXT PRIMARY KEY NOT NULL,
            pass_hash TEXT NOT NULL,
            full_name TEXT NOT NULL,
            is_admin BOOLEAN NOT NULL
        );
        INSERT OR IGNORE INTO USERS (username, pass_hash, full_name, is_admin) 
        VALUES 
            ('admin', '${bcrypt.hashSync("admin", 10)}', 'Admin', true),
            ('guest', '${bcrypt.hashSync("guest", 10)}', 'Gast', false),
            ('Workbalance', '${workbalancePasswordHash}', 'Workbalance User', false);
        `,
        (err) => {
            if (err) console.error("Fehler beim Erstellen der Tabellen:", err.message);
            else console.log("Datenbank initialisiert.");
        }
    );
}
