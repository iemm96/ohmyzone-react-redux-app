import { actionTypes } from '../actionTypes/actionTypes';

export const themeReducer = ( state = { } , action:any ) => {
    switch( action.type ) {
        case actionTypes.updateTheme:
            return {
                primaryMain: action?.payload.primaryMain,
                secondaryMain: action?.payload.secondaryMain,
            }
        default:
            return state;
    }
}