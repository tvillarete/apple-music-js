import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Icon, constants } from '../../toolbox';
import { popView } from '../../views/actions';

const { color } = constants;

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

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(BackButton);
