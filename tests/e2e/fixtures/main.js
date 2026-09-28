import { createApp } from 'vue';
import { createMatUi } from 'mde-vue';
import 'mde-vue/styles.css';
import App from './App.vue';

window.__events = [];
window.pushEvent = (name, payload = null) => {
  window.__events.push({ name, payload });
};

const query = new URLSearchParams(window.location.search);
const theme = {};
if (query.get('seed')) {
  theme.seedColor = query.get('seed');
}
if (query.get('mode')) {
  theme.mode = query.get('mode');
}

const pluginOptions = {};
if (Object.keys(theme).length > 0) {
  pluginOptions.theme = theme;
}

const app = createApp(App);
app.use(createMatUi(pluginOptions));
app.mount('#app');
