import React from 'react';
import './scss/App.scss';

import JoggingsList from './JoggingsList/JoggingsList';

const App = () =>{
    return(
        <div className="ui container grid">
            <div className="column sixteen wide">
                <JoggingsList />
            </div>
        </div> 
    )
};

export default App;