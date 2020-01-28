/* eslint-disable react/destructuring-assignment */
import "./RunCity.scss";

import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchCity } from "../../actions";

class RunCity extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.props.fetchCity(this.props.cityId);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { city } = this.props;
    if (!city) {
      return null;
    }
    // eslint-disable-next-line react/prop-types
    return <div className="header">{city.name}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { city: state.cities.find(city => city.id === ownProps.cityId) };
};

export default connect(mapStateToProps, { fetchCity })(RunCity);
