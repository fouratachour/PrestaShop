const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../../selectors/BO/catalogpage/Manufacturers/brands_address');
const commonScenarios = require('../../common_scenarios/manufacturer');
let promise = Promise.resolve();

scenario('Create, edit and delete "Brand address"', () => {
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

  scenario('Edit the created "Brand address"', client => {
    test('should set the brand name in the search input', () => client.waitAndSetValue(BrandAddress.brand_address_filter_input, 'PrestaShop' + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(BrandAddress.search_button));
    test('should click on "Edit" button', () => client.waitForExistAndClick(BrandAddress.edit_btn));
    test('should set the "Address" input', () => client.waitAndSetValue(BrandAddress.address_input, "18 rue d'amesterdam"));
    test('should set the "City" input', () => client.waitAndSetValue(BrandAddress.city_input, "new york"));
    test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
  }, 'manufacturers');

  scenario('Check the Updated "Brand address"', client => {
    test('should set the brand name in the search input', () => client.waitAndSetValue(BrandAddress.brand_address_filter_input, 'PrestaShop' + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(BrandAddress.search_button));
    test('should check that the City was updated', () => client.checkTextValue(BrandAddress.city_column, "new york", "equal"));
    test('should click on "Reset" button', () => client.waitForExistAndClick(BrandAddress.reset_search));
  }, 'manufacturers');

  scenario('Delete the created "Brand address"', client => {
    test('should set the brand name in the search input', () => client.waitAndSetValue(BrandAddress.brand_address_filter_input, 'PrestaShop' + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(BrandAddress.search_button));
    test('should click on "Delete" button', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(BrandAddress.dropdown_address))
        .then(() => client.waitForVisibleAndClick(BrandAddress.delete_btn))
        .then(() => client.alertAccept());
    });
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
  }, 'manufacturers');

  scenario('check the created "Brands" address number', client => {
    test('should search for the "branch" Name', () => client.waitAndSetValue(Brands.brand_search_panel, "PrestaShop" + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(Brands.search_button));
    test('should check the search result', () => client.checkTextValue(Brands.search_result, "PrestaShop" + date_time, "equal"));
    test('should check the address number', () => client.checkTextValue(Brands.address_result, "--"));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_search));
  }, 'manufacturers');

  scenario('Logout from the Back Office', client => {
    test('should logout successfully from Back Office', () => client.signOutBO());
  }, 'manufacturers')

}, 'manufacturers', true);
