const {Menu} = require('../../selectors/BO/menu.js');
const {CatalogPage} = require('../../selectors/BO/catalogpage/index');
const {Brands} = require('../../selectors/BO/catalogpage/Manufacturers/brands');
const {BrandAddress} = require('../../selectors/BO/catalogpage/Manufacturers/brands_address');

module.exports = {
  createManufacturer: function () {
    scenario('Create a new "Brand"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should click on "Add new brand" button', () => client.waitForExistAndClick(Brands.new_brand_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Brands.name_input, 'PrestaShop' + date_time));
      test('should set the "Short Description" input', () => client.setEditorText(Brands.short_description_input, 'short description'));
      test('should set the "Description" input', () => client.setEditorText(Brands.description_input, 'description'));
      test('should upload "Picture" to the brand', () => client.uploadPicture("prestashop.png", Brands.image_input, "logo"));
      test('should set the "Meta title" input', () => client.waitAndSetValue(Brands.meta_title_input, "meta title"));
      test('should set the "Meta description" input', () => client.waitAndSetValue(Brands.meta_description_input, "meta description"));
      test('should set the "Meta keywords" input', () => client.addMetaKeywords(Brands.meta_keywords_input));
      test('should click on "Activate" button', () => client.waitForExistAndClick(Brands.active_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Brands.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'manufacturers');
  },
 checkManufacturerBO: function () {
   scenario('check the created "Brands" ', client => {
     test('should search for the "branch" Name', () => client.waitAndSetValue(Brands.brand_search_panel, "PrestaShop" + date_time));
     test('should click on "Search" button', () => client.waitForExistAndClick(Brands.search_button));
     test('should check the search result', () => client.checkTextValue(Brands.search_result, "PrestaShop" + date_time, "equal"));
     test('should click on "Reset" button', () => client.waitForExistAndClick(Brands.reset_search));
   }, 'manufacturers');
 },
 createManufacturerAddress: function () {
   scenario('Create a new "Brand address"', client => {
     test('should click on "Add new brand address" button', () => client.waitForExistAndClick(BrandAddress.new_brand_address_button));
     test('should Choose the brand name', () => client.waitAndSelectByVisibleText(BrandAddress.branch_select, 'PrestaShop' + date_time));
     test('should set the "Last name" input', () => client.waitAndSetValue(BrandAddress.last_name_input, "Prestashop"));
     test('should set the "First name" input', () => client.waitAndSetValue(BrandAddress.first_name_input, "Prestashop"));
     test('should set the "Address" input', () => client.waitAndSetValue(BrandAddress.address_input, "12 rue d'amesterdam"));
     test('should set the "Second address" input', () => client.waitAndSetValue(BrandAddress.secondary_address, "RDC"));
     test('should set the "Zip code" input', () => client.waitAndSetValue(BrandAddress.postal_code_input, "75009"));
     test('should set the "City" input', () => client.waitAndSetValue(BrandAddress.city_input, "paris"));
     test('should choose the country', () => client.waitAndSelectByValue(BrandAddress.country, "8"));
     test('should set the "Phone" input', () => client.waitAndSetValue(BrandAddress.phone_input, "0140183004"));
     test('should set the "Other information" input', () => client.waitAndSetValue(BrandAddress.other_input, "azerty"));
     test('should click on "Save" button', () => client.waitForExistAndClick(BrandAddress.save_button));
     test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
   }, 'manufacturers');
 }
};