import request from './axiosWrapper';
import {defaultBehavior} from './MWResponse';
import qs from 'qs';

const endpointsUrl = {
    submit: 'http://gov.forms.local/MW/forms/Data/',
    saveAsPdf: ''
}

export const MWRequest = function(action, data){
    return request({url: endpointsUrl[action], method: 'POST', data:data || qs.stringify({})});
}
export default function(settings = {}){
    return MWRequest(settings.action, settings.data).then((response)=>{
        defaultBehavior(response.data, settings);
        return response;
    });
}