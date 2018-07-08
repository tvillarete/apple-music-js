import React from 'react';
import styled from 'styled-components';

const Text = styled.h1`
   font-size: 32px;
   margin: 8px 0 0 16px;
`;

const Title = ({ label }) => {
   return <Text>{label}</Text>
}

export default Title;
