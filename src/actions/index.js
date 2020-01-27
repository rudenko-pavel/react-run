import myJson from '../apis/json';
import _ from 'lodash';

// for JoggingsList
export const fetchJoggings = () => async dispatch =>{
    // const responce = await jsonFakejson.post(''); /joggings.json
    const responce = await myJson.get('/joggings.json'); 
    console.log("responce: ",responce);
    dispatch( {type: 'FETCH_JOGGINGS', payload: responce.data.joggings     } )
};

const _fetchCity = _.memoize(async(id, dispatch) => {
    const responce = await myJson.get(`/cities.json`);
    const el = responce.data.cities.find((el) => el.id === id);
    dispatch ( { type: 'FETCH_CITY', payload: el} )
});

export const fetchCity = (id) => dispatch =>{
    _fetchCity(id, dispatch);
}


// for HeaderMenu
export const fetchHeaderMenu = () => async dispatch =>{
	const responce = await myJson.get('/headermenu.json');
	dispatch( {type: 'FETCH_HEADERMENU', payload: responce.data.headermenu } )
};