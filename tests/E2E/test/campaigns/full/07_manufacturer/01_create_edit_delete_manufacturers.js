const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {Brands} = require('../../../selectors/BO/catalogpage/Manufacturers/brands');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const commonScenarios = require('../../common_scenarios/manufacturer');
const common_scenarios = require('../../common_scenarios/product');
let promise = Promise.resolve();

let productData = {
  name: 'brand',
  quantity: "10",
  price: '5',
  image_name: 'image_test.jpg',
  reference: 'test_1',
  brand: {
    brandName: "PrestaShop"
  }
};

scenario('Create, edit and delete "Brand"', () => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'manufacturers');

  commonScenarios.createManufacturer();
  commonScenarios.checkManufacturerBO();

  scenario('check the created "Brand" in the Front Office', client => {
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
    test('should check the updated short description', () => client.checkTextValue(AccessPageFO.brand_short_description, 'short description'));
    test('should check the updated description', () => client.checkTextValue(AccessPageFO.brand_description, 'description'));
  }, 'manufacturers');

  scenario('Create product with the created "brand"', client => {
    test('should switch to the Back office', () => client.switchWindow(0));
    common_scenarios.createProduct(AddProductPage, productData);
  }, 'manufacturers');

  scenario('Check the created product in the Front office', client => {
    test('should switch to the Front office', () => client.switchWindow(1));
    test('should check the updated description', () => client.isVisible(AccessPageFO.brand_product.replace('%NAME', 'brand' + date_time)));
  }, 'manufacturers');

  scenario('Update the created "Brand"', client => {
    test('should switch to the Back office', () => client.switchWindow(0));
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
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_search))
  }, 'manufacturers');

  scenario('check the updated "Brand" in the Front Office', client => {
    test('should switch to the Front office', () => client.switchWindow(1));
    test('should click on "Sitemap" button', () => client.waitForExistAndClick(AccessPageFO.site_map_button));
    test('should click on the Brand list', () => client.waitForExistAndClick(AccessPageFO.brand_list_button));
    test('should click on the created Brand link', () => client.waitForExistAndClick(AccessPageFO.created_brand.replace('%NAME', "PrestaShop" + date_time)));
    test('should check the updated short description', () => client.checkTextValue(AccessPageFO.brand_short_description, 'short description Update'));
    test('should check the updated description', () => client.checkTextValue(AccessPageFO.brand_description, 'description Update'));
  }, 'manufacturers');

  scenario('Delete the created "Brand"', client => {
    test('should switch to the Back office', () => client.switchWindow(0));
    test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
    test('should search for the "branch" Name', () => client.waitAndSetValue(Brands.brand_search_panel, "PrestaShop" + date_time));
    test('should click on "Search" button', () => client.waitForExistAndClick(Brands.search_button));
    test('should check the search result', () => client.checkTextValue(Brands.search_result, "PrestaShop" + date_time, "equal"));
    test('should click on "Delete" button', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(Brands.dropdown_btn))
        .then(() => client.waitForVisibleAndClick(Brands.delete_btn))
        .then(() => client.alertAccept());
    });
    test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_search))
  }, 'manufacturers');

  scenario('check the Deleted "Brand" in the Front Office', client => {
    test('should switch to the Front office', () => client.switchWindow(1));
    test('should click on "Sitemap" button', () => client.waitForExistAndClick(AccessPageFO.site_map_button));
    test('should click on the Brand list', () => client.waitForExistAndClick(AccessPageFO.brand_list_button));
    test('should check that the brand doesn\'t exist on the Brand list', () => client.isNotExisting(AccessPageFO.created_brand.replace('%NAME', "PrestaShop" + date_time)));
  }, 'manufacturers');

}, 'manufacturers', true);
