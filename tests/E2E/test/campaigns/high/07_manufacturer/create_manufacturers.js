const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');

const commonScenarios = require('../../common_scenarios/manufacturer');

scenario('Create "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');

  commonScenarios.createManufacturer();
  commonScenarios.checkManufacturerBO();
  commonScenarios.createManufacturerAddress();

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);
