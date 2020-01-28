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

9. Create `src/reducers/index.js`:
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
	import myJson from '../apis/json';
    export const fetchJoggings = () => async dispatch =>{
        const responce = await myJson.get('/joggings.json');
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
	## изменение отображения данных. Вначале - последние события:
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

## **************************************************************************************************** ##
   *** CHECKPOINT #1: *** 
## **************************************************************************************************** ##

# STEP 5. Добавляем данные из второго JSON:

	## извлечение данных из второго JSON по ключу в первом   
	## (1: [{id:1, cityId:1}])
	## (2: [{"id": 1, "name": "Kyiv"},{"id": 2, "name": "Chisinau"}) 

22. Add `public/json/cities.json`:
    {
        "cities" : [
            {"id": 1, "name": "Kyiv"},
            {"id": 2, "name": "Chisinau"},
            {"id": 3, "name": "Sumy"},
            {"id": 4, "name": "Poltava"}
        ]
    }

23. Edit `public/json/joggings.json`
    ## добавляем поле `cityId`:
    ...
    {"id": 1,   "cityId": 1,  "date":"1506891600", "distance":2260, ... },
    {"id": 2,   "cityId": 1,  "date":"1507064400", "distance":5250, ... } 
    ...
24. Edit `src/components/JoggingsList/JoggingsList.js`
    ## Добавляем новое поле `cityId` в `render()`:
    <tr key={jogging.id} className="one-item" >
        ...
        <td><p>{jogging.cityId}</p></td>
    </tr>

	## Для отображения названия города (данные из второго JSON), создаем компонент `RunCity` 
25. Create `src/components/RunCity/RunCity.js`, `src/components/RunCity/RunCity.scss` 
	import React, { Component } from 'react';
	import './RunCity.scss';

	class RunCity extends Component{
		render(){
			return (
				<div className="header">
					RunCity
				</div>
			)
		}
	}

	export default RunCity;

26. Edit `src/components/JoggingsList/JoggingsList.js`
	## в компонент `RunCity` будем передавать `cityId` в виде `props`. 
    <tr key={jogging.id} className="one-item" >
        ...
        <td><RunCity cityId={jogging.cityId} /></td>
    </tr>

27. Edit `src/components/JoggingsList/JoggingsList.js`:
	## import
	import RunCity from '../RunCity/RunCity';

28. Edit `src/actions/index.js`:
    ## Add new action:
	export const fetchCity = id => async dispatch => {
		const responce = await myJson.get(`/cities.json`);
		const el = responce.data.cities.find((el) => el.id === id);

		dispatch ( { type: 'FETCH_CITY', payload: el} )
	};

29. Edit `src/components/RunCity/RunCity.js`:
	## функция connect() создает для нас компонент.
	import { connect } from 'react-redux';
	import { fetchCity } from '../../actions';
	...
	## where function `mapStateToProps()` not created, call `null`
	export default connect (null, {fetchCity})(RunCity);

30. Edit `src/components/RunCity/RunCity.js`:
	## componentDidMount
    componentDidMount(){
        this.props.fetchCity(this.props.cityId);
    }
	## теперь, когда наш компонент `RunCity` отображается на экране, мы можем вызывать `action Creator`

31. Create `src/reducers/citiesReducer.js`:
	## - Create `Reducer`. 
	## ***** DEFAULT SYNTAXIS ***** 
	export default (state=[], action) =>{
		switch (action.type){ // see to `src/actions/index.js`
			case 'FETCH_CITY':
				return [...state,action.payload];
			default: 
				return state;
		}
	};

32. Edit `src/reducers/index.js`:
	## import
	import citiesReducer from './citiesReducer';
	...
	export default combineReducers({ 
		joggings: joggingsReducer,
		cities: citiesReducer		// add this string
	});

33. Edit `src/components/RunCity/RunCity.js`:
	## добавляем функцию `mapStateToProps`
	## функция `mapStateToProps` - функция, которая возвращает либо обычный объект, либо другую функцию 
	## функция `mapStateToProps` будет вызываться каждый раз, когда состояние хранилища изменяется.
	## Функция `mapStateToProps` объявляется с двумя параметрами, второй из которых является необязательным. 
	## Первый параметр представляет собой текущее состояние хранилища Redux. 
	## Второй параметр, если его передают, представляет собой объект свойств, переданных компоненту
	
	const mapStateToProps = (state) =>{
		return {cities: state.cities}
	};
		
	export default connect (mapStateToProps, {fetchCity})(RunCity);

34. Edit `src/components/RunCity/RunCity.js` в `render()`:	
	## возвращаем имя (`name`) из объекта, в котором `id`== props.cityId
    const city = this.props.cities.find((city) => city.id === this.props.cityId);
    if (!city){ return null; }
	return ( <div className="header">{city.name}</div> )


## **************************************************************************************************** ##

	## Название города (и остальные поля из второго JSON) мы получили. Но есть вопрос к производительности.
	## При отрисовке каждого поста, идет запрос на название города.  (вызов `render` в `RunCity.js`)
	## Т.е. при отображении 100 постов, мы 100 раз отправляем запрос на получение имени  (XHR-request - see to console)
	## если городов - 100, уменьшить количество запросов не получится, а если городов - 10, это делать необходимо. 
	
	## Для уменьшения количества запросов - переносим логику в `mapStateToProps` (Extracting Logic to MapStateToProps):

35. Edit `src/components/RunCity/RunCity.js`:
	## переносим функцию фильтра из `render` в `mapSteteToProps`:
        
	// const user = this.props.users.find((user) => user.id === this.props.userId);
	if (!user){ return null;}	
	...
	
	const mapStateToProps = (state, ownProps) =>{				// не окончательный код
		return {cities: state.cities.find((city) => city.id === this.props.cityId)}
	};

	## Но `this.props.cityId` не относится к общему `state`. Это переменная из компонента
	## Поэтому, как второй аргумент, вносим в функцию `mapStateToProps` собственное состояние (доступное в Компоненте `RunCity` ): 
	const mapStateToProps = (state, ownProps) =>{
		## вместо `cities` - `city` , поскольку выдаем одного пользователя по фильтру
		return {city: state.cities.find((city) => city.id === ownProps.cityId)}
	};

	## изменения в `render`:
	render(){
		const { city } = 	this.props;


## **************************************************************************************************** ##

	## Уменьшение количества запросов - это устранение дублирующих запросов
	## т.е., если данные про город с sityId=5 мы получили, то второй,... раз про этот город мы данные не запрашиваем

	## ******* SOLUTION  start ***************
	## Memoizing Functions
	## `memoize` - Возвращает функцию, которая кэширует результаты своего выполнения, и не выполняется, если результат есть в кэше.

36. console `npm install --save lodash`
	## - Lodash - это библиотека, с набором полезных функций, для работы с данными, для конвертирования их из одного формата в другой, фильтрации, маппинга и других вещей.

37. Edit `src/actions/index.js`:
	## import библиотеки:
	import _ from 'lodash';	

38. Edit `src/actions/index.js`:
	## `memoize` нашего `action creator` (fetchUser):
	
	## Создаем функцию `_fetchUser` с использованием функции `memoize`
	## `_fetchUser` - `_...` говорит о том, что функция является `private` 
	## переносим в нее содержимое функции `fetchUser`: 
	const _fetchCity = _.memoize(async(id, dispatch) => {
		const responce = await myJson.get(`/cities.json`);
		const el = responce.data.cities.find((el) => el.id === id);
		dispatch ( { type: 'FETCH_CITY', payload: el} )
	});
	
	## а в фнкции `fetchUser` использум memoize-версию функции `_fetchUser` (без дублирущих записей)
	export const fetchCity = (id) => dispatch =>{
		_fetchCity(id, dispatch);
	}
	## ******* SOLUTION  end ***************	

## **************************************************************************************************** ##
   *** CHECKPOINT #2: *** 
## **************************************************************************************************** ##

# STEP 6. Добавляем рероутинг:
39. console
	## добавляем библиотеку в зависимости:
	npm install --save react-router-dom

7. Edit `src/components/App.js`:
	## import
	import { BrowserRouter, Route } from 'react-router-dom';

## создаем компонент `HeaderMenu`:
8. Create `src/components/HeaderMenu/HeaderMenu.scss`, `src/components/HeaderMenu/HeaderMenu.js`
	import React, { Component } from 'react';
	import './HeaderMenu.scss';
	class HeaderMenu extends Component{
		render(){
			return( 
				<div className = "HeaderMenu">
					Header Menu
				</div>
			);
		}
	}
	export default HeaderMenu;

9. Create `src/components/Strava/Strava.scss`, `src/components/Strava/Strava.js`
		import React, { Component } from 'react';
		import './Strava.scss';

		class Strava extends Component{
			render(){
				return( 
					<div className = "Strava">
						Strava
					</div>
				);
			}
		}
		export default Strava;

11. Edit `src/component/App.js`:
	## Импортируем созданные компоненты:
	import Strava from './Strava/Strava';
	import HeaderMenu from './HeaderMenu/HeaderMenu';

12. Edit `src/component/App.js`:
	## добавляем экземпляр BrowserRouter:
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

13. Edit `src/components/HeaderMenu/HeaderMenu.js`:
		## add css:
		render(){
			return( 
				<div className="row">
					<div className = "column HeaderMenu">
						<div className="ui buttons">
							<a href="/" className = "ui button">joggings</a>
							<a href="/strava" className = "ui button">strava</a>
						</div>
					</div>
				</div>
			);
		}

14. Edit `src/component/HeaderMenu/HeaderMenu.js`:
	## import `Link`
	import { Link } from 'react-router-dom';

15. Edit `src/components/HeaderMenu/HeaderMenu.js`:
	## меняем тег `<a>` на тег `<Link>`
    <Link  to="/" className = "ui basic blue button">joggings</Link >
    <Link  to="/strava" className = "ui basic blue button">strava</Link >

## **************************************************************************************************** ##
   *** CHECKPOINT #3: *** 
## **************************************************************************************************** ##


## создаем компонент `About` (отдельная страница):
16. Create `src/components/About/About.scss`, `src/components/About/About.js`
	import React, { Component } from 'react';
	import './About.scss';
	class About extends Component{
		render(){
			return( 
				<div className = "About">
					About
				</div>
			);
		}
	}
	export default About;

## ***************** Change menu according to the rules REDUX Cycle ************************* ##
	## Action Creator - to change state of our app
	## Action 
	## dispatch 
	## Middleware 
	## Reducers 
	## State 

16. Create `public/json/headermenu.json`
	## create file with data (menu items):
	{
		"headermenu" : [
			{"id": 1, "name": "about", 		"link": "/"},
			{"id": 2, "name": "joggings", 	"link": "/joggings"},
			{"id": 3, "name": "strava", 	"link": "/strava"}
		]
	}

17. Edit `src/actions/index.js`
## `Action creator` + `Action`:
export const fetchHeaderMenu = () => async dispatch =>{
	const responce = await myJson.get('/headermenu.json');
	dispatch( {type: 'FETCH_HEADERMENU', payload: responce.data.headermenu } )
};

18. Create `src/reducers/headermenuReducer.js`
	export default () => {
		return 'replaceMe';
	}

19. Edit `src/reducers/index.js`
	## import
	import headermenuReducer from './headermenuReducer';
	...
	export default combineReducers({
		headermenu: headermenuReducer
	});

20. Edit `src/reducers/headermenuReducer.js`
	## Switch Statements in Reducers:
	export default (state=[], action) => {
		switch (action.type){ // see to `src/actions/index.js`
			case 'FETCH_HEADERMENU':
				return action.payload;
			
			default: 
				return state;
		}
	}

21. Edit `src/components/HeaderMenu/HeaderMenu.js`:
	## функция connect() создает для нас компонент. 
	import { fetchHeaderMenu } from '../../actions';
	import { connect } from 'react-redux';
	...
	componentDidMount (){
		this.props.fetchHeaderMenu();
    };
	...
	## dispatching correct values - получаем значения
	const mapStateToProps = (state) =>{ // see to `src/reducers/index.js`
		return { 
			headermenu: state.headermenu
		};
	}

	export default connect(mapStateToProps,{
		fetchHeaderMenu: fetchHeaderMenu 		// see to `src/actions/index.js`
	})(HeaderMenu);
	
	## список кнопочек мы получили
	render(){
		// console.log("HeaderMenu(fetchHeaderMenu)", this.props.headermenu);

22. Edit `src/components/HeaderMenu/HeaderMenu.js`:
	## вывод данных на экран
	## создаем функцию, которая перебирает элементы масасива, который мы получили в `this.props.menuitems`
	## добавляем css: 
    renderList(){
        return this.props.headermenu.map(headermenu =>{
            return (
                <Link to={headermenu.link} className = "ui button" key={headermenu.id}>
                    {headermenu.name}
                </Link>
            );
        });
    }

	## выводим на экран результат выполнения функции:
    return( 
        <div className="row">
            <div className = "column HeaderMenu">
                <div className="ui basic buttons">
                    {this.renderList()}
                </div>
            </div>
        </div>
    );

23. Edit `src/App.js`:
	## добавляем ссылку на новый компонент
	import About from './About/About';
	...
	<BrowserRouter>
		<div>
            <HeaderMenu />
			<Route path="/" exact 		component={About} />
			<Route path="/joggings"  	component={JoggingsList} />
			<Route path="/strava"  		component={Strava} />
		</div>
	</BrowserRouter>

## **************************************************************************************************** ##
   *** Change menu according to the rules REDUX Cycle *** 
## **************************************************************************************************** ##

## add `selectedItemMenu`:  

24. Edit `src/actions/index.js` (Action creator): 
	export const selectItemMenu = id => {
	  return {
		// Return an action
		type: "ITEMMENU_SELECTED",
		payload: id
	  };
	};

25. Create `src/reducers/menuselectedReducer.js`:     
	## возможные варианты `action.type` берутся из `src/actions/index.js`
	export default (selectedItem = 1, action) => {
		switch (action.type) {
			// see to `src/actions/index.js`
			case "ITEMMENU_SELECTED":
			return action.payload;
			default:
			return selectedItem;
		}
	};

26. Edit `src/reducers/index.js`:
	import menuselectedReducer from "./menuselectedReducer";
	...
	export default combineReducers({
		menuitems: menuitemsReducer, 
		menuselected: menuselectedReducer			// add thsis string
	});

27. Add to `src/component/HeaderMenu.js`:
	import { fetchHeaderMenu, selectItemMenu } from "../../actions";
	...
	export default connect(mapStateToProps, {fetchHeaderMenu, selectItemMenu})(HeaderMenu);

28. Edit `src/component/HeaderMenu.js`:
	renderList() {
		let currentItemMenu = "";
		return this.props.headermenu.map(headermenu => {
		// eslint-disable-next-line no-unused-expressions
		headermenu.id === this.props.menuselected
			? (currentItemMenu = "blue basic")
			: (currentItemMenu = "");
		return (
			<Link
			to={headermenu.link}
			className={`ui button ${currentItemMenu}`}
			key={headermenu.id}
			onClick={() => this.props.selectItemMenu(headermenu.id)}
			>
			{headermenu.name}
			</Link>
		);
		});
	}

## **************************************************************************************************** ##
   *** Add `selectItem` to HeaderMenu *** 
## **************************************************************************************************** ##