let perguntas = [
    {
        titulo: 'Gato',
        alternativas: ['Gat', 'Cat', 'Gate', 'Dog', 'Bird'],
        correta: 1
    },{
        titulo: 'Fire',
        alternativas: ['Fogo', 'Água', 'Terra', 'Ar', 'Sol'],
        correta: 0
    },{
        titulo: 'Bird',
        alternativas: ['Gato', 'Urubu', 'Pombo', 'Pássaro', 'Cachorro'],
        correta: 3
    }
]

let app = {
    start: () => {
        this.pergunta_atual = 0;
        this.pontos = 0;
        app.registrar_eventos();
        app.mostra_pergunta(perguntas[this.pergunta_atual]);
        app.atualiza_pontos();
    },

    verifica_resposta: (i) => {
        if(i === this.pergunta.correta) {
            console.log("Voce acertou.");
            this.pontos++;
        }else {
            console.log("Voce errou.");
            this.pontos--;
        }
        app.atualiza_pontos();
        app.proxima_pergunta();
    },

    proxima_pergunta: () => {
        if(++this.pergunta_atual === perguntas.length)
            this.pergunta_atual = 0;
        app.mostra_pergunta(perguntas[this.pergunta_atual])
    },

    atualiza_pontos: () => {
        let score = document.getElementById('pontos');
        score.textContent = `Sua pontuação é ${this.pontos} pontos.`;
    },

    registrar_eventos: () => {
        document.querySelectorAll('.alternativa').forEach(
            (element, i) => {
                element.onclick = () => app.verifica_resposta(i);
            });
    },

    mostra_pergunta: (pergunta) => {
        this.pergunta = pergunta;
        document.getElementById('titulo').textContent = this.pergunta.titulo;
        document.querySelectorAll('.alternativa').forEach(
            (element, i) => element.textContent = this.pergunta.alternativas[i]
        );
    }
}

window.onload = app.start;