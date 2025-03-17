document.addEventListener("DOMContentLoaded", function () {
    chargerTypes();

    document.getElementById("filterButton").addEventListener("click", filtrerPokemon);
});

async function chargerTypes() {
    try {
        const response = await fetch('pokemon.json'); // Charger les données JSON
        const data = await response.json();
        const types = new Set();

        data.forEach(pokemon => {
            pokemon.type.forEach(type => types.add(type));
        });

        const select = document.getElementById("typeSelect");
        types.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des types :", error);
    }
}

async function filtrerPokemon() {
    try {
        const idFiltre = document.getElementById("idInput").value.trim();
        const nomFiltre = document.getElementById("nameInput").value.toLowerCase().trim();
        const typeFiltre = document.getElementById("typeSelect").value;

        const response = await fetch('pokemon.json'); // Charger les données JSON
        const data = await response.json();

        const resultats = data.filter(pokemon => {
            return (!idFiltre || pokemon.id == idFiltre) &&
                   (!nomFiltre || pokemon.name.french.toLowerCase().includes(nomFiltre)) &&
                   (!typeFiltre || pokemon.type.includes(typeFiltre));
        });

        afficherResultats(resultats);
    } catch (error) {
        console.error("Erreur lors du filtrage des Pokémon :", error);
    }
}

function afficherResultats(pokemons) {
    const liste = document.getElementById("pokemonList");
    liste.innerHTML = "";

    if (pokemons.length === 0) {
        liste.innerHTML = "<p>Aucun Pokémon trouvé</p>";
        return;
    }

    pokemons.forEach(pokemon => {
        const div = document.createElement("div");
        div.classList.add("pokemon-item");
        div.innerHTML = `<strong>${pokemon.name.french}</strong> (ID: ${pokemon.id}) - Type: ${pokemon.type.join(', ')}`;
        liste.appendChild(div); 
    });
}
