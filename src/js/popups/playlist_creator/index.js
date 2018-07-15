import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants } from '../../toolbox';
import { fetchPlaylists } from '../../api/actions';
import { pushView, popPopup } from '../../views/actions';
import Header from '../components/header';

const { color, animation } = constants;
const { slideInFromBottom, slideOutToBottom } = animation;

const Container = styled.div`
   z-index: ${props => 100 + props.index};
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;
   animation: ${props =>
         props.closing ? slideOutToBottom : slideInFromBottom}
      0.3s ease-in-out;
`;

const Button = styled.h3`
   margin: 0;
   color: ${color.red[4]};
   font-weight: ${props => props.bold && 'bold'};
   cursor: pointer;
   user-select: none;
`;

const Title = styled.h3`
   margin: 0;
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
      fetchPlaylists: () => dispatch(fetchPlaylists()),
   };
};

const PlaylistCreator = ({ index, closing, onSave, popPopup }) => {
   return (
      <Container index={index} closing={closing}>
         <Header
            left={<Button onClick={popPopup}>Cancel</Button>}
            center={<Title>New Playlist</Title>}
            right={
               <Button bold onClick={popPopup}>
                  Done
               </Button>
            }
         />
      </Container>
   );
};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
)(PlaylistCreator);
