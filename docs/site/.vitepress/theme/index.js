import DefaultTheme from 'vitepress/theme-without-fonts';
import { createMatUi } from 'mdu-ui';
import 'mdu-ui/styles.css';
import './custom.css';
import DocsPreview from './DocsPreview.vue';
import Layout from './Layout.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DocsPreview', DocsPreview);

    if (typeof document !== 'undefined') {
      app.use(createMatUi({
        iconClass: 'material-symbols-outlined',
      }));
    }
  },
};
