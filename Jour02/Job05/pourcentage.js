// Fonction pour mettre à jour la couleur du footer en fonction du scroll
window.addEventListener('scroll', function() {
    const footer = document.getElementById('footer');
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Hauteur totale de la page - hauteur de la fenêtre
    const scrollPosition = window.scrollY; // Position actuelle du scroll
    const scrollPercentage = (scrollPosition / docHeight) * 100; 

    const red = Math.min(255, Math.floor(scrollPercentage * 2.55)); 
    const green = 255 - red; 
    footer.style.backgroundColor = `rgb(${red}, ${green}, 0)`; 
});
