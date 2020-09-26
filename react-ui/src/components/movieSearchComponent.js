import React from 'react';
import { Nav, Container, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import MovieListComponent from './movieListComponent'

export default class MovieSearchComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue : '',
            isFetching:false,
            movies: []
        };            
    }
    
    
    render() {        
      return (
          <div>
            <Container bg="dark">  
                <Form> 
                <Nav className="justify-content-center" activeKey="/home">        
                    <Nav.Item>
                    <FormControl  value={this.state.inputValue} onChange={e => this.setState({inputValue: e.target.value})} type="text" placeholder="type some cool movie name here" className=" mr-sm-4" />
                    </Nav.Item>
                    <Nav.Item>
                    <Button variant="secondary" onClick={() => this.fetchMovies(this.state.inputValue)} >Search</Button>
                    </Nav.Item>
                </Nav>
                </Form>             
            </Container>
            <br></br>       
                          
            <MovieListComponent setMovies={ handle => this.fetchMovies = handle} /> 
      </div>
        );
    }
  }