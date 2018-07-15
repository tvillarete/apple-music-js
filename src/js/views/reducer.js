const initialState = {
   stack: [
      {
         name: 'Library',
         props: {},
      },
   ],
   popupStack: [],
};

const viewReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'PUSH_VIEW':
         return {
            ...state,
            stack: state.stack.concat(action.view),
         };
      case 'POP_VIEW':
         return {
            ...state,
            stack: state.stack.slice(0, state.stack.length - 1),
         };
      case 'PUSH_POPUP':
         return {
            ...state,
            popupStack: state.popupStack.concat(action.popup),
         };
      case 'POP_POPUP':
         return {
            ...state,
            popupStack: state.popupStack.slice(0, state.popupStack.length - 1),
         };
      default:
         return state;
   }
};

export default viewReducer;
