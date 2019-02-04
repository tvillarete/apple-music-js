import React, { Component } from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazy-load';
import constants from '../../constants';

const { color } = constants;
const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
   margin: 0 16px 16px;
   width: 185px;
   cursor: pointer;

   ${breakpointSm} {
      margin: 16px 16px 0 0;
      width: auto;
      flex: 0 44%;
   }

   &:active {
      img {
         filter: brightness(65%);
      }
   }
`;

const ImgContainer = styled.div`
   position: relative;
   min-height: 185px;
   margin-bottom: 16px;

   ${breakpointSm} {
      height: 42vw;
      width: 42vw;
      margin-bottom: 0;
   }
`;

const Placeholder = styled.img`
   z-index: 1;
   position: absolute;
   top: 0;
   max-width: 100%;
   transition: all 0.3s;
   opacity: ${props => (props.isHidden ? 0 : 1)};
`;

const Artwork = styled.img`
   position: absolute;
   top: 0;
   border-radius: 4px;
   max-width: 100%;
   pointer-events: none;
   user-select: none;
   animation: {animation.fadeIn} 0.15s;
`;

const TextContainer = styled.div`
   margin: 4px 0;
`;

const Label = styled.h4`
   font-weight: normal;
   margin: 0 0 4px 0;
   user-select: none;
`;

const SubLabel = styled.h4`
   color: ${color.gray[5]};
   font-weight: normal;
   margin: 0;
   user-select: none;
`;

class AlbumButton extends Component {
   state = {
      loaded: false,
   };

   onLoad = () => {
      this.setState({ loaded: true });
   };

   render() {
      const { label, sublabel, artwork, onClick } = this.props;
      const { loaded } = this.state;

      return (
         <Container onClick={onClick}>
            <ImgContainer>
               <Placeholder
                  src="images/default_artwork.svg"
                  isHidden={loaded}
               />
               <LazyLoad>
                  <Artwork src={artwork} onLoad={this.onLoad} />
               </LazyLoad>
            </ImgContainer>
            <TextContainer>
               <Label>{label}</Label>
               <SubLabel>{sublabel}</SubLabel>
            </TextContainer>
         </Container>
      );
   }
}

export default AlbumButton;
