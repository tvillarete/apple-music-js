import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popView } from '../../views/actions';

const Container = styled.div`
   height: 48px;
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

const BackButton = connect(mapStateToProps, mapDispatchToProps)(
   ({ viewState, popView }) => {
      const { stack } = viewState;

      if (stack.length <= 1) {
         return null;
      }

      const view = stack[stack.length - 2];

      return <h3 onClick={popView}>{view.title || view.name}</h3>;
   },
);

class Header extends Component {
   render() {
      return (
         <Container>
            <BackButton />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
