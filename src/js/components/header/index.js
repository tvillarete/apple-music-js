import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, constants } from '../../toolbox';
import { popView } from '../../views/actions';

const { color } = constants;

const Container = styled.div`
   position: relative;
   width: 100%;
   max-width: 70em;
   margin: 0 auto;
   height: 86px;
   display: flex;
   overflow: hidden;
`;

const ChevronContainer = styled.div`
   animation: scale 0.25s;
   cursor: pointer;

   svg {
      color: ${color.red[4]};
      height: 40px;
      width: 30px;
   }

   @keyframes scale {
      0% {
         transform: scale(0);
         opacity: 0;
      }
   }
`;

const TitleContainer = styled.div`
   position: absolute;
   margin-top: ${props =>
      (props.isBackButton && !props.goingBack) || props.isHidden ? '11px' : '48px'};
   margin-left: ${props => (props.isHidden && !props.goingBack ? '-100%' : '24px')};
   margin-left: ${props => props.isTitle && props.goingBack && '100vw'};
   animation: ${props => (props.isLeaving ? 'slideOut' : 'slideIn')} 0.3s
      ease-in-out;
   transition: all 0.3s ease-in-out;

   h1 {
      color: ${props =>
         (props.isBackButton && !props.goingBack) || props.isHidden ? color.red[4] : color.black};
      color: ${props => props.isTitle && props.goingBack && 'white'};
      font-weight: ${props =>
         (props.isBackButton && !props.goingBack) || props.isHidden ? 300 : 'bold'};
      font-size: ${props =>
         (props.isBackButton && !props.goingBack) || props.isHidden ? '20px' : null};
      opacity: ${props => (props.isHidden && !props.goingBack ? 0 : 1)};
      cursor: ${props => props.isBackButton && 'pointer'};
   }

   @keyframes slideIn {
      0% {
         transform: translateX(100vw);
      }
   }

   @keyframes slideOut {
      100% {
         transform: translateX(100vw);
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

const TitleStack = connect(mapStateToProps)(({ stack, goingBack, onClick }) => {
   return stack.map(({ name, title, props }, index) => {
      const isPrevView = index !== stack.length - 1;
      const isHidden = index < stack.length - 2;
      const isBackButton = index === stack.length - 2;
      const isTitle = index === stack.length - 1;

      return (
         <TitleContainer
            key={`title-${name}`}
            isHidden={isHidden}
            isBackButton={isBackButton}
            goingBack={goingBack}
            isTitle={isTitle}>
            <Title onClick={() => (isBackButton ? onClick() : null)}>
               {title || name}
            </Title>
         </TitleContainer>
      );
   });
});

const BackButton = connect(mapStateToProps, mapDispatchToProps)(
   ({ viewState, popView }) => {
      const { stack } = viewState;

      if (stack.length <= 1) {
         return null;
      }

      return (
         <ChevronContainer>
            <Icon name="chevron-left" onClick={popView} />
         </ChevronContainer>
      );
   },
);

class Header extends Component {
   constructor(props) {
      super(props);
      const { viewState } = props;
      const { stack } = viewState;

      this.state = {
         stack,
         newStack: null,
         goingBack: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { stack } = viewState;
      const goingBack = stack.length < prevState.stack.length;

      return {
         stack: goingBack ? prevState.stack : stack,
         goingBack,
      };
   }

   animateBack() {
      const { viewState } = this.props;
      const { stack } = viewState;

      setTimeout(() => {
         this.setState({
            stack,
            goingBack: false
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.goingBack) {
         this.animateBack();
      }
   }

   render() {
      const { stack, goingBack } = this.state;

      return (
         <Container>
            <BackButton />
            <TitleStack
               stack={stack}
               goingBack={goingBack}
               onClick={this.props.popView}
            />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
