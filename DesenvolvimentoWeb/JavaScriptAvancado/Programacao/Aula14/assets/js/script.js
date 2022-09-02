let tabuleiro = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let jogadas = [];

// Dispose up to 5 bombs on the map randomly
for(let i = 0; i < 5; i++)
    tabuleiro[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)] = 1;

// Do 3 random moves
for(let i = 0; i < 3; i++) {
    jogadas.push(tabuleiro[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)]);
}

// Check if there is any chosen spot with a bomb
if(jogadas.find(bomba => bomba))
    alert("Voce perdeu!");
else
    alert("Voce venceu!");