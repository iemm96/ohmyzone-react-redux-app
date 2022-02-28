import { actionTypes } from '../actionTypes/actionTypes';

export const updateTheme = ( data:any ) => ({
    type: actionTypes.updateTheme,
    payload: {
        data
    }
});

export const clearSelectedTheme = () => ({
    type: actionTypes.clearSelectedTheme
})