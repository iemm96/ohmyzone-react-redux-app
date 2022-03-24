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
});

export const showPreviewButton = (show:boolean) => ({
    type: actionTypes.showPreviewButton,
    payload: {
        showPreviewButton: show
    }
});