document.addEventListener("DOMContentLoaded", function() {
    function validateField(input, errorMessage, regex = null) {
        const errorSpan = document.getElementById(input.id + "Error");

        if (input.value.trim() === "") {
            errorSpan.textContent = errorMessage;
        } else if (regex && !regex.test(input.value)) {
            errorSpan.textContent = "Format invalide";
        } else {
            errorSpan.textContent = "";
        }
    }

    function setupValidation(inputId, errorMessage, regex = null) {
        const input = document.getElementById(inputId);
        input.addEventListener("input", function() {
            validateField(input, errorMessage, regex);
        });
    }

    setupValidation("email", "Veuillez entrer un email valide", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    setupValidation("password", "Mot de passe requis", /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/);
    setupValidation("prenom", "Veuillez entrer un prénom valide", /^[A-Za-z]{2,}$/);
    setupValidation("nom", "Veuillez entrer un nom valide", /^[A-Za-z]{2,}$/);
    setupValidation("adresse", "Adresse requise");
    setupValidation("code_postal", "Code postal invalide", /^\d{5}$/);
});
