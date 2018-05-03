const {AccessPageBO} = require('../../selectors/BO/access_page');
const common = require('../common_scenarios/shop_parameters');

scenario('Open all menu links in the Back Office', () => {

  if (global.gui === "takescreenshot") {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'common_client');

    common.openAllMenuLinkBO('takescreenshot');

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'common_client');

    scenario('Login in the Back Office', client => {
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO, global.oldurl));
    }, 'common_client');

    common.openAllMenuLinkBO('compare');

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'common_client')

  } else if (global.gui === "compare") {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'common_client');

    common.openAllMenuLinkBO('compare');

    scenario('Logout from the Back Office', client => {
      test('should logout successfully from Back Office', () => client.signOutBO());
    }, 'common_client')
  }
}, 'common_client');
