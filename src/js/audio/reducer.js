const initialState = {
   isPlaying: false,
   hasAudio: false,
   currentIndex: 0,
   playlist: [],
   inQueue: false,
   queue: [],
   prevQueue: [],
   time: {
      current: null,
      max: null
   },
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
            isPlaying: !!state.playlist.length || !!state.queue.length,
         };
      case 'PAUSE':
         return {
            ...state,
            isPlaying: false,
         };
      case 'NEXT_SONG':
         const newQueue = [...state.queue.slice(1, state.queue.length)];

         return {
            ...state,
            hasAudio: state.currentIndex + 1 < state.playlist.length,
            inQueue: state.queue.length,
            queue: state.inQueue ? newQueue : state.queue,
            isPlaying:
               !!state.isPlaying &&
               (state.currentIndex + 1 !== state.playlist.length ||
                  !!state.queue.length),
            currentIndex:
               state.currentIndex +
               (state.inQueue && state.queue.length ? 0 : 1),
         };
      case 'PREV_SONG':
         return {
            ...state,
            inQueue: false,
            queue: state.inQueue
               ? [...state.queue.slice(1, state.queue.length)]
               : state.queue,
            currentIndex:
               state.currentIndex > 0
                  ? state.currentIndex - 1
                  : state.currentIndex,
         };
      case 'ADD_TO_QUEUE':
         return {
            ...state,
            hasAudio: true,
            inQueue: !state.playlist.length,
            prevQueue: state.queue,
            queue: state.inQueue
               ? [
                    ...state.queue.slice(0, 1),
                    action.track,
                    ...state.queue.slice(2, state.length),
                 ]
               : [action.track, ...state.queue],
            playlist: state.playlist,
         };
      case 'UPDATE_TIME':
         return {
         ...state,
         time: {
            ...action.info
         }
      }
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
