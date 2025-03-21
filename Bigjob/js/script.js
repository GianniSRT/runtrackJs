document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", showLoginForm);
    document.getElementById("registerBtn").addEventListener("click", showRegisterForm);
    document.getElementById("logoutBtn").addEventListener("click", () => {
        logout();
        location.reload();
    });

    const defaultUsers = [
        { email: "etudiant@laplateforme.fr", password: "1234", role: "étudiant" },
        { email: "moderateur@laplateforme.fr", password: "1234", role: "modérateur" },
        { email: "admin@laplateforme.fr", password: "1234", role: "administrateur" }
    ];

    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    function register(email, password) {
        if (!email.endsWith("@laplateforme.fr")) return false;

        const userExists = users.some(user => user.email === email);
        if (userExists) return false;

        users.push({ email, password, role: "étudiant" });
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    }

    function login(email, password) {
        return users.find(user => user.email === email && user.password === password);
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }

    function logout() {
        localStorage.removeItem("currentUser");
    }

    function requestPresence(date) {
        const currentUser = getCurrentUser();
        if (!currentUser) return "Erreur : utilisateur non connecté";

        if (new Date(date) < new Date()) return "Impossible de choisir une date passée.";

        requests.push({ email: currentUser.email, date, status: "en attente" });
        localStorage.setItem("requests", JSON.stringify(requests));
        return "Demande envoyée !";
    }

    function updateRequestStatus(email, date, status) {
        const request = requests.find(req => req.email === email && req.date === date);
        if (request) {
            request.status = status;
            localStorage.setItem("requests", JSON.stringify(requests));
            return `Demande ${status} !`;
        }
        return "Demande non trouvée.";
    }

    function handleRoleRedirection(user) {
        if (user.role === "étudiant") {
            showCalendar();
        } else if (user.role === "modérateur") {
            showModeratorPanel();
        } else if (user.role === "administrateur") {
            showAdminPanel();
        }
    }

    function showLoginForm() {
        document.getElementById("contentArea").innerHTML = `
            <h3>Connexion</h3>
            <input type="email" id="email" placeholder="Email" class="form-control"><br>
            <input type="password" id="password" placeholder="Mot de passe" class="form-control"><br>
            <button class="btn btn-primary" id="loginSubmit">Se connecter</button>`;

        document.getElementById("loginSubmit").addEventListener("click", () => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const user = login(email, password);
            if (user) {
                alert("Connexion réussie !");
                localStorage.setItem("currentUser", JSON.stringify(user));
                handleRoleRedirection(user);
            } else {
                alert("Email ou mot de passe incorrect.");
            }
        });
    }

    function showRegisterForm() {
        document.getElementById("contentArea").innerHTML = `
            <h3>Inscription</h3>
            <input type="email" id="registerEmail" placeholder="Email" class="form-control"><br>
            <input type="password" id="registerPassword" placeholder="Mot de passe" class="form-control"><br>
            <button class="btn btn-success" id="registerSubmit">S'inscrire</button>`;

        document.getElementById("registerSubmit").addEventListener("click", () => {
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            if (register(email, password)) {
                alert("Inscription réussie ! Connecte-toi maintenant.");
                showLoginForm();
            } else {
                alert("L'email doit être @laplateforme.fr !");
            }
        });
    }

    function showCalendar() {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== "étudiant") {
            alert("Accès refusé.");
            return;
        }

        document.getElementById("contentArea").innerHTML = `
            <h3>Calendrier</h3>
            <input type="date" id="dateInput" class="form-control"><br>
            <button class="btn btn-success" id="requestPresence">Demander présence</button>
            <h4 class="mt-3">Mes demandes :</h4>
            <ul id="requestList" class="list-group"></ul>`;

        updateRequestList();

        document.getElementById("requestPresence").addEventListener("click", () => {
            const date = document.getElementById("dateInput").value;
            alert(requestPresence(date));
            updateRequestList();
        });
    }

    function updateRequestList() {
        const currentUser = getCurrentUser();
        const userRequests = requests.filter(req => req.email === currentUser.email);
        const requestList = document.getElementById("requestList");
        requestList.innerHTML = "";

        userRequests.forEach(req => {
            const statusColor = req.status === "accepté" ? "success" : req.status === "refusé" ? "danger" : "warning";
            requestList.innerHTML += `<li class="list-group-item list-group-item-${statusColor}">${req.date} - ${req.status}</li>`;
        });
    }

    function showModeratorPanel() {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== "modérateur") {
            alert("Accès refusé.");
            return;
        }

        document.getElementById("contentArea").innerHTML = `
            <h3>Gestion des demandes</h3>
            <ul id="moderatorRequestList" class="list-group"></ul>`;

        updateModeratorRequestList();
    }

    function updateModeratorRequestList() {
        const requestList = document.getElementById("moderatorRequestList");
        requestList.innerHTML = "";

        const allRequests = requests;
        allRequests.forEach(req => {
            requestList.innerHTML += `
                <li class="list-group-item">
                    ${req.email} - ${req.date} - ${req.status}
                    <button class="btn btn-success btn-sm acceptRequest" data-email="${req.email}" data-date="${req.date}">Valider</button>
                    <button class="btn btn-danger btn-sm refuseRequest" data-email="${req.email}" data-date="${req.date}">Refuser</button>
                </li>`;
        });

        document.querySelectorAll(".acceptRequest").forEach(button => {
            button.addEventListener("click", (e) => {
                const email = e.target.getAttribute("data-email");
                const date = e.target.getAttribute("data-date");
                alert(updateRequestStatus(email, date, "accepté"));
                updateModeratorRequestList();
            });
        });

        document.querySelectorAll(".refuseRequest").forEach(button => {
            button.addEventListener("click", (e) => {
                const email = e.target.getAttribute("data-email");
                const date = e.target.getAttribute("data-date");
                alert(updateRequestStatus(email, date, "refusé"));
                updateModeratorRequestList();
            });
        });
    }

    function showAdminPanel() {
        const currentUser = getCurrentUser();
        if (!currentUser || currentUser.role !== "administrateur") {
            alert("Accès refusé.");
            return;
        }

        document.getElementById("contentArea").innerHTML = `
            <h3>Gestion des utilisateurs</h3>
            <ul id="adminUserList" class="list-group"></ul>`;

        updateAdminUserList();
    }

    function updateAdminUserList() {
        const adminList = document.getElementById("adminUserList");
        adminList.innerHTML = "";

        users.forEach(user => {
            adminList.innerHTML += `
                <li class="list-group-item">
                    ${user.email} - ${user.role}
                    <button class="btn btn-warning btn-sm promoteUser" data-email="${user.email}">Promouvoir</button>
                    <button class="btn btn-danger btn-sm removeUser" data-email="${user.email}">Supprimer</button>
                </li>`;
        });

        document.querySelectorAll(".promoteUser").forEach(button => {
            button.addEventListener("click", (e) => {
                const email = e.target.getAttribute("data-email");
                alert(promoteUser(email));
                updateAdminUserList();
            });
        });

        document.querySelectorAll(".removeUser").forEach(button => {
            button.addEventListener("click", (e) => {
                const email = e.target.getAttribute("data-email");
                alert(removeUser(email));
                updateAdminUserList();
            });
        });
    }

    function promoteUser(email) {
        const user = users.find(u => u.email === email);
        if (user) {
            if (user.role === "étudiant") {
                user.role = "modérateur";
            } else if (user.role === "modérateur") {
                user.role = "administrateur";
            }
            localStorage.setItem("users", JSON.stringify(users));
            return `${email} promu à ${user.role}`;
        }
        return "Utilisateur non trouvé.";
    }

    function removeUser(email) {
        const index = users.findIndex(u => u.email === email);
        if (index !== -1) {
            users.splice(index, 1);
            localStorage.setItem("users", JSON.stringify(users));
            return `${email} supprimé.`;
        }
        return "Utilisateur non trouvé.";
    }
});a
