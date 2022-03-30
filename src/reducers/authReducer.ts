import { actionTypes } from '../actionTypes/actionTypes';
export const authReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.login:
            return {
                name: action?.payload.name,
                zonesCounter: action?.payload.zonesCounter,
                uid: action?.payload.uid,
                token: action?.payload.token,
                img: action?.payload.img,
            }
        case actionTypes.logout:
            return { }
        default:
            return state;
    }
}