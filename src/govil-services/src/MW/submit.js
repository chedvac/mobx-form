import request from 'utils/serviceRequest';

export default async function submit(data) {
  return request({
    url: 'http://gov.forms.local/MW/forms/Data/',
    methods: 'POST',
    data
  });
}

import rootStore from 'rootStore';

async function submit1() {
  await rootStore.validate();
  await beforeSubmit();
  await allUploadsCompleted();
  const data = {
    requestID: formParams.process.requestID,
    formData: rootStore.getStoreAsJSon(),
    attachments: filesManager.attachedFilesIds()
  };
  const response = await submit(data);
  return response;
}

function submitCallback() {}
