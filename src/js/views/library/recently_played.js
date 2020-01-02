import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../actions';
import { AlbumButton } from '../../toolbox';

const Container = styled.div`
   margin-top: 24px;
`;

const Header = styled.h3`
   margin: 8px 0;
   font-size: 21px;
`;

const ButtonContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   margin-top: 16px;

   div {
      margin-left: 0;
   }
`;

const mapStateToProps = state => {
   return {
      audioState: state.audioState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
   };
};

class RecentlyPlayed extends Component {
   viewAlbum = ({ artist, album }) => {
      this.props.pushView({
         name: 'Album',
         title: album,
         props: {
            hideTitle: true,
            artist,
            album
         }
      });
   }

   render() {
      const { audioState } = this.props;
      const { recents } = audioState;

      return (
         <Container>
            <Header>Recently Played</Header>
            <ButtonContainer>
               {recents &&
                  recents.map((item, index) => {
                     const { album, artist, artwork } = item;
                     const url = `https://tannerv.ddns.net/SpotiFree/${artwork}`;

                     return (
                        <AlbumButton
                           key={album}
                           label={album}
                           sublabel={artist}
                           artwork={url}
                           onClick={() => this.viewAlbum({ artist, album })}
                        />
                     );
                  })}
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayed);
