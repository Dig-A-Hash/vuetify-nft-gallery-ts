import { registerPlugins } from '@/plugins';
import { createHead } from '@unhead/vue';
import VueGtag from 'vue-gtag';
import App from './App.vue';

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
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { QuillEditor } from '@vueup/vue-quill';
const app = createApp(App);
app.use(VueGtag, { config: { id: 'G-HCSTGH2R17' } });

const head = createHead();
app.use(head);

registerPlugins(app);

// Handle all errors globally, just throw from anywhere in the app.
const appStore = useAppStore();
app.config.errorHandler = (error, vm, info) => {
  appStore.handleGlobalError(error);
};
app.component('QuillEditor', QuillEditor);  
app.mount('#app');
