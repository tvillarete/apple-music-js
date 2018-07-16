import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;

const Container = styled.div`
   display: flex;
   min-height: 64px;
   border-bottom: 1px solid ${color.gray[3]};
   padding: 0 16px;
   cursor: pointer;

   &:active {
      background: ${color.gray[2]};
   }
`;

const TextContainer = styled.div`
   display: flex;
   align-items: center;
`;

const Label = styled.h2`
   margin: 0;
   font-size: 1.3rem;
   color: ${color.red[4]};
   font-weight: normal;
`;

const OptionsButton = ({
   label,
   icon,
   onClick,
}) => {
   return (
      <Container onClick={onClick}>
         <TextContainer>
            <Label>{label}</Label>
         </TextContainer>
      </Container>
   );
};

export default OptionsButton;
