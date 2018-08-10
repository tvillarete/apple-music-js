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
   cursor: pointer;
   background: ${color.grayAlpha[5]};
   animation: ${props => (props.closing ? animation.fadeOut : animation.fadeIn)}
      0.3s ease-in-out;
`;

const MenuContainer = styled.div`
   position: relative;
   width: 90%;
   max-width: 30em;
   margin-bottom: 16px;
   animation: ${props => (props.closing ? slideOutToBottom : slideInFromBottom)}
      0.3s ease-in-out;
   overflow: hidden;
`;

const Section = styled.div`
   margin: 12px 0;
   background: white;
   border-radius: 20px;
   overflow: hidden;

   &:first-child {
      margin-top: 0;
   }

   &:last-child {
      margin-bottom: 0;
   }
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
   handleClick = onClick => {
      this.props.popPopup();
      setTimeout(() => {
         typeof onClick === 'function' && onClick();
      }, 250);
   };

   render() {
      const { index, closing, options } = this.props;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.handleClick} />
            <MenuContainer closing={closing}>
               <Section>
                  {options &&
                     options.map(option => (
                        <OptionsButton
                           key={`option-${option.label}`}
                           label={option.label}
                           image={option.image}
                           onClick={() => this.handleClick(option.onClick)}
                        />
                     ))}
               </Section>
               <Section>
                  <OptionsButton
                     bold
                     center={true}
                     label="Cancel"
                     onClick={this.handleClick}
                  />
               </Section>
            </MenuContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);
