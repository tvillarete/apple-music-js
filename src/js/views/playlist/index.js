import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong, addToQueue } from '../../audio/actions';
import {
   fetchPlaylists,
   addToPlaylist,
   removeFromPlaylist,
} from '../../api/actions';
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
      addToPlaylist: (track, playlist) =>
         dispatch(addToPlaylist(track, playlist)),
      addToQueue: track => dispatch(addToQueue(track)),
      pushPopup: popup => dispatch(pushPopup(popup)),
      removeFromPlaylist: (track, index) =>
         dispatch(removeFromPlaylist(track, index)),
      fetchPlaylists: () => dispatch(fetchPlaylists()),
   };
};

class PlaylistView extends Component {
   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   setupOptionsMenu = (track, index) => {
      const { playlist } = this.props;

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
                  label: 'Add to Playlist',
                  image: 'play_next.svg',
                  onClick: () =>
                     this.props.pushPopup({
                        name: 'Playlist Selector',
                        props: {
                           onSelect: playlist =>
                              this.props.addToPlaylist(track, playlist),
                        },
                     }),
               }, {
                  label: 'Delete from Playlist',
                  image: 'trash.svg',
                  onClick: () =>
                     this.props.removeFromPlaylist(index, playlist),
               },
            ],
         },
      });
   };

   componentDidMount() {
      this.props.fetchPlaylists();
   }

   render() {
      const { playlist, apiState } = this.props;
      const { playlists, currentTrack } = apiState.data;
      const { tracks, img, description, title } = playlists[playlist.title];

      return (
         <Container>
            <MobileHeader>
               <ArtworkContainer>
                  <Artwork src={img} />
               </ArtworkContainer>
               <TitleContainer>
                  <Title>{title}</Title>
                  <Subtitle>{description}</Subtitle>
               </TitleContainer>
            </MobileHeader>
            <VisibleDesktop>
               <ArtworkContainer>
                  <Artwork src={img} />
               </ArtworkContainer>
            </VisibleDesktop>
            <ButtonContainer>
               <VisibleDesktop>
                  <Title>{title}</Title>
                  <Subtitle>{description}</Subtitle>
               </VisibleDesktop>
               {tracks &&
                  tracks.map((item, index) => {
                     return (
                        <Button
                           key={`playlist-${item.name}-${index}`}
                           label={item.name}
                           sublabel={item.artist}
                           isPlaying={
                              currentTrack &&
                              item.name === currentTrack.name &&
                              item.artist === currentTrack.artist
                           }
                           OptionsMenu={true}
                           onOptionsClick={() =>
                              this.setupOptionsMenu(item, index)
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);
