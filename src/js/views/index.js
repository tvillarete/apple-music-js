import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LibraryView from './library';
import ArtistListView from './artist_list';
import ArtistView from './artist';
import AlbumView from './album';
import AlbumListView from './album_list';

const views = {
   Library: <LibraryView />,
   Artists: <ArtistListView />,
   Artist: <ArtistView />,
   Albums: <AlbumListView />,
   Album: <AlbumView />,
};

const Container = styled.div`
   position: relative;
   width: 100%;
   max-width: 70em;
   flex: 1;
   overflow: auto;
   margin: 48px auto 64px auto;
   padding-left: 24px;
   overflow: hidden;
`;

const PageContainer = styled.div`
   z-index: ${props => (props.isPrevView ? 0 : 1)};
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   padding-left: 24px;
   background: white
   transform: ${props => (props.isPrevView && !props.returning ? 'translateX(-20%)' : null)};
   animation: ${props => props.goingBack ? 'slideHi' : 'slideBye'} 0.3s ease-in-out;
   transition: all 0.3s ease-in-out;
   -webkit-overflow-scrolling: touch;
   overflow: auto;

   @keyframes slideBye {
      0% {
         transform: translateX(100vw);
      }
   }

   @keyframes slideHi {
      100% {
         transform: translateX(100vw);
      }
   }
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const ViewStack = connect(mapStateToProps)(({ stack, goingBack }) => {
   return stack.map(({ name, props }, index) => {
      const view = views[name];
      const isPrevView = index !== stack.length - 1;

      try {
         return (
            <PageContainer
               key={`page-${index}`}
               isPrevView={isPrevView}
               returning={goingBack && index === stack.length - 2}
               goingBack={goingBack && index === stack.length - 1}>
               {React.cloneElement(view, props)}
            </PageContainer>
         );
      } catch (e) {
         console.error('Error: This view is empty: ', view);
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
      }
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
            <ViewStack stack={stack} goingBack={goingBack} />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);
