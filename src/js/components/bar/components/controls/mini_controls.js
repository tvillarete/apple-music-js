import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { constants } from '../../../../toolbox';
import { toggleFullscreen } from '../../actions';
import { resume, pause, nextSong } from '../../../../audio/actions';

const { color } = constants;

const Container = styled.div`
   position: relative;
   height: 64px;
   width: 100%;
   text-align: center;
   border-left: 1px solid ${color.gray[2]};
   border-top: 1px solid #E9E9E9;
   border-bottom: 1px solid #E9E9E9;
   background: #F9F9F9;
   box-sizing: border-box;
   transition: all 0.35s ease;
   cursor: pointer;

   ${props =>
      props.isFullscreen &&
      css`
         height: 40vh;
         border-left: 1px solid transparent;
         border-top: none;
         border-bottom: none;
         width: 100%;
         cursor: default;
         background: #fff;
      `};
`;

const ArtworkContainer = styled.div`
   position: relative;
   height: 64px;
   max-height: 100%;
   width: 64px;
   padding: 8px 0;
   text-align: center;
   transition: all 0.35s ease;

   ${props =>
      props.isFullscreen &&
      css`
         height: 46vh;
         min-height: 8em;
         width: 100%;
      `};
`;

const Artwork = styled.img`
   height: ${props => (props.isFullscreen ? '18em' : '50px')};
   width: auto;
   max-height: ${props => (props.isFullscreen ? '90%' : '100%')};
   max-width: 100%;
   margin-top: ${props => props.isPlaying && '8px'};
   transform: ${props => props.isPlaying && 'scale(1.1)'};
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
`;

const Svg = styled.img`
   height: 24px;
   width: 24px;
   margin: 0 8px;
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

   render() {
      const { navState, audioState } = this.props;
      const { isFullscreen } = navState;
      const {
         queue,
         inQueue,
         hasAudio,
         isPlaying,
         playlist,
         currentIndex,
      } = audioState;
      const path = 'images';
      const track =
         queue.length && inQueue
            ? queue[0]
            : hasAudio && currentIndex < playlist.length
               ? playlist[currentIndex]
               : {
                    name: ' Music.js',
                    artist: 'Tanner Villarete',
                    album: 'My App',
                    artwork: 'hi.com',
                    track: '1',
                 };
      const artwork = hasAudio
         ? `https://tannerv.ddns.net/SpotiFree/${track.artwork}`
         : `images/default_artwork.svg`;

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
               <ButtonContainer size={32}>
                  {!(hasAudio && isPlaying) && (
                     <Svg src={`${path}/play.svg`} onClick={this.resume} />
                  )}
                  {isPlaying && (
                     <Svg src={`${path}/pause.svg`} onClick={this.pause} />
                  )}
                  <Svg src={`${path}/skip_next.svg`} onClick={this.nextSong} />
               </ButtonContainer>
            </InfoContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniControls);
