import { actionTypes } from '../actionTypes/actionTypes';

export const subscriptionReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateSubscription:
            return {
                current: action?.payload.current,
                activeUntil: action?.payload.activeUntil,
            }
        case actionTypes.clearSubscription: 
            return { }
        default:
            return state;
    }
}