document.getElementById("filterButton").addEventListener("click", function () {
    fetch("pokemon.json")
        .then(response => response.json())
        .then(data => {
            const idFilter = document.getElementById("idInput").value.trim();
            const nameFilter = document.getElementById("nameInput").value.trim().toLowerCase();
            const typeFilter = document.getElementById("typeSelect").value;

            // Filtrage des Pokémon
            const filteredData = data.filter(pokemon => {
                return (
                    (idFilter === "" || pokemon.id.toString() === idFilter) &&
                    (nameFilter === "" || pokemon.nom.toLowerCase().includes(nameFilter)) &&
                    (typeFilter === "" || pokemon.type === typeFilter)
                );
            });

            // Affichage des résultats
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = ""; // Efface les anciens résultats

            if (filteredData.length === 0) {
                resultsContainer.innerHTML = "<li>Aucun Pokémon trouvé</li>";
            } else {
                filteredData.forEach(pokemon => {
                    const li = document.createElement("li");
                    li.textContent = `ID: ${pokemon.id}, Nom: ${pokemon.nom}, Type: ${pokemon.type}`;
                    resultsContainer.appendChild(li);
                });
            }
        })
        .catch(error => console.error("Erreur de chargement des données :", error));
});
