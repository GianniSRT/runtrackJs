document.getElementById("button").addEventListener("click", () => {
    fetch("expression.txt")
        .then(response => response.text())
        .then(text => {
            const p = document.createElement("p");
            p.textContent = text;
            document.body.appendChild(p);
        })
        .catch(error => console.error("Erreur :", error));
});
