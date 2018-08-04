import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { updateTime } from '../../../../audio/actions';
import { constants } from '../../../../toolbox';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const { color } = constants;

const Container = styled.div`
   position: relative;
   display: flex;
   flex-direction: column;
   width: 90%;
   margin: 3vh auto 1vh auto;
   height: 5vh;

   .rangeslider-horizontal.time-slider,
   .scrubber {
      height: 4px;
      width: 90%;
      margin: auto;
      box-shadow: none;

      .rangeslider__fill {
         background: ${props =>
            props.isChanging ? color.red[4] : color.gray[6]};
         box-shadow: none;
         transition: all 0.05s ease;
      }

      .rangeslider__handle {
         width: 7px;
         height: 7px;
         box-shadow: none;
         background: ${color.gray[6]};
         border: none;
         outline: none;

         &::active {
            height: 30px;
            width: 30px;
         }

         &::after {
            display: none;
         }
      }
   }

   .scrubber .rangeslider__handle {
      width: 8px;
      height: 8px;
      background: #757778;
      border: 2px solid transparent;
      transition: all 0.05s ease;

      ${props =>
         props.isChanging &&
         css`
            height: 30px;
            width: 30px;
            background: ${color.red[4]};
            border: 2px solid white;
         `};
   }
`;

const TimeContainer = styled.div`
   display: flex;
   justify-content: space-between;
   width: 90%;
   margin: auto;
`;

const Time = styled.h5`
   font-weight: normal;
   margin: 8px 0;
   color: ${props => (props.isChanging ? color.red[4] : color.gray[6])};
   transform: ${props => props.shift && 'translateY(10px)'};
   transition: all 0.15s ease;
`;

export function formatTime(seconds = 0, guide = seconds) {
   let s = Math.floor(seconds % 60);
   let m = Math.floor((seconds / 60) % 60);
   let h = Math.floor(seconds / 3600);
   const gm = Math.floor((guide / 60) % 60);
   const gh = Math.floor(guide / 3600);

   if (isNaN(seconds) || seconds === Infinity) {
      h = m = s = '-';
   }

   h = h > 0 || gh > 0 ? `${h}:` : '';
   m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`;
   s = s < 10 ? `0${s}` : s;

   return h + m + s;
}

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      updateTime: info => dispatch(updateTime(info)),
   };
};

class Scrubber extends Component {
   state = {
      isChanging: false,
      time: {
         current: 0,
         max: 0,
      },
   };

   startChange = () => {
      const { audioState } = this.props;
      const { time } = audioState;

      this.setState({
         isChanging: true,
         time: {
            current: time.current || 0,
            max: time.max || 0,
         },
      });
   };

   handleChange = val => {
      this.setState({
         time: {
            ...this.state.time,
            current: val,
         },
      });
   };

   endChange = val => {
      this.setState({
         transitioning: true,
         isChanging: false,
      });
      const audio = document.getElementById('audio');
      if (audio) {
         audio.currentTime = this.state.time.current;
      }
      setTimeout(() => {
         this.setState({
            transitioning: false,
         });
         this.props.updateTime(this.state.time);
      }, 1000);
   };

   componentDidUpdate() {}

   render() {
      const { audioState } = this.props;
      const { isChanging, transitioning } = this.state;
      const propTime = audioState.time;
      const stateTime = this.state.time;
      const time = isChanging || transitioning ? stateTime : propTime;
      const range = Math.round(time.current / time.max * 100);

      return (
         <Container isChanging={isChanging}>
            <Slider
               className="scrubber"
               tooltip={false}
               value={time.current || 0}
               max={time.max || 1}
               onChange={this.handleChange}
               onChangeStart={this.startChange}
               onChangeComplete={this.endChange}
            />
            <TimeContainer>
               <Time isChanging={isChanging} shift={isChanging && range <= 8}>
                  {formatTime(time.current)}
               </Time>
               <Time shift={isChanging && range >= 90}>
                  -{formatTime((time.max) - (time.current))}
               </Time>
            </TimeContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scrubber);
