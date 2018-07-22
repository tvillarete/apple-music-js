import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Controls from './components/controls';
import Cover from './components/controls/cover';

const OuterContainer = styled.div`
   z-index: 50;
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   height: 64px;
   display: flex;
   justify-content: flex-start;
   align-items: center;

   @media screen and (max-width: 750px) {
      height: 7em;
      flex-direction: column-reverse;
   }
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
      navState: state.navState,
   }
}

class BottomBar extends Component {
   render() {
      return (
         <OuterContainer>
            <Cover />
            <Controls />
         </OuterContainer>
      );
   }
}

export default connect(mapStateToProps)(BottomBar)
