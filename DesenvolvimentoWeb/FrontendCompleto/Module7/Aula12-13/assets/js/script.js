const TIMER_STATE = {
    running: 'Running',
    stopped: 'Stopped',
    paused: 'Paused'
}
const app = Vue.createApp();

app.component('countdown-timer', {
    data() {
        return {
            timerMinutes: 0,
            timerSeconds: 0,
            timerState: TIMER_STATE.stopped
        }
    },
    props: {
        totalMinutes: {
            type: Number,
            default: 2
        },
        totalSeconds: {
            type: Number,
            default: 30
        }
    },
    mounted() {
        this.timerMinutes = this.totalMinutes;
        this.timerSeconds = this.totalSeconds;
    },
    methods: {
        start() {
            this._tick();
            this.ticking = setInterval(this._tick, 1000);
            this.timerState = TIMER_STATE.running;
        },
        pause() {
            clearInterval(this.ticking);
            this.timerState = TIMER_STATE.paused;
        },
        reset() {
            this.timerMinutes = this.totalMinutes;
            this.timerSeconds = this.totalSeconds;
            clearInterval(this.ticking);
            this.timerState = TIMER_STATE.stopped;
        },
        _tick() {
            if(this.timerSeconds !== 0)
                this.timerSeconds--;
            else if(this.timerSeconds === 0) {
                this.timerSeconds = 59;
                this.timerMinutes--;
            }
        }
    },
    template: `<div>
        <span>{{ timerMinutes }}:{{ timerSeconds }}</span>
        <br>
        <button class="btn btn-success" @click="start">Start</button>
        <button class="btn btn-warning" @click="pause">Pause</button>
        <button class="btn btn-danger" @click="reset">Reset</button>
    </div>`
});

app.mount('#app');