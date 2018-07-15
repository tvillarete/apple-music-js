export const pushView = view => ({ type: 'PUSH_VIEW', view });
export const popView = () => ({ type: 'POP_VIEW' });
export const pushPopup = popup => ({ type: 'PUSH_POPUP', popup });
export const popPopup = () => ({ type: 'POP_POPUP' });
