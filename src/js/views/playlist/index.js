import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { playSong, addToQueue } from '../../audio/actions';
import {
   fetchPlaylists,
   addToPlaylist,
   removeFromPlaylist,
   deletePlaylist,
} from '../../api/actions';
import { pushView, popView, pushPopup } from '../actions';
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
   margin-top: 16px;
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
   flex: 1;
   margin-bottom: 16px;
`;

const Title = styled.h1`
   margin: 0 0 8px;

   ${breakpointSm} {
      font-size: 1.5rem;
   }
`;

const Subtitle = styled.h2`
   color: ${color.red[4]};
   font-weight: normal;
   margin: 0 0 16px 0;

   ${breakpointSm} {
      font-size: 1.25rem;
   }
`;

const ActionContainer = styled.div`
   flex: 1;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-end;
   padding: 0 9px;

   svg, img {
      cursor: pointer;
   }
`;

const Svg = styled.img`
   height: ${props => props.size || 30}px;
   width: ${props => props.size || 30}px;
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
      popView: () => dispatch(popView()),
      playSong: ({ playlist, index }) =>
         dispatch(playSong({ playlist, index })),
      addToPlaylist: (track, playlist) =>
         dispatch(addToPlaylist(track, playlist)),
      addToQueue: track => dispatch(addToQueue(track)),
      pushPopup: popup => dispatch(pushPopup(popup)),
      removeFromPlaylist: (track, index) =>
         dispatch(removeFromPlaylist(track, index)),
      deletePlaylist: playlist => dispatch(deletePlaylist(playlist)),
      fetchPlaylists: () => dispatch(fetchPlaylists()),
   };
};

class PlaylistView extends Component {
   constructor(props) {
      super(props);

      this.state = {
         playlists: props.apiState.data.playlists,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      const { playlists } = nextProps.apiState.data;

      return {
         playlists,
      };
   }

   playSong = ({ playlist, index }) => {
      this.props.playSong({ playlist, index });
   };

   deletePlaylist = () => {
      const { playlist } = this.props;

      this.props.popView();
      setTimeout(() => {
         this.props.deletePlaylist(playlist);
      }, 300);
   };

   setupTrackOptionsMenu = (track, index) => {
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
               {
                  label: 'Delete from Playlist',
                  image: 'trash.svg',
                  onClick: () => this.props.removeFromPlaylist(index, playlist),
               },
            ],
         },
      });
   };

   setupPlaylistOptionsMenu = () => {
      this.props.pushPopup({
         name: 'Options',
         props: {
            options: [
               {
                  label: 'Delete from Library',
                  image: 'trash.svg',
                  onClick: this.deletePlaylist,
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
      const playlists = JSON.parse(localStorage.appleMusicPlaylists);
      if (!playlists) {
         return null;
      }
      let { tracks, img, description, title } = playlists[playlist.title];
      const { currentTrack } = apiState.data;
      img = img || 'images/music.jpg';

      return (
         <Container>
            <MobileHeader>
               <ArtworkContainer>
                  <Artwork src={img} />
               </ArtworkContainer>
               <TitleContainer>
                  <Title>{title}</Title>
                  <Subtitle>{description}</Subtitle>
                  <ActionContainer>
                     <Svg
                        src="images/more_circle.svg"
                        onClick={this.setupPlaylistOptionsMenu}
                     />
                  </ActionContainer>
               </TitleContainer>
            </MobileHeader>
            <VisibleDesktop>
               <ArtworkContainer>
                  <Artwork src={img} />
               </ArtworkContainer>
            </VisibleDesktop>
            <ButtonContainer>
               <VisibleDesktop>
                  <TitleContainer>
                  <Title>{title}</Title>
                  <Subtitle>{description}</Subtitle>
                  <ActionContainer>
                     <Svg
                        src="images/more_circle.svg"
                        onClick={this.setupPlaylistOptionsMenu}
                     />
                     </ActionContainer>
                     </TitleContainer>
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
                              this.setupTrackOptionsMenu(item, index)
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
