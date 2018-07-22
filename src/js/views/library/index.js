import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../actions';
import { Button } from '../../toolbox';
import RecentlyPlayed from './recently_played';

const Container = styled.div`
   margin-top: 48px;
`;

const ButtonContainer = styled.div``;

class LibraryView extends Component {
   changeView = name => {
      this.props.pushView({
         name,
         props: {}
      });
   }

   render() {
      return (
         <Container>
            <ButtonContainer>
               <Button
                  label="Artists"
                  theme="red"
                  chevron
                  onClick={() => this.changeView('Artists')}
               />
               <Button
                  label="Albums"
                  theme="red"
                  chevron
                  onClick={() => this.changeView('Albums')}
               />
               <Button
                  label="Playlists"
                  theme="red"
                  chevron
                  onClick={() => this.changeView('Playlists')}
               />
            </ButtonContainer>
            <RecentlyPlayed />
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      viewState: state.viewState,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryView);
