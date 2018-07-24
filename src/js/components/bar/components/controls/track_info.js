import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { constants } from '../../../../toolbox';
import { resume, pause, nextSong } from '../../../../audio/actions';

const { color } = constants;

const Container = styled.div`
   margin-top: 16px;
`;

const Title = styled.h3`
   text-align: center;
   margin: 0;
`;

const Subtitle = styled.h3`
   color: ${color.red[4]};
   font-weight: normal;
   text-align: center;
   margin: 8px 0 0 0;
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
   };
};

class TrackInfo extends Component {
   render() {
      const { audioState } = this.props;
      const { queue, inQueue, hasAudio, playlist, currentIndex } = audioState;
      const track =
         queue.length && inQueue
            ? queue[0]
            : hasAudio
               ? playlist[currentIndex]
               : {
                    name: 'Apple Music.js',
                    artist: 'Tanner Villarete',
                    album: 'Cal Poly',
                 };

      return (
         <Container>
            <Title>{track.name}</Title>
            <Subtitle>{`${track.artist} — ${track.album}`}</Subtitle>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfo);
