import { Api } from '../toolbox';

export const fetchArtists = () => {
   return dispatch => {
      return Api.fetchArtists()
         .then(artists => {
            // The albums of each artist
            const artistData = {};

            for (let i in artists) {
               const artist = artists[i].artist;
               artistData[artist] = [];
            }

            dispatch({
               type: 'FETCH_ARTIST_LIST_SUCCESS',
               artists,
               artistData,
            });
         })
         .catch(error => {
            console.log(error);
         });
   };
};

export const fetchArtist = artist => {
   return dispatch => {
      return Api.fetchArtist(artist)
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
               albumData,
            });
         })
         .catch(error => {
            console.log(error);
         });
   };
};

export const fetchAlbums = () => {
   return dispatch => {
      return Api.fetchAlbums()
         .then(albums => {
            const albumData = {};

            for (let album of albums) {
               const name = album.album;
               albumData[name] = [];
            }

            dispatch({
               type: 'FETCH_ALBUM_LIST_SUCCESS',
               albumData,
               albums,
            });
         })
         .catch(error => {
            console.log(error);
         });
   };
};

export const fetchAlbum = ({ artist, album }) => {
   return dispatch => {
      return Api.fetchAlbum({ artist, album })
         .then(tracks => {
            dispatch({
               type: 'FETCH_ALBUM_SUCCESS',
               album,
               tracks,
            });
         })
         .catch(error => {
            console.log(error);
         });
   };
};

export const fetchPlaylists = () => {
   return dispatch => {
      const playlists = localStorage.appleMusicPlaylists;

      dispatch({
         type: 'FETCH_PLAYLIST_LIST_SUCCESS',
         playlists: playlists ? JSON.parse(playlists) : [],
      });
   };
};

export const createPlaylist = playlist => {
   return dispatch => {
      let playlists = localStorage.appleMusicPlaylists
         ? JSON.parse(localStorage.appleMusicPlaylists)
         : {};

      playlists[playlist.title] = playlist;
      localStorage.appleMusicPlaylists = JSON.stringify(playlists);

      dispatch({
         type: 'CREATE_PLAYLIST',
         playlists,
      });
   };
};

export const addToPlaylist = (track, playlist) => {
   return dispatch => {
      let playlists = localStorage.appleMusicPlaylists;
      playlists = playlists ? JSON.parse(playlists) : playlists;

      // Add track to playlist
      playlist = {
         ...playlist,
         tracks: [...playlist.tracks, track],
      };

      // Update playlist in playlist list
      playlists = {
         ...playlists,
         [playlist.title]: playlist,
      };

      localStorage.appleMusicPlaylists = JSON.stringify(playlists);

      dispatch({
         type: 'UPDATE_PLAYLIST',
         playlists,
      });
   };
};

export const removeFromPlaylist = (index, playlist) => {
   return dispatch => {
      let playlists = localStorage.appleMusicPlaylists;
      playlists = playlists ? JSON.parse(playlists) : playlists;

      playlist = {
         ...playlist,
         tracks: [
            ...playlist.tracks.slice(0, index),
            ...playlist.tracks.slice(index + 1),
         ],
      };

      // Update playlist in playlist list
      playlists = {
         ...playlists,
         [playlist.title]: playlist,
      };

      localStorage.appleMusicPlaylists = JSON.stringify(playlists);

      dispatch({
         type: 'UPDATE_PLAYLIST',
         playlists,
      });
   };
};

export const deletePlaylist = playlist => {
   return dispatch => {
      let playlists = localStorage.appleMusicPlaylists;
      playlists = playlists ? JSON.parse(playlists) : playlists;

      delete playlists[playlist.title];

      localStorage.appleMusicPlaylists = JSON.stringify(playlists);

      dispatch({
         type: 'UPDATE_PLAYLIST',
         playlists,
      });
   };
};
