import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong } from '../../audio/actions';
import { fetchAlbum } from '../../api/actions';
import { pushView } from '../actions';
import { Button } from '../../toolbox';

const Container = styled.div`
   display: flex;
`;

const ButtonContainer = styled.div`
   flex: 1;
`;

class PlaylistView extends Component {
   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   render() {
      const { playlist, apiState } = this.props;
      const { tracks } = playlist;
      const { currentTrack } = apiState.data;

      return (
         <Container>
            <ButtonContainer>
               <h3>{playlist.title}</h3>
               {tracks &&
                  tracks.map((item, index) => {
                     return (
                        <Button
                           key={item.name}
                           label={item.name}
                           isPlaying={
                              currentTrack &&
                              item.name === currentTrack.name &&
                              item.album === currentTrack.album &&
                              item.artist === currentTrack.artist
                           }
                           onClick={() =>
                              this.playSong({ playlist: tracks, index })
                           }
                        />
                     );
                  })}
            </ButtonContainer>
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
      audioState: state.audioState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      playSong: ({ playlist, index }) =>
         dispatch(playSong({ playlist, index })),
      fetchAlbum: ({ album }) => dispatch(fetchAlbum({ album })),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(PlaylistView);
