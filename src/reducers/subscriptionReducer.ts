import { actionTypes } from '../actionTypes/actionTypes';

export const subscriptionReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateSubscription:
            return {
                uid: action?.payload._id,
                activeUntil: action?.payload.activeUntil,
                isExpired: action?.payload.isExpired
            }
        case actionTypes.clearSubscription: 
            return { }
        default:
            return state;
    }
}