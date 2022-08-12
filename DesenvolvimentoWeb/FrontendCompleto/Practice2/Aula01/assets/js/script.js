let pergunta = {
    titulo: 'Gato',
    alternativas: ['Gat', 'Cat', 'Gate', 'Dog'],
    correta: 1
};

function start() {
    registrar_eventos();
    mostra_pergunta(pergunta);
}

function verifica_resposta(i) {
    if(i === pergunta.correta)
        console.log("Voce acertou.");
    else
        console.log("Voce errou.");
}

function registrar_eventos() {
    document.querySelectorAll('.alternativa').forEach(
        (element, i) => {
            element.onclick = () => verifica_resposta(i);
        });
}

function mostra_pergunta(pergunta) {
    document.getElementById('titulo').textContent = pergunta.titulo;
    document.querySelectorAll('.alternativa').forEach(
        (element, i) => element.textContent = pergunta.alternativas[i]
    );
}

window.onload = start;