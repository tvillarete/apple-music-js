import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: relative;
   display: flex;
   height: 48px;
   padding: 0 16px;
   background: ${props => props.color};
`;

const Section = styled.div`
   display: flex;
   flex: 1;
   align-items: center;

   &:nth-child(2) {
      justify-content: center;
   }

   &:last-child {
      justify-content: flex-end;
   }
`;

const Header = ({ left, center, right, color }) => {
   return (
      <Container color={color || 'white'}>
         <Section>{left}</Section>
         <Section>{center}</Section>
         <Section>{right}</Section>
      </Container>
   );
}

export default Header;
