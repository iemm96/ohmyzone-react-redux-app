import { postRecord } from './postRecord';
import { actionTypes } from '../actionTypes/actionTypes';
import { updateRecord } from './updateRecord';

export const startupdateZone = ( payload:any ) => {

    return( async (dispatch:any)  => {
        const { zone } = await postRecord( 'zones', payload );

        dispatch( updateZone({ ...zone }) );
        
        return zone;
    });

}

export const startUpdateZone = ( payload:any, uid:string ) => {
    return( async (dispatch:any)  => {
        const { zoneResult } = await updateRecord( 'zones', payload, uid );
    
        dispatch( updateZone( { ...zoneResult, profileImage: zoneResult.profileImage.url } ) );
        
        return zoneResult;
    });
}

export const updateZone = ( payload:any ) => ({
    type: actionTypes.updateZone,
    payload
});

export const clearSelectedZone = () => ({
    type: actionTypes.clearSelectedZone, 
})
