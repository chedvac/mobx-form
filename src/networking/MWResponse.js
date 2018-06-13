import request from './axiosWrapper'
import qs from 'qs';

let statusCodeRes = '0';
export const isSuccededResponse = function (response) {
    return response.hasOwnProperty('statusCode') && response.statusCode.toString() === statusCodeRes.toString();
};
const getMessageByLanguage = function (response) {
    if (!response || !response.responseMessages || typeof response.responseMessages !== 'object') {
        // dialog.alert({ message: resourceFetcher.get(indicatorsTexts.errors).callServiceError });
        // formExceptions.throwFormError('call MWErrorMessages.getMessageByLanguage fail because response.responseMessages is undefined');
    }
    return 'הטופס נשלח בהצלחה' //response.responseMessages['hebrew'];
};
const showMessage = function (response) {
    const message = getMessageByLanguage(response);
    // dialog.alert({ message: message });
};
export const defaultBehavior = function (response, settings) {
    const {callback, fcallback, callbackData} = settings;
    if (isSuccededResponse(response)) {
        return;
    }
    showMessage(response);
};
