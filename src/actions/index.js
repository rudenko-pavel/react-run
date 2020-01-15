import dataJSON from '../apis/dataJSON';

export const fetchJoggings = () => async dispatch =>{
    const responce = await dataJSON.get('/db.json');
    dispatch( {type: 'FETCH_JOGGING', payload: responce.data } )
};