import { postRecord } from './postRecord';
import { actionTypes } from '../actionTypes/actionTypes';
export const startCreateZone = ( payload:any ) => {

    return( async (dispatch:any)  => {
        const { zone } = await postRecord( 'zones', payload );

        dispatch( createZone( zone.title, zone.isCompleted, zone.isPublished, zone.uid ) );
        
        return zone;
    })

}

export const createZone = ( title:string, isCompleted:boolean, isPublished:boolean, uid:string ) => ({
    type: actionTypes.createZone,
    payload: {
        title,
        isCompleted,
        isPublished,
        uid,
    }
});