import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Image, Jumbotron, Nav, Container, Form, FormControl} from 'react-bootstrap';
import request from 'superagent';
import placeHolderImg from './movieImgPlaceholder.png';
import './App.css';

function App() {
  const [movies, setMovies] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const fetchMovies = async () => {   
    console.log(inputValue); 
    setIsFetching(true);
    const response = await request.get('/api/movies') 
        .query('q='+inputValue)
        .accept('application/json');
       
        setMovies(response.body); 
        setIsFetching(false);         
  };

  return (
    
    <div className="App">
      <header className="App-header">    
        <Container bg="dark">   
          <Jumbotron className="bg-transparent dt-jumbotron" fluid>
            <Container>
              <h1>Search for Movies, Trailers</h1>
              <p>
                You can search for movies in this page.<br></br> Then you can search for it's trailer videos by clicking on each film.
              </p>
            </Container>
          </Jumbotron>     
        </Container>    
      </header>

     
      <Container bg="dark">  
        <Form> 
          <Nav className="justify-content-center" activeKey="/home">        
            <Nav.Item>
              <FormControl value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" placeholder="type some cool movie name here" className=" mr-sm-4" />
            </Nav.Item>
            <Nav.Item>
              <Button variant="secondary" onClick={fetchMovies} >Search</Button>
            </Nav.Item>
          </Nav>
        </Form>             
      </Container>   
      <br></br>         
      
      <Container bg="dark">  
        <div className="movies">          
          <ul className="movie-list justify-content-center" key="moveieList">
            {!isFetching && movies && movies.length > 0 && movies.map((movie) => {
              return (                
                  <li className="movie" key={movie.id.toString()}>
                    <Image src={movie.imageUrl ? movie.imageUrl : placeHolderImg} alt={movie.title} fluid />           
                    <h3>{movie.title}</h3>   
                    <p>{movie.year}</p>  
                  </li>                
              );
            })}

            <p className="actionDescription">
              {movies ? '':'« '}
                <strong>
                  {isFetching ? 'preparing a super duper movie list related with your search phrase' : ( movies ? '':'start searching now!')}
                </strong>
              {movies ? '':' »'}            
            </p>
        </ul>
        </div>
      </Container> 
    </div>
  );

}

export default App;
