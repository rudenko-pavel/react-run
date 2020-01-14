import React, { Component } from 'react';
import './scss/JoggingsList.scss';

import  { connect } from 'react-redux';
import { selectJogging } from '../actions';

class JoggingsList extends Component {
    render(){
        console.log( "JoggingsList: ");
        return (
            <div className="joggings-list">
                JoggingsList
            </div>
        );
    }
}

export default connect(null,{
    selectJogging: selectJogging
})(JoggingsList);