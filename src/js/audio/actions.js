export const playSong = ({ playlist, index }) => {
   return dispatch => {
      dispatch({
         type: 'PLAY_SONG',
         playlist,
         index,
      });
   };
};

export const resume = () => ({ type: 'RESUME' });
export const pause = () => ({ type: 'PAUSE' });
export const nextSong = () => ({ type: 'NEXT_SONG' });
export const prevSong = () => ({ type: 'PREV_SONG' });
export const addToQueue = track => ({ type: 'ADD_TO_QUEUE', track });
export const changeVolume = volume => ({ type: 'CHANGE_VOLUME', volume });
export const updateTime = info => ({ type: 'UPDATE_TIME', info });
