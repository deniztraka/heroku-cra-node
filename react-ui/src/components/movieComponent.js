import React from 'react';
import {Image, Button } from 'react-bootstrap';
import placeHolderImg from '../movieImgPlaceholder.png';
import SearchTrailersModalComponent from './searchTrailersModalComponent'

export default class MovieComponent extends React.Component {
    constructor(props){
        super(props);
        this.movie = props.data;
        this.state = {            
            modalShow:false
        }
    }
    
    render() {
      return (<div>
            <Image className="zoom" src={this.movie.imageUrl ? this.movie.imageUrl : placeHolderImg} alt={this.movie.title} onClick={() => this.openModal()} fluid />           
            <h3>{this.movie.title}</h3>   
            <p>{this.movie.year}</p>  
            {/* <Button onClick={() => this.openModal()} variant="dark" size="sm">Show Trailers</Button> */}
            <SearchTrailersModalComponent data={this.movie} openModal={openHandle => this.openModal = openHandle}/>
        </div>
        );
    }
  }