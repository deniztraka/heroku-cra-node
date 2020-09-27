import React from 'react';
import {Image } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';
import ReactPlayer from 'react-player';

export default class TrailerComponent extends React.Component {
    constructor(props){
        super(props);
        this.trailer = props.data;                
    }
    
    render() {
      return (<div className="video-wrapper"> 
            <ReactPlayer url={'https://www.youtube.com/watch?v='+this.trailer.id} light={true} width="100%" controls={true} playing={true}/>         
            {/* <Image src={this.trailer.thumbnails.high.url} fluid />            */}
            <h3><a target="_blank" rel="noopener noreferrer" href={'https://www.youtube.com/watch?v='+this.trailer.id}>{this.trailer.title}</a></h3>             
            <p>Publish Date: <Moment>{this.trailer.publishedAt}</Moment>   </p>     
        </div>
        );
    }
  }