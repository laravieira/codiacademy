const taskItem = {
    template: `<li><slot></slot></li>`
};

const taskList = {
    data() {
        return {
            tasks: [
                'Assistir Aulas',
                'Alimentar-se bem',
                'Realizar atividades físicas',
                'Estar com amigos'
            ]
        }
    },
    components: {
        'task': taskItem
    },
    template: `<div>
        <h3>Lista de Tarefas</h3>
        <ul><task v-for="task in tasks">{{ task }}</task></ul>
    </div>`
};

Vue.createApp({
    components: {
        'task-list': taskList,
        'task': taskItem
    }
}).mount('#app');