import { actionTypes } from '../actionTypes/actionTypes';

export const themeReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateTheme:
            return {
                primaryMain: action?.payload?.data.vibrant,
                secondaryMain: action?.payload?.data.lightMuted,
                background: action?.payload?.data.darkMuted,
                paper: action?.payload?.data.muted,
                card: action?.payload?.data.darkVibrant
            }
        default:
            return state;
    }
}