import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants, PlaylistButton } from '../../toolbox';
import { fetchPlaylists } from '../../api/actions';
import { popPopup, pushPopup } from '../../views/actions';
import Header from '../components/header';

const { color, animation } = constants;
const { slideInFromBottom, slideOutToBottom } = animation;

const Container = styled.div`
   z-index: ${props => 100 + props.index};
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;
   animation: ${props => (props.closing ? slideOutToBottom : slideInFromBottom)}
      0.3s ease-in-out;
`;

const Button = styled.h3`
   margin: 0;
   color: ${color.red[4]};
   font-weight: ${props => props.bold && 'bold'};
   cursor: pointer;
   user-select: none;
`;

const Title = styled.h1`
   margin: 0 0 16px 0;
   padding: 0 0 16px 16px;
   border-bottom: 1px solid ${color.gray[2]};
   background: ${color.gray[1]};
`;

const ButtonContainer = styled.div`
   padding-left: 16px;
`;

const mapStateToProps = state => {
   return {
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchPlaylists: () => dispatch(fetchPlaylists()),
      popPopup: () => dispatch(popPopup()),
      pushPopup: popup => dispatch(pushPopup(popup)),
   };
};

class PlaylistSelector extends Component {
   selectPlaylist = playlist => {
      this.props.onSelect(playlist);
      this.props.popPopup();
   };

   newPlaylist = () => {
      this.props.pushPopup({
         name: 'Playlist Creator',
         props: {},
      });
   };

   getPlaylistButtons = () => {
      const { playlists } = this.props.apiState.data;
      const playlistButtons = [];

      for (let [key, playlist] of Object.entries(playlists)) {
         playlistButtons.push(
            <PlaylistButton
               key={`${key}-${playlist.title}-${playlist.description}`}
               title={playlist.title}
               img={playlist.img || 'images/music.jpg'}
               chevron
               onClick={() => this.selectPlaylist(playlist)}
            />,
         );
      }
      return playlistButtons;
   };

   componentDidMount() {
      this.props.fetchPlaylists();
   }

   render() {
      const { index, closing } = this.props;

      return (
         <Container index={index} closing={closing}>
            <Header
               color={color.gray[1]}
               right={<Button onClick={this.props.popPopup}>Cancel</Button>}
            />
            <Title>Add to a Playlist</Title>
            <ButtonContainer>
               <PlaylistButton
                  key="playlist-selector-new-playlist-button"
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSelector);
