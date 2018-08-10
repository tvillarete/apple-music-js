import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;

const Container = styled.div`
   display: flex;
   justify-content: ${props => props.center && 'center'};
   justify-content: ${props => props.hasImage && 'space-between'};
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

const Icon = styled.img`
   height: 30px;
   width: 40px;
   margin: auto 0;
`;

const Label = styled.h2`
   margin: 0;
   font-size: 1.3rem;
   color: ${color.red[4]};
   font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

const OptionsButton = ({ label, icon, image, center, bold, onClick }) => {
   return (
      <Container hasImage={image} center={center} onClick={onClick}>
         <TextContainer>
            <Label bold={bold}>{label}</Label>
         </TextContainer>
         {image && <Icon src={`images/${image}`} />}
      </Container>
   );
};

export default OptionsButton;
