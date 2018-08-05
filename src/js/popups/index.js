import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PlaylistCreator from './playlist_creator';
import PlaylistSelector from './playlist_selector';
import OptionsMenu from './options';

const popups = {
   'Playlist Creator': <PlaylistCreator />,
   'Playlist Selector': <PlaylistSelector />,
   'Options': <OptionsMenu />
};

const Container = styled.div``;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const PopupStack = connect(mapStateToProps)(({ popupStack, closing }) => {
   return popupStack.map(({ name, props }, index) => {
      const popup = popups[name];
      props.index = index;
      props.closing = index === popupStack.length-1 && closing;
      props.key = `popup-${index}`;

      try {
         return React.cloneElement(popup, props)
      } catch (e) {
         console.error('Error: This popup is broken: ', popup);
         return null;
      }
   });
});

class PopupContainer extends Component {
   constructor(props) {
      super(props);
      const { viewState } = props;
      const { popupStack } = viewState;

      this.state = {
         popupStack,
         closing: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { viewState } = nextProps;
      const { popupStack } = viewState;
      const closing = popupStack.length < prevState.popupStack.length;

      return {
         popupStack: closing ? prevState.popupStack : popupStack,
         closing
      }
   }

   animateClose() {
      const { viewState } = this.props;
      const { popupStack } = viewState;

      setTimeout(() => {
         this.setState({
            popupStack,
            closing: false
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.closing) {
         this.animateClose();
      }
   }

   render() {
      const { popupStack, closing } = this.state;

      return (
         <Container>
            <PopupStack popupStack={popupStack} closing={closing} />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(PopupContainer);
