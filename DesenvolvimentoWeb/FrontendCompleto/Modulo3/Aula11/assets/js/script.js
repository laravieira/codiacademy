function converte(begin, end) {
    console.log("------------------------");
    console.log("| Celsius | Fahrenheit |");
    console.log("------------------------");
    for(; begin <= end; begin++)
        console.log("|   %iC   |     %iF    |", 5 * (begin - 32) / 9, begin);
    console.log("------------------------");
}