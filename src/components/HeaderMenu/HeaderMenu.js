import React, { Component } from 'react';
import './HeaderMenu.scss';
import { Link } from 'react-router-dom';

class HeaderMenu extends Component{
    render(){
        return( 
            <div className="row">
                <div className = "column HeaderMenu">
                    <div className="ui buttons">
                        <Link  to="/" className = "ui basic blue button">joggings</Link >
                        <Link  to="/strava" className = "ui basic blue button">strava</Link >
                    </div>
                </div>
            </div>
        );
    }
}
export default HeaderMenu;