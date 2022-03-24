import { actionTypes } from '../actionTypes/actionTypes';

export const themeReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateTheme:
            return {
                vibrant: action?.payload?.data.vibrant,
                lightVibrant: action?.payload?.data.lightVibrant,
                darkVibrant: action?.payload?.data.darkVibrant,
                muted: action?.payload?.data.muted,
                lightMuted: action?.payload?.data.lightMuted,
                darkMuted: action?.payload?.data.darkMuted,
                backgroundImageUrl: action?.payload?.data.backgroundImageUrl,
                mode:  action?.payload?.data.mode
            }
        case actionTypes.clearSelectedTheme:
            return { }
        default:
            return state;
    }
}