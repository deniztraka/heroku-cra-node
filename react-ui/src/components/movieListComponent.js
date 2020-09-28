import React from 'react';
import { Container } from 'react-bootstrap';
import Movie from './movieComponent';
import request from 'superagent';

export default class MovieListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies : [],
            isFetching:false,
            message:'« start searching now! »'
        };

        this.fetchingMessage = "« preparing a cool movie list just for you »";
        this.foundMessage = "« this is what I have for now »";
        this.nothingFoundMessage = "« I couldn't find anything I'm sorry :( »";
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.props.setMovies(this.fetchMovies);
    }

    async fetchMovies(searchPhrase){       
        this.setState({movies:[]});
        this.setState({isFetching:true});
        this.setState({message:this.fetchingMessage});
        var response = await request.get('/api/movies') 
        .query('q='+searchPhrase)
        .accept('application/json');
        this.setState({isFetching:false});
        this.setState({message:!response.body || response.body.length == 0 ? this.nothingFoundMessage : this.foundMessage});
        this.setState({movies:response.body});
    }

    render() {
      return (
        <Container bg="dark">             
            <div className="movies"> 
            
                <p className={`actionDescription ${this.state.isFetching ? 'loading' : ''}`}>                    
                    <strong>{this.state.message}</strong>
                </p>                
                <ul className="movie-list justify-content-center" key="moveieList">
                    { this.state.movies && this.state.movies.length > 0 && !this.isFetching && this.state.movies.map((movie) => {
                    return (                
                        <li className="movie"  key={movie.id.toString()}>
                            <Movie data={movie}/>  
                        </li>                
                    );
                    })}                    
                </ul>
                
            </div>
        </Container> 
        );
    }
  }