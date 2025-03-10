function bisextile(année) {
    return (année % 4 === 0 && année % 100 !== 0) || (année % 400 === 0);
}

console.log(bisextile(2024)); 
console.log(bisextile(2023)); 
console.log(bisextile(2000)); 
console.log(bisextile(1900)); 