import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong } from '../../audio/actions';
import { fetchAlbum } from '../../api/actions';
import { pushView } from '../actions';
import { Button, constants } from '../../toolbox';

const { color } = constants;

const Container = styled.div`
   display: flex;
`;

const ArtworkContainer = styled.div`
   margin-right: 32px;
`;

const Artwork = styled.img`
   border: 1px solid ${color.gray[2]};
   border-radius: 6px;
   pointer-events: none;
   user-select: none;
`;

const ButtonContainer = styled.div`
   flex: 1;
`;

const Title = styled.h1`
   margin: 0 0 8px;
`;

const Subtitle = styled.h2`
   color: ${color.red[4]};
   font-weight: normal;
   margin: 0 0 16px 0;
`;

class AlbumView extends Component {
   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   componentDidMount() {
      const { album, apiState } = this.props;
      const { albumData } = apiState.data;

      if (!albumData[album].length) {
         this.props.fetchAlbum({ album });
      }
   }

   render() {
      const { album, apiState, audioState } = this.props;
      const { playlist, currentIndex } = audioState;
      const { albumData } = apiState.data;
      const tracks = albumData[album];
      const artwork = tracks[0] && tracks[0].artwork;
      const artist = tracks[0] && tracks[0].artist;
      const currentTrack = playlist.length && playlist[currentIndex];
      const url = artwork
         ? `http://tannerv.ddns.net:12345/SpotiFree/${artwork}`
         : `https://lastfm-img2.akamaized.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb`;

      return (
         <Container>
            <ArtworkContainer>
               <Artwork src={url} />
            </ArtworkContainer>
            <ButtonContainer>
               <Title>{album}</Title>
               <Subtitle>{artist}</Subtitle>
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
)(AlbumView);
