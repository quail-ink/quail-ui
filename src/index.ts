import * as Icons from './components/icons';
import * as Common from './components/common';
import { closePopupMenu } from './util';
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

    document.body.addEventListener('click', (e) => {
      // hide popup menu
      // let trigger = parseInt(sessionStorage.getItem('quailui_global_popup_trigger') || '0') || 0;
      // sessionStorage.setItem('quailui_global_popup_trigger', (trigger + 1) + '');
      // window.dispatchEvent(new StorageEvent("storage", {
      //   key: 'quailui_global_popup_trigger',
      //   newValue: (trigger + 1) + '',
      //   oldValue: trigger + ''
      // }));
      closePopupMenu();
    })

  }
};

export { Icons, Common, QuailUI }