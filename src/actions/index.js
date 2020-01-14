import dataJSON from '../apis/dataJSON';

export const fetchJoggings = () => async dispatch =>{
    const responce = await dataJSON.get('/joggings');
    dispatch( {type: 'FETCH_JOGGING', payload: responce.data } )
};
