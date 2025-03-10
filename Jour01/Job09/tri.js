function tri(numbers, order) {
    if (order === "asc") {
        return numbers.sort(function(a, b) {
            return a - b;
        });
    } else if (order === "desc") {
        return numbers.sort(function(a, b) {
            return b - a;
        });
    }
}

console.log(tri([5, 3, 8, 1, 2], "asc"));  
console.log(tri([5, 3, 8, 1, 2], "desc")); 
