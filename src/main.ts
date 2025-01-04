import { registerPlugins } from '@/plugins';
import App from './App.vue';
import VueGtag from 'vue-gtag';
import { createHead } from '@unhead/vue';

// Composables
import { createApp } from 'vue';

// SCSS
import './styles/site.scss';
import './styles/fonts.scss';
import './styles/backgrounds.scss';
import './styles/borders.scss';
import './styles/cursors.scss';
import './styles/navbar.scss';
import './styles/settings.scss';

const app = createApp(App);
app.use(VueGtag, { config: { id: 'G-HCSTGH2R17' } });

const head = createHead();
app.use(head);

registerPlugins(app);

app.mount('#app');
