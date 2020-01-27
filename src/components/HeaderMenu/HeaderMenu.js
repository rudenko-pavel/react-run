import React, { Component } from 'react';
import './HeaderMenu.scss';
import { Link } from 'react-router-dom';

import { fetchHeaderMenu } from '../../actions';
import { connect } from 'react-redux';

class HeaderMenu extends Component{
    componentDidMount (){
		this.props.fetchHeaderMenu();
    };

    renderList(){
        return this.props.headermenu.map(headermenu =>{
            return (
                <Link to={headermenu.link} className = "ui button" key={headermenu.id}>
                    {headermenu.name}
                </Link>
            );
        });
    }

    render(){
       // console.log("HeaderMenu(fetchHeaderMenu)", this.props.headermenu);
        return( 
            <div className="row">
                <div className = "column HeaderMenu">
                    <div className="ui basic buttons">
                        {this.renderList()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{ // see to `src/reducers/index.js`
    return { 
        headermenu: state.headermenu
    };
}

export default connect(mapStateToProps,{
    fetchHeaderMenu: fetchHeaderMenu 		// see to `src/actions/index.js`
})(HeaderMenu);