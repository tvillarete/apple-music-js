import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchPlaylists } from '../../api/actions';
import { pushView, pushPopup } from '../actions';
import { PlaylistButton } from '../../toolbox';

const Container = styled.div`
   margin-top: 48px;
`;

const ButtonContainer = styled.div``;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      pushPopup: popup => dispatch(pushPopup(popup)),
      fetchPlaylists: () => dispatch(fetchPlaylists()),
   };
};

class PlaylistListView extends Component {
   viewPlaylist = ({ playlist, index }) => {
      this.props.pushView({
         name: 'Playlist',
         title: playlist.title,
         props: {
            hideTitle: true,
            index,
            playlist,
         },
      });
   };

   newPlaylist = () => {
      this.props.pushPopup({
         name: 'Playlist Creator',
         props: {},
      });
   };

   componentDidMount() {
      this.props.fetchPlaylists();
   }

   getPlaylistButtons = () => {
      const playlists = localStorage.appleMusicPlaylists
         ? JSON.parse(localStorage.appleMusicPlaylists)
         : {};
      const playlistButtons = [];

      for (let [key, playlist] of Object.entries(playlists)) {
         playlistButtons.push(
            <PlaylistButton
               key={`${key}-${playlist.title}-${playlist.description}`}
               title={playlist.title}
               img={playlist.img || 'images/music.jpg'}
               chevron
               onClick={() => this.viewPlaylist({ playlist })}
            />,
         );
      }
      return playlistButtons;
   };

   render() {
      return (
         <Container>
            <ButtonContainer>
               <PlaylistButton
                  key="new-playlist-button"
                  title="New Playlist..."
                  img="images/playlist_add.jpg"
                  color="red"
                  onClick={this.newPlaylist}
               />
               {this.getPlaylistButtons()}
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListView);
