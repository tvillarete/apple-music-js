const initialState = {
   isPlaying: false,
   hasAudio: false,
   currentIndex: 0,
   playlist: [],
   recents: localStorage.appleMusicRecents
      ? JSON.parse(localStorage.appleMusicRecents)
      : [],
   volume: 0.5,
};

const audioReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'PLAY_SONG':
         let recents = state.recents.filter(
            (track, index) =>
               track.album !== action.playlist[action.index].album && index < 7,
         );
         recents.splice(0, 0, action.playlist[action.index]);
         localStorage.appleMusicRecents = JSON.stringify(recents);

         return {
            ...state,
            isPlaying: true,
            hasAudio: true,
            playlist: action.playlist,
            currentIndex: action.index,
            recents,
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
            hasAudio: state.currentIndex + 1 < state.playlist.length,
            isPlaying:
               state.isPlaying &&
               state.currentIndex + 1 !== state.playlist.length,
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
