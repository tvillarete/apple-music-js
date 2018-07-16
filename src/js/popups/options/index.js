import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants, OptionsButton } from '../../toolbox';
import { pushView, popPopup } from '../../views/actions';

const { color, animation } = constants;
const { slideInFromBottom, slideOutToBottom } = animation;

const Container = styled.div`
   z-index: ${props => 100 + props.index};
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: flex-end;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const Cover = styled.div`
   z-index: 0;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: ${color.grayAlpha[5]};
   animation: ${props => (props.closing ? animation.fadeOut : animation.fadeIn)}
      0.3s ease-in-out;
`;

const MenuContainer = styled.div`
   position: relative;
   width: 90%;
   max-width: 30em;
   margin-bottom: 16px;
   background: white;
   animation: ${props => (props.closing ? slideOutToBottom : slideInFromBottom)}
      0.3s ease-in-out;
   overflow: hidden;
   border-radius: 20px;
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      popPopup: () => dispatch(popPopup()),
   };
};

class OptionsMenu extends Component {
   render() {
      const { index, closing } = this.props;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.props.popPopup}/>
            <MenuContainer closing={closing}>
               <OptionsButton label="Cancel" onClick={this.props.popPopup} />
            </MenuContainer>
         </Container>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(OptionsMenu);
