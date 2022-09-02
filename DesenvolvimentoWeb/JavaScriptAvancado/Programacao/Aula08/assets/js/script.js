let player = {
    saude: 100,
    felicidade: 50,
    play: function () {
        this.felicidade += 30;
    },
    eat: function (comida) {
        if(comida === "laranja")
            this.saude += 10;
        if(comida === "uva")
            this.saude += 20;
    },

    // Exercício
    moedas: 20,
    roupa: "nao",
    compra_roupa: function () {
        if(this.moedas < 20)
            return console.log("Vc nao tem moedas suficientes para comprar uma roupa padrao.");
        this.roupa = "sim";
        this.moedas -= 20;
    }
};
