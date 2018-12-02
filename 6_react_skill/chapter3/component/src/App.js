import React, { Component } from 'react';
import MyComponent from './MyComponent';

class App extends Component {
  render() {
    const num = "어리양";
    const age = 36;
    return (
      <MyComponent name={num} age={age} />
    );
  }
}

export default App;
