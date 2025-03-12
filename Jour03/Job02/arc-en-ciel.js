const images = [
    "arc1.png", "arc2.png", "arc3.png", "arc4.png", "arc5.png", "arc6.png"
];

let ordreCorrect = [...images];

const dropContainer = document.getElementById("drop-container");
const melangerBtn = document.getElementById("melangerBtn");
const verifierBtn = document.getElementById("verifierBtn");
const message = document.getElementById("message");

// Fonction pour afficher les images
function afficherImages(ordre) {
    dropContainer.innerHTML = ""; // Vide le conteneur
    ordre.forEach(src => {
        let img = document.createElement("img");
        img.src = "images/" + src;
        img.setAttribute("draggable", true);
        img.addEventListener("dragstart", dragStart);
        dropContainer.appendChild(img);
    });
}

// Mélanger les images
function melangerImages() {
    let imagesMelangees = [...images].sort(() => Math.random() - 0.5);
    afficherImages(imagesMelangees);
}

// Vérifier l'ordre
function verifierOrdre() {
    let imgs = document.querySelectorAll("#drop-container img");
    let ordreActuel = Array.from(imgs).map(img => img.src.split("/").pop());

    if (JSON.stringify(ordreActuel) === JSON.stringify(ordreCorrect)) {
        message.textContent = "Vous avez gagné !";
        message.style.color = "green";
    } else {
        message.textContent = "Vous avez perdu !";
        message.style.color = "red";
    }
}

// Drag & Drop
let draggedImage = null;

function dragStart(event) {
    draggedImage = event.target;
}

dropContainer.addEventListener("dragover", function(event) {
    event.preventDefault();
});

dropContainer.addEventListener("drop", function(event) {
    event.preventDefault();
    if (event.target.tagName === "IMG") {
        let images = Array.from(dropContainer.children);
        let indexDragged = images.indexOf(draggedImage);
        let indexTarget = images.indexOf(event.target);

        images[indexDragged] = event.target;
        images[indexTarget] = draggedImage;

        dropContainer.innerHTML = "";
        images.forEach(img => dropContainer.appendChild(img));
    }
});

// Événements des boutons
melangerBtn.addEventListener("click", melangerImages);
verifierBtn.addEventListener("click", verifierOrdre);

// Initialisation avec les images dans le bon ordre
afficherImages(ordreCorrect);
