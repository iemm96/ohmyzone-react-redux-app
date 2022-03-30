import { actionTypes } from '../actionTypes/actionTypes';

export const planReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updatePlan:
            return {
                name: action?.payload.name,
                isPremium:  action?.payload.isPremium,
                maxZones: action?.payload.maxZones,
                maxLinksPerZone: action?.payload.maxLinksPerZone,
                maxThemesPerZone: action?.payload.maxThemesPerZone,
                maxNumberOfSelectableThemes: action?.payload.maxNumberOfSelectableThemes,
                themeCreator: action?.payload.themeCreator,
                
            }
        case actionTypes.clearPlan: 
            return { }
        default:
            return state;
    }
}