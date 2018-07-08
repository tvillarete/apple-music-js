const initialState = {
   isFullscreen: false
};

const navReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'TOGGLE_FULLSCREEN':
         return {
            ...state,
            isFullscreen: !state.isFullscreen
         }
      default:
         return state;
   }
};

export default navReducer;
