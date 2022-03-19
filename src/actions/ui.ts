import { actionTypes } from '../actionTypes/actionTypes';

export const showModalPremium = (titleModalPremium?:string) => ({
    type: actionTypes.showModalPremium,
    payload: {
        titleModalPremium
    }
});

export const showPublishZoneBar = (show:boolean) => ({
    type: actionTypes.showPublishZoneBar,
    payload: {
        showPublishZoneBar: show
    }
});

export const clearSelectedTheme = () => ({
    type: actionTypes.clearSelectedTheme
})