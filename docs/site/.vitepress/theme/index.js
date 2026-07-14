import DefaultTheme from 'vitepress/theme-without-fonts';
import { createMatUi } from 'mdu-ui';
import 'mdu-ui/styles.css';
import './custom.css';
import DocsPreview from './DocsPreview.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DocsPreview', DocsPreview);

    if (typeof document !== 'undefined') {
      app.use(createMatUi({
        useMaterialSymbols: true,
      }));
    }
  },
};
