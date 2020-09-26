import React from 'react';
import {Jumbotron,  Container } from 'react-bootstrap';
export default class HeaderContainer extends React.Component {
    render() {
      return (
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
        );
    }
  }