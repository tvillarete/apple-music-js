import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants } from '../toolbox';
import * as Views from './';

const { animation } = constants;
const { slideInFromRight, slideOutToRight } = animation;

const Container = styled.div`
   position: relative;
   width: 100%;
   max-width: 1130px;
   flex: 1;
   overflow: auto;
   margin: 48px auto 64px auto;
   padding-left: 24px;
   overflow: hidden;
`;

const PageContainer = styled.div`
   z-index: ${props => (props.secondFromTop ? 0 : 1)};
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   padding: 0 24px;
   background: white;
   transform: ${props =>
      props.secondFromTop && !props.becomingTop ? 'translateX(-20%)' : null};
   overflow: ${props => (props.secondFromTop ? 'hidden' : 'auto')};
   animation: ${props =>
      props.exiting ? slideOutToRight : slideInFromRight} 0.3s ease-in-out;
   transition: all 0.3s ease-in-out;
   -webkit-overflow-scrolling: touch;
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const ViewStack = connect(mapStateToProps)(({ stack, exiting }) => {
   return stack.map(({ name, props }, index) => {
      const View = Views[name];
      const secondFromTop = index !== stack.length - 1;

      try {
         return (
            <PageContainer
               key={`page-${index}`}
               secondFromTop={secondFromTop}
               becomingTop={exiting && index === stack.length - 2}
               exiting={exiting && index === stack.length - 1}>
               <View {...props} />
            </PageContainer>
         );
      } catch (e) {
         console.error('Error: This view is empty: ', View);
         return null;
      }
   });
});

class ViewContainer extends Component {
   constructor(props) {
      super(props);
      const { viewState } = props;
      const { stack } = viewState;

      this.state = {
         stack,
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

      return (
         <Container>
            <ViewStack stack={stack} exiting={exiting} />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);
