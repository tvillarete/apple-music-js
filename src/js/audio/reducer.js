const initialState = {
   isPlaying: false,
   hasAudio: false,
   currentIndex: 0,
   playlist: [],
   volume: 0.5,
};

const audioReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'PLAY_SONG':
         return {
            ...state,
            isPlaying: true,
            hasAudio: true,
            playlist: action.playlist,
            currentIndex: action.index,
         };
      case 'RESUME':
         return {
            ...state,
            isPlaying: !!state.playlist.length,
         };
      case 'PAUSE':
         return {
            ...state,
            isPlaying: false,
         };
      case 'NEXT_SONG':
         return {
            ...state,
            isPlaying:
               state.isPlaying && state.currentIndex !== state.playlist.length,
            currentIndex: state.currentIndex + 1,
         };
      case 'PREV_SONG':
         return {
            ...state,
            currentIndex:
               state.currentIndex > 0
                  ? state.currentIndex - 1
                  : state.currentIndex,
         };
      case 'CHANGE_VOLUME':
         return {
            ...state,
            volume: action.volume,
         };
      default:
         return state;
   }
};

export default audioReducer;
