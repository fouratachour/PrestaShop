const {AccessPageBO} = require('../../../selectors/BO/access_page');

const common = require('../../common_scenarios/shop_parameters');

scenario('Open all menu links in the Back Office', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  common.openAllMenuLinkBO('');

}, 'common_client');
