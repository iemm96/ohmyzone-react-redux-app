import { actionTypes } from '../actionTypes/actionTypes';

export const showModalPremium = (titleModalPremium?:string) => ({
    type: actionTypes.showModalPremium,
    payload: {
        titleModalPremium
    }
});

export const clearSelectedTheme = () => ({
    type: actionTypes.clearSelectedTheme
})