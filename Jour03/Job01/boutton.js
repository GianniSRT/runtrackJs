const afficherBtn = document.getElementById("afficherBtn");
const cacherBtn = document.getElementById("cacherBtn");
const texte = document.getElementById("texte");

afficherBtn.addEventListener("click", function() {
    texte.style.display = "block";
    afficherBtn.style.display = "none";
    cacherBtn.style.display = "inline";
});

cacherBtn.addEventListener("click", function() {
    texte.style.display = "none";
    cacherBtn.style.display = "none";
    afficherBtn.style.display = "inline";
});
