import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong } from '../../audio/actions';
import { fetchAlbum } from '../../api/actions';
import { pushView } from '../actions';
import { Button } from '../../toolbox';

const Container = styled.div``;

const ButtonContainer = styled.div`
   margin-top: 16px;
`;

class AlbumView extends Component {
   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   }

   componentDidMount() {
      const { album, apiState } = this.props;
      const { albumData } = apiState.data;

      if (!albumData[album].length) {
         this.props.fetchAlbum({ album });
      }
   }

   render() {
      const { album, apiState } = this.props;
      const { albumData } = apiState.data;
      const tracks = albumData[album];

      return (
         <Container>
            <ButtonContainer>
               {tracks && tracks.map((item, index) => {
                  return (
                     <Button
                        key={item.name}
                        label={item.name}
                        onClick={() => this.playSong({ playlist: tracks, index })}
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
      playSong: ({ playlist, index }) => dispatch(playSong({ playlist, index })),
      fetchAlbum: ({ album }) => dispatch(fetchAlbum({album})),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
