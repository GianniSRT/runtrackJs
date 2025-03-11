let article = document.createElement("article");
article.id = "citation";
article.textContent = "L'important n'est pas la chute, mais l'atterrissage.";
article.style.display = "none"; 
document.body.appendChild(article);

function showhide() {
    article.style.display = (article.style.display === "none") ? "block" : "none";
}

document.getElementById("button").addEventListener("click", showhide);
