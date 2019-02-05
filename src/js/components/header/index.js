import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popView } from '../../views/actions';
import BackButton from './back_button';
import TitleStack from './title_stack';

const Container = styled.div`
   z-index: 2;
   position: fixed;
   display: flex;
   top: 0;
   left: 0;
   right: 0;
   max-width: 72em;
   margin: 0 auto;
   height: ${props => (props.hideTitle ? '48px' : '90px')};
   background: white;
   overflow: hidden;
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
