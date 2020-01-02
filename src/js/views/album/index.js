import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong, addToQueue } from '../../audio/actions';
import { fetchAlbums, fetchAlbum, addToPlaylist } from '../../api/actions';
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
   position: relative;
   height: 300px;
   width: 300px;
   margin-right: 32px;

   ${breakpointSm} {
      height: 36vw;
      width: 36vw;
      display: block;
      margin-right: 8px;
      max-height: 100%;
   }
`;

const Artwork = styled.img`
   border: 1px solid ${color.gray[2]};
   box-sizing: border-box;
   border-radius: 6px;
   pointer-events: none;
   user-select: none;
   max-height: 100%;
`;

const Placeholder = styled.div`
   z-index: 1;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: url('images/default_artwork.svg');
   background-size: cover;
   transition: all 0.3s;
   opacity: ${props => (props.isHidden ? 0 : 1)};
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
      addToQueue: track => dispatch(addToQueue(track)),
      addToPlaylist: (track, playlist) =>
         dispatch(addToPlaylist(track, playlist)),
      fetchAlbums: () => dispatch(fetchAlbums()),
      fetchAlbum: ({ album }) => dispatch(fetchAlbum({ album })),
   };
};

class AlbumView extends Component {
   state = {
      isLoaded: false,
   };

   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   setupOptionsMenu = track => {
      this.props.pushPopup({
         name: 'Options',
         props: {
            options: [
               {
                  label: 'Play Next',
                  image: 'play_next.svg',
                  onClick: () => this.props.addToQueue(track),
               },
               {
                  label: 'Add to a Playlist',
                  image: 'add_to_playlist.svg',
                  onClick: () =>
                     this.props.pushPopup({
                        name: 'Playlist Selector',
                        props: {
                           onSelect: playlist =>
                              this.props.addToPlaylist(track, playlist),
                        },
                     }),
               },
            ],
         },
      });
   };

   onArtworkLoaded = () => {
      this.setState({ isLoaded: true });
   };

   componentDidMount() {
      const { album, apiState } = this.props;
      const { albums, albumData } = apiState.data;

      if (albums.length === 0) {
         this.props.fetchAlbums();
         this.props.fetchAlbum({ album });
      }

      if (!albumData[album] || !albumData[album].length) {
         this.props.fetchAlbum({ album });
      }
   }

   render() {
      const { album, apiState, audioState } = this.props;
      const { playlist, currentIndex } = audioState;
      const { albumData } = apiState.data;
      const { isLoaded } = this.state;
      const tracks = albumData[album];
      const artwork = tracks ? tracks[0] && tracks[0].artwork : null;
      const artist = tracks ? tracks[0] && tracks[0].artist : 'Loading';
      const currentTrack = playlist.length && playlist[currentIndex];
      const url = `https://tannerv.ddns.net/SpotiFree/${artwork}`;

      return (
         <Container>
            <MobileHeader>
               <ArtworkContainer>
                  <Placeholder isHidden={isLoaded} />
                  {artwork && <Artwork src={url} />}
               </ArtworkContainer>
               <TitleContainer>
                  <Title>{album}</Title>
                  <Subtitle>{artist}</Subtitle>
               </TitleContainer>
            </MobileHeader>
            <VisibleDesktop>
               <ArtworkContainer>
                  <Placeholder isHidden={isLoaded} />
                  {artwork && (
                     <Artwork src={url} onLoad={this.onArtworkLoaded} />
                  )}
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
                           onOptionsClick={() => this.setupOptionsMenu(item)}
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

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(AlbumView);
