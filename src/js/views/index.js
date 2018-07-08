import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LibraryView from './library';
import ArtistListView from './artist_list';
import ArtistView from './artist';
import AlbumView from './album';

const views = {
   'Library': <LibraryView />,
   'Artists': <ArtistListView />,
   'Artist': <ArtistView />,
   'Album': <AlbumView />,
};

const Container = styled.div`
   flex: 1;
   overflow: auto;
   margin-bottom: 64px;
`;

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const CurrentView = connect(mapStateToProps)(({ viewState }) => {
   const { stack } = viewState;
   const { name, props } = stack[stack.length-1];
   const view = views[name];

   try {
      return React.cloneElement(view, props);
   } catch (e) {
      console.error('Error: This view is empty: ', view);
   }
});

class ViewContainer extends Component {
   render() {
      return (
         <Container>
            <CurrentView />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(ViewContainer);
