const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const commonScenarios = require('../../common_scenarios/manufacturer');
let promise = Promise.resolve();


scenario('Edit "Brand" - "Brand address"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');

  commonScenarios.createManufacturer();

  scenario('Update the created "Brand"', client => {
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should search for the "branch" Name', () => client.waitAndSetValue(Brands.brand_search_panel, "PrestaShop" + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(Brands.search_button));
    test('should check the search result', () => client.checkTextValue(Brands.search_result, "PrestaShop" + date_time, "equal"));
    test('should click on "Edit" button', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(Brands.dropdown_btn))
        .then(() => client.waitForVisibleAndClick(Brands.edit_btn));
    });
    test('should set the "Short Description" input', () => client.setEditorText(Brands.short_description_input, 'short description Update'));
    test('should set the "Description" input', () => client.setEditorText(Brands.description_input, 'description Update'));
    test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
  }, 'manufacturers');

  scenario('check the updated "Brand" in the Front Office', client => {
    test('should click on "View my shop" button', () => {
      return promise
        .then(() => client.pause(4000))
        .then(() => client.waitForVisibleAndClick(AccessPageBO.shopname));
    });
    test('should switch to the new window', () => client.switchWindow(1));
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the language of shop to "English"', () => client.changeLanguage());
    test('should click on "Sitemap" button', () => client.waitForExistAndClick(AccessPageFO.site_map_button));
    test('should click on the Brand list', () => client.waitForExistAndClick(AccessPageFO.brand_list_button));
    test('should click on the created Brand link', () => client.waitForExistAndClick(AccessPageFO.created_brand.replace('%NAME', "PrestaShop" + date_time)));
    test('should check the updated short description', () => client.checkTextValue(AccessPageFO.brand_short_description, 'short description Update'));
    test('should check the updated description', () => client.checkTextValue(AccessPageFO.brand_description, 'description Update'));
  }, 'manufacturers');

  scenario('Logout from the Front Office', client => {
    test('should logout successfully from Front Office', () => client.signOutFO(AccessPageFO));
  }, 'manufacturers');

}, 'manufacturers', true);