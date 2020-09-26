import React from 'react';
import {Image, Button } from 'react-bootstrap';
import placeHolderImg from '../movieImgPlaceholder.png';

export default class TrailerComponent extends React.Component {
    constructor(props){
        super(props);
        this.trailer = props.data;                
    }
    
    render() {
      return (<div>          
            <Image src={this.trailer.thumbnails.high.url} fluid />           
            <h3>{this.trailer.title}</h3>   
            <p>{this.trailer.publishedAt}</p>           
        </div>
        );
    }
  }