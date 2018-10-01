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

  scenario('check the created "Brands" address number', client => {
    test('should search for the "branch" Name', () => client.waitAndSetValue(Brands.brand_search_panel, "PrestaShop" + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(Brands.search_button));
    test('should check the search result', () => client.checkTextValue(Brands.search_result, "PrestaShop" + date_time, "equal"));
    test('should check the address number', () => client.checkTextValue(Brands.address_result, "1"));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_search));
  }, 'manufacturers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);
