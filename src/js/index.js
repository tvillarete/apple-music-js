import React, { Component } from 'react';
import styled from 'styled-components';
import ViewContainer from './views';
import Header from './components/header';
import BottomBar from './components/bar';

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   flex-direction: column;
`;

export default class SpotiFree extends Component {
   render() {
      return (
         <Container>
            <Header />
            <ViewContainer />
            <BottomBar />
         </Container>
      );
   }
}
