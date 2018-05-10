const {AccessPageBO} = require('../../selectors/BO/access_page');
const {Installation} = require('../../selectors/BO/installation');
const {OnBoarding} = require('../../selectors/BO/onboarding.js');
const common_shop_parameters = require('../common_scenarios/shop_parameters');
const common_installation = require('../common_scenarios/common_installation');

scenario('Open all menu links in the Back Office', () => {
  scenario('Open the browser', client => {
    test('should open the browser', () => client.open());
  }, 'common_client');

  if (global.install_shop) {
    scenario('Connect installation interface', client => {
      test('should go to install page ', () => client.localhost(URL));
    }, 'common_client');
    common_installation.prestaShopInstall(Installation, install_language, install_country);
    scenario('Login in the Back Office', client => {
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
      test('should close the onboarding modal if exist', () => {
        return promise
          .then(() => client.pause(4000))
          .then(() => client.isVisible(OnBoarding.welcome_modal))
          .then(() => client.closeBoarding(OnBoarding.popup_close_button));
      });
    }, 'common_client');
  }

  scenario('Login in the Back Office, get the shop version and create GUI version folder', client => {
    test('should get the shop version', () => client.getTheShopVersion());
    test('should create new GUI folder of the current version', () => client.createNewGuiVersionFolder());
    if (global.compareVersion === "") {
      test('should get the last archived version', () => client.getThelastArchivedVersion());
    }
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  common_shop_parameters.openAllMenuLinkBO('takescreenshot');
  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
