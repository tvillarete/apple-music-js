import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleFullscreen } from '../../actions';
import { constants } from '../../../../toolbox';

const { color, animation } = constants;
const { fadeIn, fadeOut } = animation;

const Container = styled.div`
   position: fixed;
   display: ${props => !props.isOpen && 'none'};
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: ${color.grayAlpha[4]};
   cursor: pointer;
   animation: ${props => (props.isClosing ? fadeOut : fadeIn)} 0.35s ease;
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

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         isOpen: nextProps.navState.isFullscreen,
         isClosing: !nextProps.navState.isFullscreen && prevState.isOpen,
      };
   }

   animateClosed() {
      setTimeout(() => {
         this.setState({
            isOpen: false,
            isClosing: false,
         });
      }, 330);
   }

   componentDidUpdate(nextProps) {
      if (this.state.isClosing) {
         this.animateClosed();
      }
   }

   render() {
      const { isOpen, isClosing } = this.state;
      return (
         <Container
            isOpen={isOpen || isClosing}
            isClosing={isClosing}
            onClick={this.props.toggleFullscreen}
         />
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
