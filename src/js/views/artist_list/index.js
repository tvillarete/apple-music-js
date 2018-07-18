import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchArtists } from '../../api/actions';
import { pushView } from '../actions';
import { Button } from '../../toolbox';

const Container = styled.div`
   margin-top: 48px;
`;

const ButtonContainer = styled.div``;

class ArtistListView extends Component {
   viewArtist = artist => {
      this.props.pushView({
         name: 'Artist',
         title: artist,
         props: {
            artist
         }
      });
   }

   componentDidMount() {
      if (!this.props.apiState.data.artists.length) {
         this.props.fetchArtists();
      }
   }

   render() {
      const { artists } = this.props.apiState.data;

      return (
         <Container>
            <ButtonContainer>
               {artists &&
                  artists.map((artist, index) => (
                     <Button
                        key={artist.artist}
                        label={artist.artist}
                        chevron
                        onClick={() => this.viewArtist(artist.artist)}
                     />
                  ))}
            </ButtonContainer>
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
      apiState: state.apiState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      fetchArtists: () => dispatch(fetchArtists()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListView);
