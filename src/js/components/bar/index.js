import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Controls from './components/controls';

const OuterContainer = styled.div`
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   height: 64px;
   background: blue;
   display: flex;
   justify-content: flex-start;
   align-items: center;
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
            <Controls />
         </OuterContainer>
      );
   }
}

export default connect(mapStateToProps)(BottomBar)
