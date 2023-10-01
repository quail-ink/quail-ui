import * as Icons from './components/icons';
import * as Common from './components/common';
import { QIconArrowLeft } from './components/icons';

import './style.scss';

const QuailUI = {
  install(app:any, options:any) {
    if (options?.debug) {
      console.log('options', options);
    }
    for (const [name, component] of Object.entries(Icons)) {
      if (options?.debug) {
        console.log('[quail-ui] register icon component', name, component);
      }
      app.component(name, component);
    }
    for (const [name, component] of Object.entries(Common)) {
      if (options?.debug) {
        console.log('[quail-ui] register cpmmon component', name, component);
      }
      app.component(name, component);
    }
  }
};

export { Icons, Common, QuailUI }