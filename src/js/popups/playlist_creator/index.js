import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { constants, FileInput } from '../../toolbox';
import { fetchPlaylists, createPlaylist } from '../../api/actions';
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
   animation: ${props => (props.closing ? slideOutToBottom : slideInFromBottom)}
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

const Section = styled.div`
   display: flex;
   padding: 0 16px;
`;

const TitleInput = styled.textarea`
   margin-left: 16px;
   -webkit-appearance: none;
   font-size: 24px;
   border: none;
   outline: none;
   flex: 1;
   resize: none;
   caret-color: ${color.red[4]};
   font-family: 'SF Pro Display';
`;

const DescriptionInput = styled.textarea`
   margin: 16px 0 16px 16px;
   -webkit-appearance: none;
   font-size: 24px;
   border: none;
   outline: none;
   flex: 1;
   resize: none;
   caret-color: ${color.red[4]};
   border-top: 1px solid ${color.gray[3]};
   border-bottom: 1px solid ${color.gray[3]};
   font-family: 'SF Pro Display';
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
      createPlaylist: playlist => dispatch(createPlaylist(playlist)),
   };
};

class PlaylistCreator extends Component {
   state = {
      img: /* Base64 encoded string */ null,
      title: '',
      description: '',
      tracks: [],
   };

   handleImageUpload = img => {
      this.setState({ img });
   };

   createPlaylist = () => {
      const description = document.getElementById('playlist-description').value;
      const title = document.getElementById('playlist-title').value;
      const { img, tracks } = this.state;

      if (!title || !description) {
         alert("Make sure to add a title and description!");
         return;
      }

      const playlist = {
         title,
         description,
         img,
         tracks,
      };

      this.props.createPlaylist(playlist);
      this.props.popPopup();
   };

   render() {
      const { index, closing } = this.props;

      return (
         <Container index={index} closing={closing}>
            <Header
               left={<Button onClick={this.props.popPopup}>Cancel</Button>}
               center={<Title>New Playlist</Title>}
               right={
                  <Button bold onClick={this.createPlaylist}>
                     Done
                  </Button>
               }
            />
            <Section>
               <FileInput
                  img={'images/photo_add.png'}
                  onUpload={this.handleImageUpload}
               />
               <TitleInput id="playlist-title" placeholder="Playlist Name" />
            </Section>
            <Section>
               <DescriptionInput
                  id="playlist-description"
                  placeholder="Description"
               />
            </Section>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistCreator);
