import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   min-height: 48px;
   border-bottom: 1px solid ${color.gray[3]};
   cursor: pointer;

   :first-of-type {
      border-top: 1px solid ${color.gray[3]};
   }

   &:active {
      background: ${color.gray[2]};
   }
`;

const TextContainer = styled.div`
   display: flex;
   flex: 1;
   flex-direction: column;
   justify-content: center;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   h2,
   h4 {
      font-weight: normal;
      color: ${props =>
         props.theme && props.theme.length
            ? color[props.theme][4]
            : color.black};
      color: ${props => props.isPlaying && color.red[4]};
      user-select: none;
   }
`;

const Label = styled.h2`
   margin: 0;
   font-size: 1.3rem;
`;

const SubLabel = styled.h4`
   margin: 0;
`;

const OptionsContainer = styled.div`
   height: 3em;
   width: 3em;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ChevronContainer = styled.div`
   height: 3em;
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

const Button = ({
   index,
   theme,
   label,
   sublabel,
   showIndex,
   isPlaying,
   OptionsMenu,
   onClick,
   chevron,
   onOptionsClick,
}) => {
   const handleOptionsClick = e => {
      e.stopPropagation();
      onOptionsClick();
   };

   return (
      <Container onClick={onClick}>
         <TextContainer isPlaying={isPlaying} theme={theme}>
            <Label>{label}</Label>
            <SubLabel>{sublabel}</SubLabel>
         </TextContainer>
         {OptionsMenu && (
            <OptionsContainer onClick={handleOptionsClick}>
               <Icon name="more-horizontal" />
            </OptionsContainer>
         )}
         {chevron && (
            <ChevronContainer>
               <Icon name="chevron-right" />
            </ChevronContainer>
         )}
      </Container>
   );
};

export default Button;
