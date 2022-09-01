const TIMER_STATE = {
    running: 'Running',
    stopped: 'Stopped',
    paused: 'Paused'
}
const app = Vue.createApp({});

app.component('countdown-timer', {
    data() {
        return {
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
    template: `<div>
      <span>{{ totalMinutes }}:{{ totalSeconds }}</span>
      <br>
      <button class="btn btn-success">Start</button>
      <button class="btn btn-warning">Pause</button>
      <button class="btn btn-danger">Reset</button>
    </div>`,
});

app.mount('#app');