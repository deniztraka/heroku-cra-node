import React, { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Jumbotron, Nav, Container, Row, Col, Navbar, Form, FormControl} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    
    <div className="App">
      <header className="App-header">    
        <Container bg="dark">   
          <Jumbotron className="bg-transparent dt-jumbotron" fluid>
            <Container>
              <h1>Search for Movies, Trailers</h1>
              <p>
                You can search for movies in this page.<br></br> Than you can search for it's trailer videos by clicking on each film.
              </p>
            </Container>
          </Jumbotron>     
        </Container>    
      </header>
      <Container bg="dark">  
        <Form> 
          <Nav className="justify-content-center" activeKey="/home">        
            <Nav.Item>
              <FormControl type="text" placeholder="type some cool movie name here" className=" mr-sm-4" />
            </Nav.Item>
            <Nav.Item>
              <Button variant="secondary" type="submit">Search</Button>
            </Nav.Item>
          </Nav>
        </Form>             
      </Container>      
    </div>
  );

}

export default App;
