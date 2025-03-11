let count = 0; // départ du compteur 0 (logique)

function incrementer() {
    count++; 
    document.getElementById("compteur").textContent = count; 
}

document.getElementById("button").addEventListener("click", incrementer);
