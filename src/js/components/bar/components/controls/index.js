import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MiniControls from './mini_controls';
import { toggleFullscreen } from '../../actions';
import { nextSong, pause } from '../../../../audio/actions';
import TrackInfo from './track_info';
import TrackButtons from './track_buttons';
import VolumeSlider from './volume_slider';

const Container = styled.div`
   position: fixed;
   bottom: 0;
   right: 0;
   height: ${props => (props.isFullscreen ? '100%' : '64px')};
   width: 100%;
   max-width: 400px;
   background: #fff;
   transition: all 0.35s ease;

   @media screen and (max-width: 750px) {
      z-index: 0;
      max-width: none;
   }
`;

const Svg = styled.img``;

const CloseControls = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: ${props => props.hidden ? '0' : '48px'};
   opacity: ${props => props.hidden && '0'};
   pointer-events: ${props => props.hidden && 'none'};
   transition: all 0.35s ease;
   cursor: pointer;
`;

const FullscreenControls = styled.div`
   opacity: ${props => props.hide && 0};
   transition: all 0.35s ease;
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
      pause: () => dispatch(pause()),
   };
};

class Controls extends Component {
   constructor(props) {
      super(props);
      this.state = {
         volume: props.audioState.volume
      }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         volume: nextProps.volume
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

   changeVolume = (val) => {
      console.log(val);
   }

   componentDidUpdate(nextProps) {
      const { audioState, volume } = this.props;
      const { isPlaying } = audioState;

      if (this.audioElement && this.audioElement.volume !== volume) {
         this.audioElement.volume = nextProps.audioState.volume;
      }

      if (isPlaying && this.audioElement) {
         this.playAudio();
      } else if (!isPlaying && this.audioElement && this.audioElement.src) {
         this.pauseAudio();
      }
   }

   render() {
      const { navState, audioState } = this.props;
      const { isFullscreen } = navState;
      const { playlist, currentIndex, volume } = audioState;
      const track = !!playlist.length ? playlist[currentIndex] : null;

      return (
         <Container isFullscreen={isFullscreen}>
            <CloseControls
               hidden={!isFullscreen}
               onClick={this.props.toggleFullscreen}>
               <Svg src="images/chevron_wide.svg" />
            </CloseControls>
            <MiniControls />
            <FullscreenControls hide={!isFullscreen}>
               <TrackInfo />
               <TrackButtons />
               <VolumeSlider />
            </FullscreenControls>
            {track && (
               <audio
                  ref={audio => {
                     this.audioElement = audio;
                  }}
                  volume={volume}
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
