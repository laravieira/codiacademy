let itens_comprados = {
    espada: 0,
    escudo: 0,
    adaga:0
};

function comprar(moedas, produto) {
    if (!itens_comprados[produto] === undefined)
        console.log("Este produto nao esta disponível");

    if (produto == "espada" && moedas >= 100) {
        itens_comprados.espada += 1;
        console.log("Espada comprada, lhe resta", moedas - 100, "moedas");
    } else if (produto == "escudo" && moedas >= 200) {
        itens_comprados.escudo += 1;
        console.log("Escudo comprada, lhe resta", moedas - 200, "moedas");
    }else if(produto == "adaga" && moedas >= 300) {
        itens_comprados.adaga += 1;
        console.log("Adaga comprada, lhe resta", moedas - 300, "moedas");
    }else
        console.log("Moedas nao suficientes para efetuar a compra");

    return itens_comprados;
}