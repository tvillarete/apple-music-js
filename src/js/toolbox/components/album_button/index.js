import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;
const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
   margin: 0 16px 16px;
   width: 185px;
   cursor: pointer;

   ${breakpointSm} {
      margin: 16px 16px 0 0;
      width: auto;
      flex: 0 44%;
   }

   &:active {
      img {
         filter: brightness(65%);
      }
   }
`;

const ImgContainer = styled.div`
`;

const Artwork = styled.img`
   border-radius: 4px;
   max-width: 100%;
   pointer-events: none;
   user-select: none;
`;

const TextContainer = styled.div`
   margin: 4px 0;
`;

const Label = styled.h4`
   font-weight: normal;
   margin: 0;
   user-select: none;
`;

const SubLabel = styled.h4`
   color: ${color.gray[5]};
   font-weight: normal;
   margin: 0;
   user-select: none;
`;

const AlbumButton = ({
   label,
   sublabel,
   artwork,
   OptionsMenu,
   onClick,
}) => {
   return (
      <Container onClick={onClick}>
         <ImgContainer>
            <Artwork src={artwork} />
         </ImgContainer>
         <TextContainer>
            <Label>{label}</Label>
            <SubLabel>{sublabel}</SubLabel>
         </TextContainer>
      </Container>
   );
};

export default AlbumButton;
