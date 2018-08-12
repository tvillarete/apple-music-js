import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   height: 112px;
   cursor: pointer;

   &:active {
      background: ${color.gray[2]};
   }
`;

const ImgContainer = styled.div`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 104px;
   width: 104px;
   border-radius: 4px;
   overflow: hidden;
`;

const Artwork = styled.img`
   height: 100%;
   width: 100%;
   pointer-events: none;
   user-select: none;
`;

const TextContainer = styled.div`
   display: flex;
   align-items: center;
   flex: 1;
   margin: 8px 0 4px 16px;
   border-bottom: 1px solid ${color.gray[2]};
`;

const Title = styled.h3`
   font-weight: normal;
   margin: 0;
   user-select: none;
   color: ${props => props.color ? color[props.color][4] : 'black'};
`;

const ChevronContainer = styled.div`
   height: 100%;
   width: 3em;
   display: flex;
   justify-content: center;
   align-items: center;

   svg {
      color: ${color.gray[4]};
      height: 20px;
      width: 20px;
   }
`;

const PlaylistButton = ({
   title,
   img,
   color,
   chevron,
   onClick,
}) => {
   return (
      <Container onClick={onClick}>
         <ImgContainer>
            <Artwork src={img} />
         </ImgContainer>
         <TextContainer>
            <Title color={color}>{title}</Title>
            </TextContainer>
         {chevron && (
            <ChevronContainer>
               <Icon name="chevron-right" />
            </ChevronContainer>
         )}
      </Container>
   );
};

export default PlaylistButton;
