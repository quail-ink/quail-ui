function closePopupMenu() {
  let trigger = parseInt(sessionStorage.getItem('quailui_global_popup_trigger') || '0') || 0;
  sessionStorage.setItem('quailui_global_popup_trigger', (trigger + 1) + '');
  window.dispatchEvent(new StorageEvent("storage", {
    key: 'quailui_global_popup_trigger',
    newValue: (trigger + 1) + '',
    oldValue: trigger + ''
  }));
}

export {
  closePopupMenu,
}
