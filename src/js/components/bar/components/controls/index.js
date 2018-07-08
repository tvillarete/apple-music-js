import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MiniControls from './mini_controls';
import { toggleFullscreen } from '../../actions';
import { nextSong } from '../../../../audio/actions';

const Container = styled.div`
   position: fixed;
   display: flex;
   flex-direction: column;
   bottom: 0;
   right: 0;
   height: ${props => (props.isFullscreen ? '100%' : '64px')};
   width: 100%;
   max-width: 400px;
   background: ${props => props.isFullscreen && '#fff'};
   transition: all 0.35s ease;
   backdrop-filter: ${props => props.isFullscreen || 'blur(30px)'};
`;

const CloseControls = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: ${props => props.hidden ? '0' : '48px'};
   opacity: ${props => props.hidden && '0'};
   pointer-events: ${props => props.hidden && 'none'};
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
      navState: state.navState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      nextSong: () => dispatch(nextSong()),
      toggleFullscreen: () => dispatch(toggleFullscreen()),
   };
};

class Controls extends Component {
   componentDidUpdate() {
      const { audioState } = this.props;
      const { isPlaying } = audioState;

      if (isPlaying && this.audioElement) {
         this.playAudio();
      } else if (!isPlaying && this.audioElement && this.audioElement.src) {
         this.pauseAudio();
      }
   }

   playAudio() {
      this.playPromise = this.audioElement.play();
      this.playPromise.then(() => {
         // TODO: Do something here
      });
   }

   pauseAudio() {
      this.audioElement.pause();
   }

   nextSong = () => {
      this.props.nextSong();
   };

   render() {
      const { navState, audioState } = this.props;
      const { isFullscreen } = navState;
      const { playlist, currentIndex } = audioState;
      const track = !!playlist.length ? playlist[currentIndex] : null;

      return (
         <Container isFullscreen={isFullscreen}>
            <CloseControls
               hidden={!isFullscreen}
               onClick={this.props.toggleFullscreen}>
            </CloseControls>
            <MiniControls />
            {track && (
               <audio
                  ref={audio => {
                     this.audioElement = audio;
                  }}
                  id="audio"
                  onEnded={this.nextSong}
                  src={`http://tannerv.ddns.net:12345/SpotiFree/${track.url}`}
               />
            )}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
