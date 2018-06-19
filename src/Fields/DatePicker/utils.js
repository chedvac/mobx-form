import * as moment from 'moment'

export const formatDate = (date,format)=> {
    return moment(date).locale('he').format(format);
};
export const parseDate = (str,format)=> {
    const date = moment(str, format, 'he', true);
    if (date.isValid()) {
      return date.toDate();
    }
    return undefined;
};