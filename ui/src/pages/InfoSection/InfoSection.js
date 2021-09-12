import React, { Component } from 'react';
import "./InfoSection.css";
import { Avatar } from '@material-ui/core';
import imageSrc from "../../images/img.jpg"

class InfoSection extends Component {
    constructor(props) {
        super(props);
        let user;
        if (localStorage.user) {
          user = JSON.parse(localStorage.user);
        }
        this.state = { 
            user:user,
         }
    }
    render() { 
        return ( 
        <div>
            <div className="info__container">
                <Avatar src={imageSrc} className="info__image"/>
                <div className="info_content">
                    <div className="info_username"> {this.state.user?this.state.user.username:"unknown User"}</div>
                    <div className="info_description"> Description</div>
                </div>
            </div>
        </div> );
    }
}
 
export default InfoSection;