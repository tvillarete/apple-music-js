import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants } from '../../toolbox';

const { color, animation } = constants;
const { slideInFromRight, slideOutToRight } = animation;

const TitleContainer = styled.div`
   position: absolute;
   margin-top: ${props =>
      (props.isBackButton && !props.exiting) || props.isHidden
         ? '7px'
         : '48px'};
   margin-left: ${props =>
      props.isHidden && !props.exiting ? '-100%' : '24px'};
   margin-left: ${props => props.isTitle && props.exiting && '100vw'};
   animation: ${props => (props.isLeaving ? slideOutToRight : slideInFromRight)}
      0.3s ease-in-out;
   transition: all 0.3s ease-in-out;

   h1 {
      color: ${props =>
         (props.isBackButton && !props.exiting) || props.isHidden
            ? color.red[4]
            : color.black};
      color: ${props => props.isTitle && props.exiting && 'white'};
      font-weight: ${props =>
         (props.isBackButton && !props.exiting) || props.isHidden
            ? 'normal'
            : 'bold'};
      font-size: ${props =>
         (props.isBackButton && !props.exiting) || props.isHidden
            ? '20px'
            : null};
      opacity: ${props => (props.isHidden && !props.exiting ? 0 : 1)};
      cursor: ${props => props.isBackButton && 'pointer'};

      &:active {
         color: ${props => props.isBackButton && color.redAlpha[2]};
      }
   }
`;

const Title = styled.h1`
   margin: 0;
   transition: all 0.3s ease-in-out;
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const TitleStack = connect(mapStateToProps)(({ stack, exiting, onClick }) => {
   return stack.map(({ name, title, props }, index) => {
      const isHidden = index < stack.length - 2;
      const isBackButton = index === stack.length - 2;
      const isTitle = index === stack.length - 1;

      return (
         index >= stack.length - 3 && (
            <TitleContainer
               key={`title-${name}`}
               isHidden={isHidden}
               isBackButton={isBackButton}
               exiting={exiting}
               isTitle={isTitle}>
               {!props.hideTitle && (
                  <Title onClick={() => (isBackButton ? onClick() : null)}>
                     {title || name}
                  </Title>
               )}
            </TitleContainer>
         )
      );
   });
});

export default connect(
   mapStateToProps
)(TitleStack);
