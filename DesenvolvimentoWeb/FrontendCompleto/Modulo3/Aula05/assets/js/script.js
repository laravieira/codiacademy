let isMagico = prompt("O player e magico?", "sim") === "sim";
let vidas = prompt("Quantas vidas o " + (isMagico?"magico":"player") + " tem?");
let pontos = prompt("Quantos pontos o " + (isMagico?"magico":"player") + " tem?");

if(pontos > 1000 && vidas >= 3)
    alert("O player ganhou a chave AZUL");
else if(pontos < 1000 || vidas < 3)
    alert("O player ganhou a chave VERDE");
else if(pontos == 1000 && !isMagico)
    alert("O player ganhou a chave LARANJA");
else
    alert("O player nao merece nenhuma chave");