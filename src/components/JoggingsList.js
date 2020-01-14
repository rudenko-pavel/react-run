import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { fetchJoggings } from '../actions';

import './scss/JoggingsList.scss';

class JoggingsList extends Component {
    componentDidMount(){
        this.props.fetchJoggings();
    }

    render(){
        console.log( "JoggingsList: ", this.props.joggings);
        return (
            <div className="joggings-list">
                JoggingsList: 
            </div>
        );
    }
}

const mapStateToProps = (state) =>{ // see to `src/reducers/index.js`
    return { joggings: state.joggings};
}

export default connect(mapStateToProps,{
    fetchJoggings: fetchJoggings
})(JoggingsList);