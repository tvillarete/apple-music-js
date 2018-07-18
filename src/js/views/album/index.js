import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong } from '../../audio/actions';
import { fetchAlbum } from '../../api/actions';
import { pushView, pushPopup } from '../actions';
import { Button, constants } from '../../toolbox';

const { color } = constants;
const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
   display: flex;

   ${breakpointSm} {
      display: block;
   }
`;

const ArtworkContainer = styled.div`
   margin-right: 32px;

   ${breakpointSm} {
      display: block;
      margin-right: 8px;
      height: 100%;
   }
`;

const Artwork = styled.img`
   border: 1px solid ${color.gray[2]};
   border-radius: 6px;
   pointer-events: none;
   user-select: none;
   max-height: 100%;
`;

const ButtonContainer = styled.div`
   flex: 1;
`;

const MobileHeader = styled.div`
   position: relative;
   display: flex;
   height: 20vh;
   margin-bottom: 16px;

   @media screen and (min-width: 750px) {
      display: none;
   }
`;

const TitleContainer = styled.div`
   display: flex;
   flex-direction: column;
`;

const Title = styled.h1`
   margin: 0 0 8px;

   ${breakpointSm} {
      font-size: 3.5vh;
   }
`;

const Subtitle = styled.h2`
   color: ${color.red[4]};
   font-weight: normal;
   margin: 0 0 16px 0;

   ${breakpointSm} {
      font-size: 3vh;
   }
`;

const VisibleDesktop = styled.div`
   @media screen and (max-width: 750px) {
      display: none;
   }
`;

class AlbumView extends Component {
   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   setupOptionsMenu = () => {
      this.props.pushPopup({
         name: "Options",
         props: {}
      });
   }

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
            <MobileHeader>
               <ArtworkContainer>
                  <Artwork src={url} />
               </ArtworkContainer>
               <TitleContainer>
                  <Title>{album}</Title>
                  <Subtitle>{artist}</Subtitle>
               </TitleContainer>
            </MobileHeader>
            <VisibleDesktop>
               <ArtworkContainer>
                  <Artwork src={url} />
               </ArtworkContainer>
            </VisibleDesktop>
            <ButtonContainer>
               <VisibleDesktop>
                  <Title>{album}</Title>
                  <Subtitle>{artist}</Subtitle>
               </VisibleDesktop>
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
                           OptionsMenu={true}
                           onOptionsClick={this.setupOptionsMenu}
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
      pushPopup: popup => dispatch(pushPopup(popup)),
      playSong: ({ playlist, index }) =>
         dispatch(playSong({ playlist, index })),
      fetchAlbum: ({ album }) => dispatch(fetchAlbum({ album })),
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(AlbumView);
