import React, { Component } from 'react';
import SpotiFree from './js';
import { injectGlobal } from 'styled-components';

injectGlobal`
   body {
      font-family: sans-serif;
   }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
         <SpotiFree />
      </div>
    );
  }
}

export default App;
