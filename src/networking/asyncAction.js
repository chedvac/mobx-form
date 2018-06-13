import request from './axiosWrapper';

async function asyncAction(settings) {
        try {
            const res = await request(settings.request);
            settings.successCallback(res, settings.successCallbackData);
        } catch (error) {
            settings.failedCallback(error, settings.failedCallbackData)
        }
    }

    export default asyncAction