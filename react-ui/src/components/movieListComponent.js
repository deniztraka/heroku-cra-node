import React from 'react';
import { Container } from 'react-bootstrap';
import Movie from './movieComponent';
import request from 'superagent';

export default class MovieListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies : [],
            isFetching:false
        };

        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.props.setMovies(this.fetchMovies);
    }

    async fetchMovies(searchPhrase){     
        console.log('some shit happened');   
        this.setState({isFetching:true});
        //fetching movies from api
        var response = await request.get('/api/movies') 
        .query('q='+searchPhrase)
        .accept('application/json');

        this.setState({movies:response.body});
        this.setState({isFetching:false});
    }

        

    render() {

      //console.log(this.state.movies);
      return (
        <Container bg="dark">  
           
            <div className="movies">          
                <ul className="movie-list justify-content-center" key="moveieList">
                    {this.state.movies && this.state.movies.length > 0 && this.state.movies.map((movie) => {
                    return (                
                        <li className="movie"  key={movie.id.toString()}>
                            <Movie data={movie}/>  
                        </li>                
                    );
                    })}

                    <p className="actionDescription">
                    {this.state.movies ? '':'« '}
                        <strong>
                            {this.state.isFetching ? 'preparing a super duper movie list related with your search phrase' : ( this.state.movies.length > 0 ? '':'start searching now!')}
                        </strong>
                    {this.state.movies ? '':' »'}            
                    </p>
                </ul>
            </div>
            
            
     
        </Container> 
        );
    }
  }