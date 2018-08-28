import request from 'utils/serviceRequest';

async function asyncAction(settings) {
  try {
    return await request(settings.request);

    // settings.successCallback(res, settings.successCallbackData);
  } catch (error) {
    // settings.failedCallback(error, settings.failedCallbackData)
  }
}

export default asyncAction;
