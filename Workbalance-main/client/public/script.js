// Texte für verschiedene Sprachen
const translations = {
    de: {
        welcome: 'Willkommen bei WorkBalance',
        username: 'Benutzername',
        password: 'Passwort',
        login: 'Anmelden',
        logout: 'Abmelden',
        successLogin: 'Login erfolgreich!',
        errorLogin: 'Fehler: Benutzername oder Passwort ist falsch.',
        dashboardWelcome: 'Willkommen im Dashboard',
        successLogout: 'Erfolgreich abgemeldet.',
        stayDuration: 'Verweilbdauer',
        placeholderUsername: 'Benutzername',
        placeholderPassword: 'Passwort',
        dateTimeFormat: '{date} | {time}',
        successfulLoginMessage: 'Sie haben sich erfolgreich angemeldet.' // Neue Übersetzung hinzugefügt
    },
    en: {
        welcome: 'Welcome to WorkBalance',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        logout: 'Logout',
        successLogin: 'Login successful!',
        errorLogin: 'Error: Incorrect username or password.',
        dashboardWelcome: 'Welcome to the Dashboard',
        successLogout: 'Successfully logged out.',
        stayDuration: 'Stay Duration',
        placeholderUsername: 'Username',
        placeholderPassword: 'Password',
        dateTimeFormat: '{date} | {time}',
        successfulLoginMessage: 'You have successfully logged in.' // Neue Übersetzung hinzugefügt
    },
    ar: {
        welcome: 'أهلاً بك في WorkBalance',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        successLogin: 'تم تسجيل الدخول بنجاح!',
        errorLogin: 'خطأ: اسم المستخدم أو كلمة المرور غير صحيحة.',
        dashboardWelcome: 'مرحبًا بك في لوحة التحكم',
        successLogout: 'تم تسجيل الخروج بنجاح.',
        stayDuration: 'مدة البقاء',
        placeholderUsername: 'اسم المستخدم',
        placeholderPassword: 'كلمة المرور',
        dateTimeFormat: '{date} | {time}',
        successfulLoginMessage: 'لقد قمت بتسجيل الدخول بنجاح.' // Neue Übersetzung hinzugefügt
    },
    fr: {
        welcome: 'Bienvenue sur WorkBalance',
        username: 'Nom d\'utilisateur',
        password: 'Mot de passe',
        login: 'Se connecter',
        logout: 'Se déconnecter',
        successLogin: 'Connexion réussie!',
        errorLogin: 'Erreur: Nom d\'utilisateur ou mot de passe incorrect.',
        dashboardWelcome: 'Bienvenue dans le tableau de bord',
        successLogout: 'Déconnexion réussie.',
        stayDuration: 'Durée du séjour',
        placeholderUsername: 'Nom d\'utilisateur',
        placeholderPassword: 'Mot de passe',
        dateTimeFormat: '{date} | {time}',
        successfulLoginMessage: 'Vous êtes connecté avec succès.' // Neue Übersetzung hinzugefügt
    },
    es: {
        welcome: 'Bienvenido a WorkBalance',
        username: 'Nombre de usuario',
        password: 'Contraseña',
        login: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        successLogin: '¡Inicio de sesión exitoso!',
        errorLogin: 'Error: Nombre de usuario o contraseña incorrectos.',
        dashboardWelcome: 'Bienvenido al Panel de Control',
        successLogout: 'Desconexión exitosa.',
        stayDuration: 'Duración de la estancia',
        placeholderUsername: 'Nombre de usuario',
        placeholderPassword: 'Contraseña',
        dateTimeFormat: '{date} | {time}',
        successfulLoginMessage: '¡Te has registrado con éxito!' // Neue Übersetzung hinzugefügt
    },
    it: {
        welcome: 'Benvenuto su WorkBalance',
        username: 'Nome utente',
        password: 'Password',
        login: 'Accedi',
        logout: 'Disconnettersi',
        successLogin: 'Accesso riuscito!',
        errorLogin: 'Errore: nome utente o password errati.',
        dashboardWelcome: 'Benvenuto nel pannello di controllo',
        successLogout: 'Disconnessione avvenuta con successo.',
        stayDuration: 'Durata della permanenza',
        placeholderUsername: 'Nome utente',
        placeholderPassword: 'Password',
        dateTimeFormat: '{date} | {time}',
        successfulLoginMessage: 'Ti sei registrato con successo!' // Neue Übersetzung hinzugefügt
    }
};
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/login', { // Stelle sicher, dass der Port korrekt ist
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            const currentLanguage = document.getElementById('languageSelect').value; // Wähle die Sprache aus dem Dropdown
            showMessage(translations[currentLanguage]?.successLogin || "Login erfolgreich!", "success");

            // Login-Bereich ausblenden, Dashboard anzeigen
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'block';
        } else {
            const currentLanguage = document.getElementById('languageSelect').value;
            showMessage(translations[currentLanguage]?.errorLogin || data.message || "Login fehlgeschlagen.", "error");
        }
    } catch (error) {
        console.error("Fehler beim Login:", error);
        const currentLanguage = document.getElementById('languageSelect').value;
        showMessage(translations[currentLanguage]?.errorLogin || "Serverfehler.", "error");
    }
});



