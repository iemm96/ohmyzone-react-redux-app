import { actionTypes } from '../actionTypes/actionTypes';

export const zoneReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateZone:
            return {
                title: action?.payload.title,
                premiumFeatures: action?.payload?.premiumFeatures,
                currentStatus: action?.payload.currentStatus,
                isCompleted: action?.payload.isCompleted,
                uid: action?.payload.uid,
                username: action?.payload.username,
                profileImage: action?.payload?.profileImage,
                backgroundImage: action?.payload?.backgroundImage,
                socialLinks: action?.payload?.socialLinks,
                links: action?.payload?.links,
            }
        case actionTypes.clearSelectedZone: 
            return { }
        default:
            return state;
    }
}