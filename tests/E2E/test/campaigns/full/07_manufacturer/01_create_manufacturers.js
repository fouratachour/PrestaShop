const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
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

scenario('Create "Brand" - "Brand address"', () => {
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

}, 'manufacturers', true);