// Funktion zum Anzeigen einer Nachricht auf der Seite
function showMessage(message, type = "success") {
    // Überprüfen, ob eine Nachricht vorhanden ist, andernfalls erstellen
    let messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        document.body.appendChild(messageBox);
    }

    // Nachrichtentyp (success oder error) anpassen
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;  // Korrektur der Klasse
    messageBox.style.display = "block";

    // Nachricht nach 3 Sekunden automatisch ausblenden
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 3000);
}

// Passwort-Anzeige-Toggle
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Symbol ändern (Auge oder durchgestrichenes Auge)
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Logout-Logik
function logout() {
    // Dashboard ausblenden, Login-Bereich anzeigen
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';

    // Formular zurücksetzen
    document.getElementById('loginForm').reset();

    // Erfolgsnachricht beim Logout
    showMessage(translations[document.getElementById('languageSelect').value].successLogout, "success");
}

// Zeigt das aktuelle Datum und die Uhrzeit an (angepasst an die Sprache)
function updateDateTime(language) {
    const now = new Date();
    const date = now.toLocaleDateString(language === 'ar' ? 'ar-SA' : language, { year: 'numeric', month: 'short', day: 'numeric' });
    const time = now.toLocaleTimeString(language === 'ar' ? 'ar-SA' : language, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById('dateTimeDisplay').textContent = translations[language].dateTimeFormat.replace('{date}', date).replace('{time}', time);
}

// Bleibdauer (Verweildauer) auf der Login-Seite
let loginStartTime = Date.now();
function updateLoginTime(language) {
    const elapsedTime = Date.now() - loginStartTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('loginTimeDisplay').textContent = `${translations[language].stayDuration}: ${minutes} Min ${remainingSeconds} Sek`;
}

// Funktion zum Wechseln der Sprache
function changeLanguage() {
    const selectedLanguage = document.getElementById('languageSelect').value;

    // Aktualisiere die Texte auf der Seite
    document.querySelector('.login-header h1').textContent = translations[selectedLanguage].welcome;
    document.querySelector('label[for="username"]').textContent = translations[selectedLanguage].username;
    document.querySelector('label[for="password"]').textContent = translations[selectedLanguage].password;
    document.querySelector('.submit-btn').textContent = translations[selectedLanguage].login;
    document.querySelector('.logout-btn').textContent = translations[selectedLanguage].logout;
    document.querySelector('.dashboard-container h1').textContent = translations[selectedLanguage].dashboardWelcome;

    // Placeholder für Eingabefelder
    document.getElementById('username').placeholder = translations[selectedLanguage].placeholderUsername;
    document.getElementById('password').placeholder = translations[selectedLanguage].placeholderPassword;

    // Datum und Uhrzeit Format
    updateDateTime(selectedLanguage);

    //
}

// Initialisierung der Sprache
window.onload = function() {
    const defaultLanguage = 'de'; // Standard ist Deutsch
    document.getElementById('languageSelect').value = defaultLanguage;
    changeLanguage();
};

// Aktualisiert die Uhrzeit und Datum jede Sekunde
setInterval(() => updateDateTime(document.getElementById('languageSelect').value), 1000);

// Aktualisiert die Verweildauer auf der Login-Seite jede Sekunde
setInterval(() => updateLoginTime(document.getElementById('languageSelect').value), 1000);