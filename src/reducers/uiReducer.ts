import { actionTypes } from '../actionTypes/actionTypes';

export const uiReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.showModalPremium:
            return {
                modalPremium: true,
                titleModalPremium: action?.payload.titleModalPremium
            }
        case actionTypes.clearSelectedZone: 
            return { }
        default:
            return state;
    }
}