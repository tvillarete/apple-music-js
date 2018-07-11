const initialState = {
   data: {
      artists: [],
      albums: [],
      artistData: {},
      albumData: {},
   },
};

const apiReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'FETCH_ARTIST_LIST_SUCCESS':
         return {
            ...state,
            data: {
               ...state.data,
               artists: action.artists,
               artistData: action.artistData,
            },
         };
      case 'FETCH_ARTIST_SUCCESS':
         const hi = {
            ...state,
            data: {
               ...state.data,
               artistData: {
                  ...state.data.artistData,
                  [action.name]: action.albums,
               },
               albumData: {
                  ...state.data.albumData,
                  ...action.albumData
               }
            },
         };
         console.log(hi);
         return {
            ...state,
            data: {
               ...state.data,
               artistData: {
                  ...state.data.artistData,
                  [action.name]: action.albums,
               },
               albumData: {
                  ...state.data.albumData,
                  ...action.albumData
               }
            },
         };
      case 'FETCH_ALBUM_LIST_SUCCESS':
         return {
            ...state,
            data: {
               ...state.data,
               albumData: {
                  ...state.data.albumData,
                  ...action.albumData
               },
               albums: action.albums
            },
         };
      case 'FETCH_ALBUM_SUCCESS':
         return {
            ...state,
            data: {
               ...state.data,
               albumData: {
                  ...state.data.albumData,
                  [action.album]: action.tracks
               }
            },
         };
      default:
         return state;
   }
};

export default apiReducer;
