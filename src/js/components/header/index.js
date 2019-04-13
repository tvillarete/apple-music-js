import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, constants } from '../../toolbox';
import { popView } from '../../views/actions';

const { color, animation } = constants;
const { slideInFromRight, slideOutToRight } = animation;

const Container = styled.div`
   z-index: 2;
   position: fixed;
   display: flex;
   top: 0;
   left: 0;
   right: 0;
   max-width: 1200px;
   margin: 0 auto;
   height: ${props => (props.hideTitle ? '48px' : '90px')};
   padding-left: 48px;
   background: white;
   overflow: hidden;
   transition: all 0.3s ease-in-out;

   @media screen and (max-width: 768px) {
      padding-left: 0;
   }
`;

const ChevronContainer = styled.div`
   cursor: pointer;
   width: 40px;
   margin-left: -6px;
   opacity: ${props => (props.isShown ? 1 : 0)};
   transform: ${props =>
      props.isShown ? 'scale(1) translateX(0)' : 'scale(0) translateX(20px)'};
   transition: all 0.3s;

   &:active {
      svg: {
         color: ${props => props.isBackButton && color.redAlpha[2]};
      }
   }
`;

const TitleContainer = styled.div`
   position: absolute;
   margin-top: ${props =>
      (props.isBackButton && !props.exiting) || props.isHidden
         ? '5px'
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

const mapDispatchToProps = dispatch => {
   return {
      popView: () => dispatch(popView()),
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

const BackButton = connect(
   mapStateToProps,
   mapDispatchToProps,
)(({ viewState, popView }) => {
   const { stack } = viewState;
   const showChevron = stack.length > 1;

   return (
      <ChevronContainer isShown={showChevron}>
         <Icon
            name="chevron-left"
            size={38}
            color={color.red[4]}
            onClick={showChevron ? popView : null}
         />
      </ChevronContainer>
   );
});

class Header extends Component {
   constructor(props) {
      super(props);
      const { viewState } = props;
      const { stack } = viewState;

      this.state = {
         stack,
         hideTitle: props.hideTitle,
         newStack: null,
         exiting: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { stack } = viewState;
      const exiting = stack.length < prevState.stack.length;

      return {
         stack: exiting ? prevState.stack : stack,
         exiting,
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { stack } = viewState;

      setTimeout(() => {
         this.setState({
            stack,
            exiting: false,
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.exiting) {
         this.animateBack();
      }
   }

   render() {
      const { stack, exiting } = this.state;
      const currentView = stack[stack.length - 1];
      const { hideTitle } = currentView.props;

      return (
         <Container hideTitle={hideTitle && !exiting}>
            <BackButton />
            <TitleStack
               stack={stack}
               exiting={exiting}
               onClick={this.props.popView}
            />
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(Header);
