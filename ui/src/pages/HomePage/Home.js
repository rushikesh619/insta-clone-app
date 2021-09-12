import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import MainContent from '../MainContent/MainContent';

class Home extends Component {
    constructor(props) {
        super(props);
        let user;
        if (localStorage.user) {
          user = JSON.parse(localStorage.user);
        }
        this.state = { 
            user: user
         }
    }
    render() { 
        return ( 
            <>
                {this.state.user?   
                <div>              
                    <NavBar />
                    <MainContent />
                </div> 
                :<h1>Please Login!!!!</h1>} 

            </>
         );
    }
}
 
export default Home;
