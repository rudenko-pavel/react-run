## My joggings in REACT-app

# STEP 1:
##  preparation of project (Подготовка проекта)
	
1. console:
	npm create-react-app react-run
	cd react-run
	
## Подключаем библиотеки, используемые в проекте 
## зависимости можно увидеть в файле `package.json`
	npm i --save redux react-redux	
	npm i --save sass node-sass 			## css library, Node-sass is a library that provides binding for Node.js to LibSass
	npm i --save semantic-ui-css			## css library
	npm i --save axios@0.18.1				## Promise based HTTP client for the browser and node.js
    npm i --save redux-thunk
    npm start

# STEP 2 (create react side):

2. Delete all from `src`  					## обязательно в каждом проекте!!!
3. Create `src/index.js`: 					## обязательно в каждом проекте!!!
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';
    import './index.scss';
	import 'semantic-ui-css/semantic.min.css';

    ReactDOM.render(<App />, document.querySelector("#root"));

4. Create `src/index.scss`, `src/components/scss/App.scss`, `src/components/App.js`:     
	## обязательно в каждом проекте!!!!!
    import React from 'react';
    import './scss/App.scss';
    const App = () =>{
        return( <div>App</div> )
    };
    export default App;

# STEP 3 (work with react side components):
5. Create `src/components/JoggingsList/JoggingsList.scss`, `src/components/JoggingsList/JoggingsList.js`
    import React from 'react';
    import './JoggingsList.scss';

    class JoggingsList extends React.Component{
        render(){
            return (
                <div>Joggings List</div>
            )
        }
    }

    export default JoggingsList;

6. Edit `src/App.js`
    ## импортируем компонент `JoggingsList`
	## Импортироваться должны все компоненты 
    import JoggingsList from './JoggingsList/JoggingsList';
    ...
    // вставляем компонент в App-return
        <div>
            <JoggingsList />
        </div>

# STEP 4. Получаем данные в приложении Redux

7. Create `src/actions/index.js`:
    export const fetchJoggings = () => {
        return {
            type: 'FETCH_JOGGINGS'
        }
    };

8. Edit `src/components/JoggingsList/JoggingsList.js`:
	import React, { Component } from 'react';
	import { connect } from 'react-redux';
	import { fetchJoggings } from '../../actions';

    ## componentDidMount
	componentDidMount (){
		this.props.fetchJoggings();
	}
	
	## подключаем `connect()`:
	## первый аргумент - всегда функция `mapStateToProps` (или `null`)
	## второй аргумент  - `action Creator` 
	export default connect(null,{
		fetchJoggings: fetchJoggings
	})(JoggingsList);

9. Create `src/reducers/index.js`
	## если нет данных для передачи, мы все-равно должны что-то передавать.
	## Поэтому или убираем `import reducers from './reducers';` или добавлем `dummy reducers`:
    import { combineReducers } from 'redux';
	export default combineReducers({
		dummyKey: 'replaceMe'
	});

10. Edit  `src/index.js`:
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';
    import reducers from './reducers';
	
	ReactDOM.render(
		<Provider store={createStore(reducers)}>
			<App />
		</Provider>, 
		document.querySelector("#root")
	);

# STEP 4.1. ASYNC ACTION CREATORS
    ## получаем данные из JSON
11. Create configuration file with pre-configuration `src/apis/json.js`:
	## данные не меняются (константы)
	import axios from 'axios';

	export default axios.create({
		baseURL: '/'
	});

12. Edit `src/actions/index.js`:
	## добавляем API в наш `action Creator`:
	import jsonFakejson from '../apis/jsonFakejson';
    export const fetchJoggings = () => async dispatch =>{
        const responce = await jsonFakejson.get('/joggings.json');
        dispatch( {type: 'FETCH_JOGGINGS', payload: responce.data.joggings } )
    };

13. Edit `src/index.js`:
	import { createStore, applyMiddleware } from 'redux';
    import thunk from 'redux-thunk';

    const store = createStore(reducers, applyMiddleware(thunk));

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        document.querySelector("#root")
    );

# STEP 4.2. Redux Store Design
14. Create `src/reducers/joggingsReducer.js`
	export default () => {
		return 'replaceMe';
	}

15. Edit `src/reducers/index.js`
	## import
	import joggingsReducer from './joggingsReducer';
	...
	export default combineReducers({
		joggings: joggingsReducer
	});

16. Edit `src/reducers/joggingsReducer.js`
	## Switch Statements in Reducers:
	export default (state=[], action) => {
		switch (action.type){ // see to `src/actions/index.js`
			case 'FETCH_JOGGINGS':
				return action.payload;
			
			default: 
				return state;
		}
	}

17. Edit `src/components/JoggingsList/JoggingsList.js`:
	## dispatching correct values - получаем значения
	const mapStateToProps = (state) =>{ // see to `src/reducers/index.js`
		return { 
			joggings: state.joggings
		};
	}

	export default connect(mapStateToProps,{
		fetchJoggings: fetchJoggings
	})(JoggingsList);
	
	## просмотр переменной:
		...
	    render(){
			console.log ("render()",this.props.posts);
		...
	## список пробежек мы получили

18. Edit `src/components/JoggingsList/JoggingsList.js`:
	## вывод данных на экран
	## создаем функцию, которая перебирает элементы масасива, который мы получили в `this.props.joggings`
	## добавляем css:
	renderList(){
        return this.props.joggings.map(jogging =>{
            return (
                <div className="ui item" key={jogging.id} >
                    <i className="large middle  aligned icon user" />
                    <div className="content">
                        <div className="desciption">
                            <h4>{jogging.date}</h4>
                            <p>{jogging.distance}</p>
							<p>{jogging.time}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }
	
	## выводим на экран результат выполнения функции:
    render(){
        return( 
            <div className="ui relaxed divided list">
                {this.renderList()}
            </div>
        );
    }

19. add css

20. Edit `src/components/JoggingsList/JoggingsList.js`:
	## Добавляем функции вместо данных из JSON :
	timestampToDate(),secondsToFullTime()
	return (
        <tr key={jogging.id} className="one-item" >
            <td><p>{this.timestampToDate(jogging.date)}</p></td>
            <td><p>{jogging.distance}</p></td>
            <td><p>{this.secondsToFullTime(jogging.time)}</p></td>
        </tr>
    );

21. Edit `src/components/JoggingsList/JoggingsList.js`:
	## изменение отображения данных. Вначале - послейдние события:
	renderList(){
        const reverceJoggings = this.props.joggings.reverse();
        return reverceJoggings.map(jogging =>{
            return ( 
                <tr key={jogging.id} className="one-item" >
                    <td><p>{this.timestampToDate(jogging.date)}</p></td>
                    <td><p>{jogging.distance}</p></td>
                    <td><p>{this.secondsToFullTime(jogging.time)}</p></td>
                </tr>
            );
        });
    };

# STEP 5. Добавляем данные из второго JSON:





## ########################################################################## ##
## ########################################################################## ##
## ########################################################################## ##

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
