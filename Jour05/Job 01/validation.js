document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("input", validateInput);
    });

    function validateInput(event) {
        const input = event.target;
        const errorMessage = input.nextElementSibling;
        let message = "";

        if (input.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            message = "Format d'email invalide";
        }

        errorMessage.textContent = message;
    }
});
