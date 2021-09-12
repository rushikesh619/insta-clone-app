import React, { Component } from 'react';
import "./Suggestions.css"
import { Avatar } from '@material-ui/core';
import imageSrc from '../../images/img.jpg'

class Suggestions extends Component {   
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <div className="suggestions__container">
                <div className="suggestions__header">
                    <div>Suggestions For You</div>
                </div>
                <div className="suggestions__body">
                    <div className="suggestions__friends">
                        <Avatar src={imageSrc} className="suggestions__image"/>
                        <div className="suggestions__username">suggestion 1</div>
                    </div>
                    <div className="suggestions__friends">
                        <Avatar src={imageSrc} className="suggestions__image"/>
                        <div className="suggestions__username">suggestion 2</div>
                    </div>
                    <div className="suggestions__friends">
                        <Avatar src={imageSrc} className="suggestions__image"/>
                        <div className="suggestions__username">suggestion 3</div>
                    </div>
                    <div className="suggestions__friends">
                        <Avatar src={imageSrc} className="suggestions__image"/>
                        <div className="suggestions__username">suggestion 4</div>
                    </div>
                    <div className="suggestions__friends">
                        <Avatar src={imageSrc} className="suggestions__image"/>
                        <div className="suggestions__username">suggestion 5</div>
                    </div>
                </div>
            </div>
        </div> );
    }
}
 
export default Suggestions;