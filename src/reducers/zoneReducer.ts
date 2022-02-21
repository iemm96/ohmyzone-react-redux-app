import { actionTypes } from '../actionTypes/actionTypes';

export const zoneReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateZone:
            return {
                title: action?.payload.title,
                isPublished: action?.payload.isPublished,
                isCompleted: action?.payload.isCompleted,
                uid: action?.payload.uid,
                username: action?.payload.username,
                profileImage: action?.payload?.profileImage,
            }
        default:
            return state;
    }
}