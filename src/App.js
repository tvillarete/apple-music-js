import React, { Component } from 'react';
import SpotiFree from './js';
import { injectGlobal } from 'styled-components';

injectGlobal`
   body {
      font-family: sans-serif;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
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

document.addEventListener("touchstart", function(){}, true);

export default App;
