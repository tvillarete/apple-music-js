import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../actions';
import { Button } from '../../toolbox';

const Container = styled.div``;

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
                  onClick={() => this.changeView('Artists')}
               />
               <Button
                  label="Albums"
                  theme="red"
                  onClick={() => this.changeView('Albums')}
               />
               <Button
                  label="Playlists"
                  theme="red"
                  onClick={() => this.changeView('Artists')}
               />
            </ButtonContainer>
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
