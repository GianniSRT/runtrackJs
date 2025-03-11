// Code Konami
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
];

let konamiIndex = 0;

// Fonction pour détecter le code Konami
document.addEventListener('keydown', function(event) {
    // Vérifie si la touche pressée correspond à la touche attendue dans la séquence du Konami Code
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        // Si toutes les touches ont été correctement pressées, applique le style
        if (konamiIndex === konamiCode.length) {
            document.body.classList.add('la-plateforme');
            alert('Code Konami réussi ! La page est stylisée aux couleurs de La Plateforme_');
            konamiIndex = 0; // Réinitialise la séquence du Konami Code
        }
    } else {
        // Si l'utilisateur se trompe, réinitialiser l'index
        konamiIndex = 0;
    }
});
