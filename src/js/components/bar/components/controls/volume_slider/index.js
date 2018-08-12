import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { changeVolume } from '../../../../../audio/actions';
import { constants } from '../../../../../toolbox';

const { color } = constants;

const Container = styled.div`
   height: 48px;
   width: 90%;
   margin: auto;
   display: flex;

   .rangeslider-horizontal.time-slider,
   .volume-slider {
      height: 4px;
      width: 90%;
      margin: auto;
      box-shadow: none;

      .rangeslider__fill {
         background: ${color.gray[6]};
         box-shadow: none;
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

   .volume-slider .rangeslider__handle {
      width: 30px;
      height: 30px;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.12);
      box-shadow: 0 3px 3px rgb(150, 150, 150);
   }
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      changeVolume: volume => dispatch(changeVolume(volume)),
   };
};

class VolumeSlider extends Component {
   handleChange = val => {
      this.props.changeVolume(val / 100);
   };

   render() {
      const { audioState } = this.props;
      const { volume } = audioState;

      return (
         <Container>
            <Slider
               className="volume-slider"
               tooltip={false}
               value={volume * 100}
               onChange={this.handleChange}
            />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeSlider);
