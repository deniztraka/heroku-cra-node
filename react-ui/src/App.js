import React from 'react';
import HeaderContainer from './components/headerContainer'
import './App.css';
import MovieSearchComponent from './components/movieSearchComponent';

function App() {
  return (    
    <div className="App">
      <HeaderContainer/>
      <MovieSearchComponent/>
    </div>
  );

}

export default App;
