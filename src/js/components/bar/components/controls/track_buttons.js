import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { resume, pause, nextSong, prevSong } from '../../../../audio/actions';

const Container = styled.div`
   display: flex;
   justify-content: space-around;
   align-items: center;
   min-height: 14vh;
   margin-top: 16px;
`;

const Svg = styled.img`
   height: 32px;
   width: 32px;
   margin: 0 8px;
   cursor: pointer;
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
      navState: state.navState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      resume: () => dispatch(resume()),
      pause: () => dispatch(pause()),
      nextSong: () => dispatch(nextSong()),
      prevSong: () => dispatch(prevSong()),
   };
};

class TrackButtons extends Component {
   resume = () => {
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.resume();
      }
   }

   pause = () => {
      const { audioState } = this.props;
      const { hasAudio, isPlaying } = audioState;

      if (hasAudio && isPlaying) {
         this.props.pause();
      }
   }

   nextSong = () => {
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.nextSong();
      }
   };

   prevSong = () => {
      const { audioState } = this.props;
      const { hasAudio } = audioState;

      if (hasAudio) {
         this.props.prevSong();
      }
   };

   render() {
      const { audioState } = this.props;
      const { hasAudio, isPlaying } = audioState;
      const path = `images`;

      return (
         <Container>
            <Svg src={`${path}/skip_back.svg`} onClick={this.prevSong} />
            {!(!!hasAudio && !!isPlaying) && (
               <Svg src={`${path}/play.svg`} onClick={this.resume} />
            )}
            {!!isPlaying && (
               <Svg src={`${path}/pause.svg`} onClick={this.pause} />
            )}
            <Svg src={`${path}/skip_next.svg`} onClick={this.nextSong} />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackButtons);
