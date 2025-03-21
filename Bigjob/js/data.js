const defaultUsers = [
    { email: "etudiant@laplateforme.fr", password: "1234", role: "étudiant" },
    { email: "moderateur@laplateforme.fr", password: "1234", role: "modérateur" },
    { email: "admin@laplateforme.fr", password: "1234", role: "administrateur" }
];

// Vérifie si les utilisateurs existent déjà dans le localStorage
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Charge les utilisateurs et les demandes depuis localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let requests = JSON.parse(localStorage.getItem("requests")) || [];

// 📌 Fonction d'inscription (réservée aux emails @laplateforme.fr)
function register(email, password) {
    if (!email.endsWith("@laplateforme.fr")) {
        return false; // Seuls les emails de La Plateforme_ sont autorisés
    }

    // Vérifie si l'utilisateur existe déjà
    const userExists = users.some(user => user.email === email);
    if (userExists) return false;

    // Ajoute un nouvel utilisateur avec le rôle "étudiant"
    users.push({ email, password, role: "étudiant" });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

// 📌 Fonction de connexion
function login(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        setCurrentUser(user);
        return user;
    }
    return null;
}

// 📌 Stocke l'utilisateur connecté dans le localStorage
function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

// 📌 Récupère l'utilisateur actuellement connecté
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

// 📌 Déconnexion de l'utilisateur
function logout() {
    localStorage.removeItem("currentUser");
}

// 📌 Demande d'autorisation de présence (réservé aux étudiants)
function requestPresence(date) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "étudiant") {
        return "Erreur : seuls les étudiants peuvent faire une demande.";
    }

    // Vérifie si la date est passée
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Supprime l'heure pour comparer uniquement les jours
    if (selectedDate < today) return "Impossible de choisir une date passée.";

    // Enregistre la demande
    requests.push({ email: currentUser.email, date, status: "en attente" });
    localStorage.setItem("requests", JSON.stringify(requests));
    return "Demande envoyée avec succès !";
}

// 📌 Afficher les demandes (réservé aux modérateurs et administrateurs)
function getRequests() {
    const currentUser = getCurrentUser();
    if (!currentUser || (currentUser.role !== "modérateur" && currentUser.role !== "administrateur")) {
        return [];
    }
    return requests;
}

// 📌 Accepter ou refuser une demande (réservé aux modérateurs et administrateurs)
function updateRequestStatus(email, date, status) {
    const currentUser = getCurrentUser();
    if (!currentUser || (currentUser.role !== "modérateur" && currentUser.role !== "administrateur")) {
        return "Erreur : action non autorisée.";
    }

    // Trouver et modifier la demande
    requests = requests.map(req => {
        if (req.email === email && req.date === date) {
            return { ...req, status };
        }
        return req;
    });

    localStorage.setItem("requests", JSON.stringify(requests));
    return `Demande ${status} !`;
}

// 📌 Gestion des rôles (réservé aux administrateurs)
function updateUserRole(email, newRole) {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "administrateur") {
        return "Erreur : seuls les administrateurs peuvent modifier les rôles.";
    }

    users = users.map(user => {
        if (user.email === email) {
            return { ...user, role: newRole };
        }
        return user;
    });

    localStorage.setItem("users", JSON.stringify(users));
    return `Le rôle de ${email} a été mis à jour en ${newRole}.`;
}

// 📌 Ajout d'une fonction pour afficher les demandes et permettre leur acceptation/refus
function displayRequests() {
    const currentUser = getCurrentUser();
    if (!currentUser || (currentUser.role !== "modérateur" && currentUser.role !== "administrateur")) {
        alert("Accès interdit. Vous devez être modérateur ou administrateur.");
        return;
    }

    const requestContainer = document.getElementById("requestContainer");
    requestContainer.innerHTML = ""; // Vide le conteneur pour éviter les doublons

    // Affiche toutes les demandes
    requests.forEach(req => {
        const status = req.status === "en attente" ? "En attente" : req.status === "accepté" ? "Accepté" : "Refusé";
        requestContainer.innerHTML += `
            <div class="request-item">
                <p>${req.email} a demandé la présence le ${req.date}. Statut: ${status}</p>
                <button onclick="handleRequest('${req.email}', '${req.date}', 'accepté')">Accepter</button>
                <button onclick="handleRequest('${req.email}', '${req.date}', 'refusé')">Refuser</button>
            </div>
        `;
    });
}

// 📌 Gérer les actions d'acceptation et de refus des demandes
function handleRequest(email, date, status) {
    const result = updateRequestStatus(email, date, status);
    alert(result);
    displayRequests(); // Met à jour l'affichage des demandes
}
