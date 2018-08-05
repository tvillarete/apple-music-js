import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants, PlaylistButton } from '../../toolbox';
import { fetchPlaylists, createPlaylist } from '../../api/actions';
import { pushView, popPopup } from '../../views/actions';
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

const Title = styled.h3`
   margin: 0;
`;

const Section = styled.div`
   display: flex;
   padding: 0 16px;
`;

const TitleInput = styled.textarea`
   margin-left: 16px;
   -webkit-appearance: none;
   font-size: 24px;
   border: none;
   outline: none;
   flex: 1;
   resize: none;
   caret-color: ${color.red[4]};
   font-family: 'SF Pro Display';
`;

const DescriptionInput = styled.textarea`
   margin: 16px 0 16px 16px;
   -webkit-appearance: none;
   font-size: 24px;
   border: none;
   outline: none;
   flex: 1;
   resize: none;
   caret-color: ${color.red[4]};
   border-top: 1px solid ${color.gray[3]};
   border-bottom: 1px solid ${color.gray[3]};
   font-family: 'SF Pro Display';
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
   };
};

class PlaylistSelector extends Component {
   selectPlaylist = playlist => {
      this.props.onSelect(playlist);
      this.props.popPopup();
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
               left={<Button onClick={this.props.popPopup}>Cancel</Button>}
               center={<Title>Add to Playlist</Title>}
            />
            <ButtonContainer>{this.getPlaylistButtons()}</ButtonContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSelector);
