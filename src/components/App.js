import React from 'react';
import './scss/App.scss';

import JoggingsList from './JoggingsList/JoggingsList';
import { BrowserRouter, Route } from 'react-router-dom';

import Strava from './Strava/Strava';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import About from './About/About';

const App = () =>{
	return(
		<div className="ui container App">
			<BrowserRouter>
				<div>
					<HeaderMenu />
					<Route path="/" exact 		component={About} />
					<Route path="/joggings"  	component={JoggingsList} />
					<Route path="/strava"  		component={Strava} />
				</div>
			</BrowserRouter>
		</div>
	)
};

export default App;