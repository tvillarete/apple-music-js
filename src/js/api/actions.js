import { Api } from '../toolbox';

export const fetchArtists = () => {
   return dispatch => {
      return Api
         .fetchArtists()
         .then(artists => {
            // The albums of each artist
            const artistData = {};

            for (let i in artists) {
               const artist  = artists[i].artist;
               artistData[artist] = [];
            }

            dispatch({
               type: 'FETCH_ARTIST_LIST_SUCCESS',
               artists,
               artistData
            });
         })
         .catch(error => {
      		console.log(error);
         });
   };
};

export const fetchArtist = artist => {
   return dispatch => {
      return Api
         .fetchArtist(artist)
         .then(albums => {
            const albumData = {};

            for (let i in albums) {
               const album = albums[i];
               albumData[album.album] = [];
            }

            dispatch({
               type: 'FETCH_ARTIST_SUCCESS',
               name: artist,
               albums,
               albumData
            });
         })
         .catch(error => {
      		console.log(error);
         });
   };
};

export const fetchAlbum = ({ artist, album }) => {
   return dispatch => {
      return Api
         .fetchAlbum({ artist, album })
         .then(tracks => {
            dispatch({
               type: 'FETCH_ALBUM_SUCCESS',
               album,
               tracks
            });
         })
         .catch(error => {
      		console.log(error);
         });
   };
};
