import { actionTypes } from '../actionTypes/actionTypes';
export const authReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.login:
            return {
                name: action?.payload.name,
                token: action?.payload.token
            }
        case actionTypes.logout:
            return { }
        default:
            return state;
    }
}