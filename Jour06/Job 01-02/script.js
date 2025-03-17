$(document).ready(function() {
    // Achat du papillon
    $("#buyPapillon").click(function() {
        alert("Merci pour votre achat !");
    });

    // Rebooter le monde avec une citation aléatoire
    const citations = [
        "Tous ces moments se perdront dans l’oubli, comme des larmes dans la pluie.",
        "J’ai vu des choses que vous, humains, ne pourriez pas croire.",
        "C'est dommage qu’elle doive mourir, mais c’est ainsi.",
        "La lumière qui brûle deux fois plus fort brûle deux fois moins longtemps."
    ];

    $("#rebootWorld").click(function() {
        const randomQuote = citations[Math.floor(Math.random() * citations.length)];
        $(".jumbotron").html(`<h2>${randomQuote}</h2>`);
    });

    // Pagination change le contenu du jumbotron
    $(".page-link").click(function(e) {
        e.preventDefault();
        let content = $(this).data("content");
        $(".jumbotron").html(`<h2>${content}</h2>`);
    });

    // Changer la barre de progression
    let progress = 50;

    $("#increaseProgress").click(function() {
        if (progress < 100) {
            progress += 10;
            $("#progressBar").css("width", progress + "%");
        }
    });

    $("#decreaseProgress").click(function() {
        if (progress > 0) {
            progress -= 10;
            $("#progressBar").css("width", progress + "%");
        }
    });

    // Validation du formulaire
    $("#validateForm").click(function() {
        if ($("#email").val() !== "" && $("#password").val() !== "") {
            const colors = ["text-primary", "text-danger", "text-success", "text-warning"];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            $("#spinner").removeClass().addClass("spinner-border " + randomColor);
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });

    // Combo de touches D + G + C pour afficher une modale
    let keys = [];
    $(document).keydown(function(e) {
        keys.push(e.key.toUpperCase());
        if (keys.includes("D") && keys.includes("G") && keys.includes("C")) {
            alert(`Login: ${$("#login").val()}\nMot de passe: ${$("#password").val()}\nEmail: ${$("#email").val()}`);
            keys = [];
        }
    });
});
