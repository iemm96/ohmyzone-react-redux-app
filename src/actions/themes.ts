import { actionTypes } from '../actionTypes/actionTypes';

export const updateTheme = ( primaryMain:string, secondaryMain:string ) => ({
    type: actionTypes.updateTheme,
    payload: {
        primaryMain,
        secondaryMain
    }
});