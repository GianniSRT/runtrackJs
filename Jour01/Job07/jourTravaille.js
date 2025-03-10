function jourTravaille(date) {
    const joursFeries2024 = ["01-01", "04-01", "05-01", "05-08", "07-14", "08-15", "11-01", "12-25"];
    const jour = String(date.getDate()).padStart(2, "0");
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const dateStr = `${mois}-${jour}`;

    if (joursFeries2024.includes(dateStr)) {
        console.log(`Le ${jour} ${mois} ${date.getFullYear()} est un jour férié`);
    } else if ([0, 6].includes(date.getDay())) {
        console.log(`Non, le ${jour} ${mois} ${date.getFullYear()} est un week-end`);
    } else {
        console.log(`Oui, le ${jour} ${mois} ${date.getFullYear()} est un jour travaillé`);
    }
}

jourTravaille(new Date("2024-01-01")); // Jour férié
jourTravaille(new Date("2024-04-01")); // Jour férié (Lundi de Pâques)
jourTravaille(new Date("2024-03-12")); // Jour travaillé
