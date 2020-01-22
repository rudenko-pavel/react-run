import myJson from '../apis/json';

// for JoggingsList
export const fetchJoggings = () => async dispatch =>{
    // const responce = await jsonFakejson.post(''); /joggings.json
    const responce = await myJson.get('/joggings.json'); 
    console.log("responce: ",responce);
    dispatch( {type: 'FETCH_JOGGINGS', payload: responce.data.joggings     } )
};