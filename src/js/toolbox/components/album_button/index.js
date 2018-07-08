import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;

const Container = styled.div`
   margin: 0 16px 16px;
   width: 200px;
   cursor: pointer;
`;

const ImgContainer = styled.div`
`;
const Artwork = styled.img`
   max-width: 100%;
`;

const TextContainer = styled.div`
   margin: 4px 0;
`;

const Label = styled.h4`
   font-weight: normal;
   margin: 0;
`;

const SubLabel = styled.h4`
   color: ${color.gray[5]};
   font-weight: normal;
   margin: 0;
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
