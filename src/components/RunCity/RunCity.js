import React, { Component } from 'react';
import './RunCity.scss';

import { connect } from 'react-redux';
import { fetchCity } from '../../actions';

class RunCity extends Component{
    componentDidMount(){
        this.props.fetchCity(this.props.cityId);
    }

    render(){
        const { city } = 	this.props;
        if (!city){
            return null;
        }
        return (
            <div className="header">
                {city.name}
            </div>
        )
    }
}

	const mapStateToProps = (state, ownProps) =>{
		return {city: state.cities.find((city) => city.id === ownProps.cityId)}
	};
		
	export default connect (mapStateToProps, {fetchCity})(RunCity);