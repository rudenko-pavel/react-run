import React from 'react';
import './scss/App.scss';

import JoggingsList from './JoggingsList/JoggingsList';
import { BrowserRouter, Route } from 'react-router-dom';

import Strava from './Strava/Strava';
import HeaderMenu from './HeaderMenu/HeaderMenu';

const App = () =>{
	return(
		<div className="ui container">
			<BrowserRouter>
				<div>
                    <HeaderMenu />
					<Route path="/" exact component={JoggingsList} />
					<Route path="/strava" exact component={Strava} />
				</div>
			</BrowserRouter>
		</div>
	)
};

export default App;