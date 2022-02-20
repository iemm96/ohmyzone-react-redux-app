import { actionTypes } from '../actionTypes/actionTypes';
export const authReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.login:
            return {
                name: action?.payload.name,
                isNew: action?.payload.isNew,
                uid: action?.payload.uid,
                token: action?.payload.token,
                plan: action?.payload.plan,
            }
        case actionTypes.logout:
            return { }
        default:
            return state;
    }
}