import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import ReactPlayer from 'react-player';
import {
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

  import {
    FacebookIcon,
    LinkedinIcon,
    RedditIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
  } from "react-share";

export default class TrailerComponent extends React.Component {
    constructor(props){
        super(props);
        this.trailer = props.data; 
        this.url = 'https://www.youtube.com/watch?v=' + this.trailer.id;             
    }
    
    render() {
      return (<div className="video-wrapper"> 
            <ReactPlayer url={this.url} light={true} width="100%" controls={true} playing={true}/>
            <h3><a target="_blank" rel="noopener noreferrer" href={this.url}>{this.trailer.title}</a></h3>             
            <p>Publish Date: <Moment>{this.trailer.publishedAt}</Moment></p>     
            <p>
                <FacebookShareButton url={this.url}><FacebookIcon size={64} borderRadius={10}/></FacebookShareButton>
                <LinkedinShareButton url={this.url}><LinkedinIcon size={64} borderRadius={10}/></LinkedinShareButton>
                <RedditShareButton url={this.url}><RedditIcon size={64} borderRadius={10}/></RedditShareButton>
                <TumblrShareButton url={this.url}><TumblrIcon size={64} borderRadius={10}/></TumblrShareButton>
                <TwitterShareButton url={this.url}><TwitterIcon size={64} borderRadius={10}/></TwitterShareButton>
                <WhatsappShareButton url={this.url}><WhatsappIcon size={64} borderRadius={10}/></WhatsappShareButton>
            </p>  
        </div>
        );
    }
  }