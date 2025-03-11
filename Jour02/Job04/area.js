// On récupère l'élément textarea
const keylogger = document.getElementById("keylogger");

// On crée une variable pour stocker les lettres
let log = "";

// Fonction pour gérer les entrées de l'utilisateur
document.addEventListener("keydown", function(event) {
    // Vérifie si la touche est une lettre (a-z)
    if (event.key >= 'a' && event.key <= 'z') {
        // Si le focus est sur le textarea, ajoute deux fois la lettre
        if (document.activeElement === keylogger) {
            log += event.key + event.key;  // Ajoute deux fois la lettre
        } else {
            log += event.key;  // Ajoute une seule fois la lettre
        }

        // Met à jour la valeur du textarea avec le contenu du log
        keylogger.value = log;
    }
});

