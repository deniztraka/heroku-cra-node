import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import request from 'superagent';
import Trailer from './trailerComponent';

export default class SearchTrailersModalComponent extends React.Component {
    constructor(props){
        super(props);
        this.movie = props.data;

        this.state = {
            showModal : false,
            isFetching: false,
            trailers:[]
        };

        this.openModal = this.openModal.bind(this);        
    }

    async fetchTrailers(){     
        //fetching movies from api
        var response = await request.get('/api/trailers') 
        .query('q='+this.movie.title + ' ' + this.movie.year + ' Trailer')
        .accept('application/json');

        this.setState({trailers:response.body});
        this.setState({isFetching:false});
    }

    componentDidMount() {
        this.props.openModal(this.openModal);
    } 

    openModal(){
        this.setState({showModal:true});
        this.setState({isFetching:true});
        this.fetchTrailers();        
    }    

    render() {
      return (
           
            <Modal show={this.state.showModal}              
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title className="trailers-content-title" id="contained-modal-title-vcenter">
                        {this.movie.title + ' Trailers'}
                    </Modal.Title>
                    <Button variant="outline-dark" onClick={() => this.setState({showModal:false})}>X</Button>
                </Modal.Header>
                <Modal.Body className="trailers-content">
                    <div className="trailers">       
                        <ul className="trailer-list justify-content-center" key="trailerList">
                            {this.state.trailers && this.state.trailers.length > 0 && this.state.trailers.map((trailer) => {
                                return (                
                                    <li className="trailer"  key={trailer.id.toString()}>
                                        <Trailer data={trailer}/>  
                                    </li>                
                                );
                                })}
                        </ul>
                    
                        <p className={`actionDescription ${this.state.isFetching ? 'loading' : ''}`}>
                            {this.state.trailers ? '':'« '}
                                <strong>
                                    {this.state.isFetching ? 'preparing a super duper movie list related with your search phrase' : ( this.state.trailers.length > 0 ? this.state.trailers.length:'start searching now!')}
                                </strong>
                            {this.state.trailers ? '':' »'}  
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.setState({showModal:false})}>Close</Button>
                </Modal.Footer>
                </Modal>
        
        );
    }
  }