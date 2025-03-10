function estPremier(n) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return n > 1;
}

function sommeNombresPremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    }
    return false;
}

console.log(sommeNombresPremiers(5, 7)); // 12
console.log(sommeNombresPremiers(4, 7)); // false
