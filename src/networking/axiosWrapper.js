import axios from 'axios';

const messages = {
    missinggRequiredParams: 'URL and method (GET/POST) parameters are mandatory',
};

const validMethod = function (method) {
    return ['GET', 'POST'].includes(method);
};

const checkRequiredParams = function (settings) {    
    return (typeof settings === 'object' && 'url' in settings && validMethod(settings['method']));
};

const request = function (settings) {

    if (!checkRequiredParams(settings)) {
        throw new Error(messages.missinggRequiredParams);
    }

    return axios(settings)
        // .catch(function (error) {
        //     error.url = settings.url;
        //     error.method = settings.method;
        //     throw error;
        // });

};

export default request ;