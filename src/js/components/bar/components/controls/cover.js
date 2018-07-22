import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleFullscreen } from '../../actions';
import { constants } from '../../../../toolbox';

const { color, animation } = constants;
const { fadeOut } = animation;

const Container = styled.div`
   position: fixed;
   display: ${props => !props.isOpen && 'none'};
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: ${color.grayAlpha[4]};
   transition: all 0.3s ease;
   animation: ${props => props.isClosing && fadeOut} 0.3s ease;
`;

const mapStateToProps = state => {
   return {
      navState: state.navState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      toggleFullscreen: () => dispatch(toggleFullscreen()),
   };
};

class Cover extends Component {
   constructor(props) {
      super(props);
      const { navState } = props;
      const { isFullscreen } = navState;

      this.state = {
         isOpen: isFullscreen,
         isClosing: false,
      };
   }

   /*
   static getDerivedStateFromProps(nextProps) {
      console.log(nextProps.navState);
      return {
         isOpen: nextProps.navState.isFullscreen
      }
   }

   animateClosed() {
      this.setState({
         isClosing: true,
      });

      setTimeout(() => {
         this.setState({
            isOpen: false,
				isClosing: false
			});
      }, 350);
      }

   componentDidUpdate(nextProps) {
      if (!nextProps.navState.isFullscreen && this.state.isOpen) {
         this.animateClosed();
      }
      }
     */

   render() {
      const { isOpen, isClosing } = this.state;
      return <Container isOpen={isOpen || isClosing} isClosing={isClosing} />;
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
