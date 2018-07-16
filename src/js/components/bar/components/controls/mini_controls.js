import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { constants, Icon } from '../../../../toolbox';
import { toggleFullscreen } from '../../actions';
import { resume, pause, nextSong } from '../../../../audio/actions';

const { color } = constants;

const Container = styled.div`
   position: relative;
   height: ${props => (props.isFullscreen ? '30vh' : '64px')};
   width: 100%;
   text-align: center;
   border-left: ${props => props.isFullscreen || '1px solid' + color.gray[2]};
   box-sizing: border-box;
   cursor: ${props => props.isFullscreen || 'pointer'};
   background: ${props => props.isFullscreen && '#fff'};
   transition: all 0.35s ease;
`;

const ArtworkContainer = styled.div`
   position: relative;
   height: ${props => (props.isFullscreen ? '40vh' : '64px')};
   max-height: 100%;
   width: ${props => (props.isFullscreen ? '100%' : '64px')};
   padding: 8px 0;
   text-align: center;
   transition: all 0.35s ease;
`;

const Artwork = styled.img`
   height: ${props => (props.isFullscreen ? '18em' : '50px')};
   width: auto;
   max-height: ${props => (props.isFullscreen ? '80%' : '100%')};
   max-width: 100%;
   margin-top: ${props => props.isPlaying && '8px'};
   transform: ${props => props.isPlaying && 'scale(1.2)'};
   pointer-events: none;
   user-select: none;
   border-radius: ${props => props.isFullscreen && '4px'};
   transition: all 0.35s ease;
   box-shadow: ${props => props.isPlaying && '0 10px 30px #a5a5a5'};
`;

const InfoContainer = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 64px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-left: 80px;
   opacity: ${props => props.isFullscreen && 0};
   pointer-events: ${props => props.isFullscreen && 'none'};
   transition: all 0.35s ease;
`;

const SongTitle = styled.h3`
   margin: 0;
   font-weight: normal;
   color: #646464;
   font-size: 13px;
`;

const ButtonContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
   padding-right: 16px;

   svg {
      height: 32px;
      width: 32px;
   }
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
      navState: state.navState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      toggleFullscreen: () => dispatch(toggleFullscreen()),
      resume: () => dispatch(resume()),
      pause: () => dispatch(pause()),
      nextSong: () => dispatch(nextSong()),
   };
};

class MiniControls extends Component {
   resume = e => {
      e.stopPropagation();
      const { audioState } = this.props;
      const { hasAudio, isPlaying } = audioState;

      if (hasAudio && !isPlaying) {
         this.props.resume();
      }
   };

   pause = e => {
      e.stopPropagation();
      const { audioState } = this.props;
      const { hasAudio, isPlaying } = audioState;

      if (hasAudio && isPlaying) {
         this.props.pause();
      }
   };

   nextSong = e => {
      e.stopPropagation();
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.nextSong();
      }
   };

   componentDidMount() {
      document.body.onkeypress = e => {
         const { audioState } = this.props;
         const { hasAudio, isPlaying } = audioState;

         if (e.keyCode === 32) {
            if (hasAudio && isPlaying) {
               e.preventDefault();
               this.pause(e);
            } else if (hasAudio && !isPlaying) {
               e.preventDefault();
               this.resume(e);
            }
         }
      };
   }

   render() {
      const { navState, audioState } = this.props;
      const { isFullscreen } = navState;
      const { hasAudio, isPlaying, playlist, currentIndex } = audioState;
      const track = hasAudio && currentIndex < playlist.length
         ? playlist[currentIndex]
         : {
              name: ' Music.js',
              artist: 'Tanner Villarete',
              album: 'My App',
              artwork: 'hi.com',
              track: '1',
           };
      const artwork = hasAudio && currentIndex < playlist.length
         ? `http://tannerv.ddns.net:12345/SpotiFree/${track.artwork}`
         : `https://lastfm-img2.akamaized.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb`;

      return (
         <Container
            isFullscreen={isFullscreen}
            onClick={() => !isFullscreen && this.props.toggleFullscreen()}>
            <ArtworkContainer isFullscreen={isFullscreen}>
               <Artwork
                  isFullscreen={isFullscreen}
                  isPlaying={isPlaying && isFullscreen}
                  src={artwork}
               />
            </ArtworkContainer>
            <InfoContainer isFullscreen={isFullscreen}>
               <SongTitle>{track.name}</SongTitle>
               <ButtonContainer>
                  {!(hasAudio && isPlaying) && (
                     <Icon name="play" onClick={this.resume} />
                  )}
                  {isPlaying && <Icon name="pause" onClick={this.pause} />}
                  <Icon name="skip-forward" onClick={this.nextSong} />
               </ButtonContainer>
            </InfoContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniControls);
