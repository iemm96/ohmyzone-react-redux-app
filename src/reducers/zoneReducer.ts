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
                profileImageUid: action?.payload?.profileImageUid,
                backgroundImage: action?.payload?.backgroundImage,
                socialLinks: action?.payload?.socialLinks,
                links: action?.payload?.links,
                linksCounter: action?.payload?.linksCounter,
                themesCounter: action?.payload?.themesCounter
            }
        case actionTypes.clearSelectedZone: 
            return { }
        default:
            return state;
    }
}