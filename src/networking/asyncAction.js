import request from '../utils/axiosWrapper';

async function asyncAction(settings) {
  try {
    return await request(settings.request);

    // settings.successCallback(res, settings.successCallbackData);
  } catch (error) {
    // settings.failedCallback(error, settings.failedCallbackData)
  }
}

export default asyncAction;
