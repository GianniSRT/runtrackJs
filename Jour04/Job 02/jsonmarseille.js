function jsonValueKey(jsonString, key) {
    try {
        const jsonObject = JSON.parse(jsonString); // Convertir en objet JS
        return jsonObject[key] !== undefined ? jsonObject[key] : "Clé introuvable";
    } catch (error) {
        console.error("Erreur de parsing JSON :", error);
        return "JSON invalide";
    }
}

const jsonString = '{"name": "Gianni", "age": 20, "city": "Marseille", "food": "Sushi"}';

document.getElementById("searchButton").addEventListener("click", function () {
    const key = document.getElementById("keyInput").value; 
    const result = jsonValueKey(jsonString, key); 
    document.getElementById("result").textContent = result; 
});