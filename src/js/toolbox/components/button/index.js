import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const { color } = constants;

const Container = styled.div`
   display: flex;
   min-height: 48px;
   border-bottom: 1px solid ${color.gray[3]};
   cursor: pointer;

   &:hover {
      background: ${color.gray[2]};
   }
`;

const TextContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;

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
`;

const SubLabel = styled.h4`
   margin: 0;
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
}) => {
   return (
      <Container onClick={onClick}>
         <TextContainer isPlaying={isPlaying} theme={theme}>
            <Label>{label}</Label>
            <SubLabel>{sublabel}</SubLabel>
         </TextContainer>
         {OptionsMenu && OptionsMenu}
      </Container>
   );
};

export default Button;
