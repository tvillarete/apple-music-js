import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   height: 150px;
   width: 150px;
   justify-content: center;
   align-items: center;
   overflow: hidden;
   border-radius: 4px;
`;

const Input = styled.input`
   display: none;
`;

const Label = styled.label`
   height: 100%;
   width: 100%;
   position: relative;
   cursor: pointer;

   img {
      max-height: 100%;
   }

   &:active {
      filter: brightness(0.95);
   }
`;

class FileInput extends Component {
   constructor(props) {
      super(props);
      this.state = {
         img: props.img,
      };
   }

   base64Encode = img => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => this.props.onUpload(reader.result);
      reader.onerror = function(error) {
         console.log('Error: ', error);
      };
   };

   sendImage = img => {
      this.base64Encode(img);
      this.setState({ img: window.URL.createObjectURL(img) });
   };

   render() {
      const { img } = this.state;

      return (
         <Container>
            <Label htmlFor="media-uploader">
               <img alt="Upload" draggable="false" src={img} />
            </Label>
            <Input
               id="media-uploader"
               accept="image/x-png,image/gif,image/jpeg"
               type="file"
               onChange={e => this.sendImage(e.target.files[0])}
            />
         </Container>
      );
   }
}

export default FileInput;
