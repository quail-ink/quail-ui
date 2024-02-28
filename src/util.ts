function closePopupMenu() {
  let trigger = parseInt(sessionStorage.getItem('quailui_global_popup_trigger') || '0') || 0;
  sessionStorage.setItem('quailui_global_popup_trigger', (trigger + 1) + '');
  window.dispatchEvent(new StorageEvent("storage", {
    key: 'quailui_global_popup_trigger',
    newValue: (trigger + 1) + '',
    oldValue: trigger + ''
  }));
}

function debounce(func: any, delay: number): any {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export {
  closePopupMenu,
  debounce,
}
