import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MiniControls from './mini_controls';
import { toggleFullscreen } from '../../actions';
import { nextSong, pause, updateTime } from '../../../../audio/actions';
import TrackInfo from './track_info';
import TrackButtons from './track_buttons';
import VolumeSlider from './volume_slider';
import Scrubber from './scrubber';

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
   height: ${props => (props.hidden ? '0' : '48px')};
   opacity: ${props => props.hidden && '0'};
   pointer-events: ${props => props.hidden && 'none'};
   transition: all 0.35s ease;
   cursor: pointer;
`;

const FullscreenControls = styled.div`
   opacity: ${props => props.hide && 0};
   transition: all 0.35s ease;
   margin-top: 5vh;
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
      updateTime: info => dispatch(updateTime(info)),
   };
};

class Controls extends Component {
   constructor(props) {
      super(props);
      this.state = {
         volume: props.audioState.volume,
         duration: null,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         volume: nextProps.volume,
      };
   }

   handlePlay = () => {
      if (this.audio.paused) {
         clearInterval(this.playInterval);
         const playPromise = this.audio.play();
         playPromise.then(() => {
            this.createTimeInterval();
         });
      }
   };

   handleSliderChange = e => {
      clearInterval(this.playInterval);
      this.audio.currentTime = e.target.value;
      this.createTimeInterval();
   };

   createTimeInterval() {
      this.playInterval = setInterval(() => {
         if (this.audio) {
            this.props.updateTime({
               current: this.audio.currentTime,
               max: this.audio.duration,
            });
         }
      }, 1000);
   }

   handlePause() {
      if (!this.audio.paused) {
         this.audio.pause();
         clearInterval(this.playInterval);
      }
   }

   nextSong = () => {
      this.props.nextSong();
   };

   changeVolume = val => {
      console.log(val);
   };

   componentDidUpdate(nextProps) {
      const { audioState, volume } = this.props;
      const { isPlaying } = audioState;

      if (this.audio && this.audio.volume !== volume) {
         this.audio.volume = nextProps.audioState.volume;
      }

      if (isPlaying && this.audio) {
         this.handlePlay();
      } else if (!isPlaying && this.audio && this.audio.src) {
         this.handlePause();
      }
   }

   render() {
      const { navState, audioState } = this.props;
      const { isFullscreen } = navState;
      const { queue, inQueue, playlist, currentIndex, volume } = audioState;
      const track =
         queue.length && inQueue
            ? queue[0]
            : !!playlist.length
               ? playlist[currentIndex]
               : null;

      return (
         <Container isFullscreen={isFullscreen}>
            <CloseControls
               hidden={!isFullscreen}
               onClick={this.props.toggleFullscreen}>
               <Svg src="images/chevron_wide.svg" />
            </CloseControls>
            <MiniControls />
            <FullscreenControls hide={!isFullscreen}>
               <Scrubber />
               <TrackInfo />
               <TrackButtons />
               <VolumeSlider />
            </FullscreenControls>
            {track && (
               <audio
                  ref={audio => {
                     this.audio = audio;
                  }}
                  volume={volume}
                  id="audio"
                  onEnded={this.nextSong}
                  src={`https://tannerv.ddns.net/SpotiFree/${track.url}`}
               />
            )}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
