import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchJoggings } from '../../actions';

import './JoggingsList.scss';
import RunCity from '../RunCity/RunCity';

class JoggingsList extends Component{
    componentDidMount (){
		this.props.fetchJoggings();
    };

    secondsToFullTime = (timeInSeconds) =>{
        let hours = ('00' + Math.floor(timeInSeconds / 60 / 60)).slice(-2);
        let minutes = ('00' + Math.floor(timeInSeconds / 60) % 60).slice(-2);
        let seconds = ('00' + Math.floor(timeInSeconds - minutes * 60)).slice(-2);

		return hours +":"+minutes+":"+seconds;
    };

    timestampToDate = (timestamp)=>{
        let fullDate = new Date(timestamp*1000);
        let year = fullDate.getFullYear();
        const arrayMonth = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = arrayMonth[fullDate.getMonth()];
        let date = ("0" + fullDate.getDate()).slice(-2);
        return date+" "+month+" "+year;
    }
    
    
	renderList(){
        const reverceJoggings = this.props.joggings.reverse();
        return reverceJoggings.map(jogging =>{
            return ( 
                <tr key={jogging.id} className="one-item" >
                    <td><p>#{jogging.id}</p></td>
                    <td><p>{this.timestampToDate(jogging.date)}</p></td>
                    <td><p>{jogging.distance}</p></td>
                    <td><p>{this.secondsToFullTime(jogging.time)}</p></td>
                    <td><RunCity cityId={jogging.cityId} /></td>
                </tr>
            );
        });
    };

    render(){
        //console.log ("render()",this.props.joggings);
        return( 
            <table className="ui celled striped table">
                <thead>
                    <tr className="one-item"><th colSpan="5">My joggings</th></tr>
                    <tr className="one-item">
                        <th>#</th>
                        <th>Date</th>
                        <th>Full distance</th>
                        <th>Full time</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderList()}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) =>{ // see to `src/reducers/index.js`
    return { 
        joggings: state.joggings
    };
}

export default connect(mapStateToProps,{
    fetchJoggings: fetchJoggings
})(JoggingsList);