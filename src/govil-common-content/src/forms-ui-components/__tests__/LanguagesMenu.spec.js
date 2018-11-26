// import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
// import Enzyme, { shallow } from 'enzyme';
// import LanguagesMenu from 'govil-common-content/forms-ui-components/src/LanguagesMenu';
// import languageStore from 'govil-common-content/forms-business-components/src/language';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';

// Enzyme.configure({ adapter: new Adapter() });

// describe('<LanguagesMenu />', () => {
//   test('LanguagesMenu add language-item to every avaliable language', () => {
//     const wrapper = shallow(<LanguagesMenu languageStore={languageStore} />);
//     console.log(wrapper.debug());
//     expect(wrapper.find(ListItem)).toHaveLength(
//       languageStore.availableLanguagesList.length
//     );
//   });
// });
