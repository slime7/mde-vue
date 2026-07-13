import DefaultTheme from 'vitepress/theme';
import { createMatUi } from 'mdu-ui';
import 'mdu-ui/styles.css';
import './custom.css';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    if (typeof document !== 'undefined') {
      app.use(createMatUi());
    }
  },
};
