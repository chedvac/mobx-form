import assertParametersType from 'utils/typeVerifications';
import PropTypes from 'prop-types';
import { getList } from 'govil-services/govServiceList/listProvider';

export const getList2 = assertParametersType(
  {
    settings: PropTypes.shape({
      listName: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  },
  async function getList2(settings) {
    const { listName, code, value } = settings;
    try {
      const response = await getList({ listName });
      const listResult = response.data.Data.List.map(item => ({
        value: item[code],
        label: item[value]
      }));
      return listResult;
    } catch (error) {
      console.log(error);
    }
  }
);
