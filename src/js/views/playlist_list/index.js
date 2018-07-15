import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchPlaylists } from '../../api/actions';
import { pushView, pushPopup } from '../actions';
import { Button } from '../../toolbox';

const Container = styled.div`
   margin-top: 48px;
`;

const ButtonContainer = styled.div``;

class PlaylistListView extends Component {
   viewPlaylist = ({playlist, index}) => {
      this.props.pushView({
         name: 'Playlist',
         title: playlist.title,
         props: {
            index,
            playlist
         }
      });
   }

   newPlaylist = () => {
      this.props.pushPopup({
         name: 'Playlist Creator',
         props: {}
      });
   }

   componentDidMount() {
      this.props.fetchPlaylists();
   }

   render() {
      const { playlists } = this.props.apiState.data;

      return (
         <Container>
            <ButtonContainer>
               {playlists &&
                  playlists.map((playlist, index) => (
                     <Button
                        key={`${playlist.title}-${index}`}
                        label={playlist.title}
                        onClick={() => this.viewPlaylist({playlist, index})}
                     />
                  ))}
               <h3 onClick={this.newPlaylist}>New Playlist</h3>
            </ButtonContainer>
         </Container>
      );
   }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListView);
