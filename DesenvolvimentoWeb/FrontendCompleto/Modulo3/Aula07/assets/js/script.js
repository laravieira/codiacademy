let player = {
    nome: "Lara",
    vidas: 3,
    pontos: 43823,
    e_magico: true,
    espada: false,
    magia: 5000,
    mapa: {
        nome: "Zona da Mata",
        cidades: ["Chacara", "Juiz de Fora", "Bicas"],
        cidades_visitadas: ["Chácara", "Juiz de Fora"],
        objetos_encontrados: ["Corrente", "Foice", "Arpão", "Cajado"]
    }
};

player.tem_calice = true;

delete player.tem_calice;
