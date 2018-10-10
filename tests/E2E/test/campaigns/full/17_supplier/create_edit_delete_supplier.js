const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Suppliers} = require('../../../selectors/BO/catalogpage/Manufacturers/suppliers');
const {Menu} = require('../../../selectors/BO/menu.js');
let promise = Promise.resolve();

scenario('Create, edit and delete "Supplier"', () => {
  scenario('Create "Supplier"', () => {
    scenario('Login in the Back Office', client => {
      test('should open the browser', () => client.open());
      test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'suppliers');

    scenario('Create a new "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should click on "Add new supplier" button', () => client.waitForExistAndClick(Suppliers.new_supplier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Suppliers.name_input, 'Supplier' + date_time));
      test('should set the "Short Description" input', () => client.setEditorText(Suppliers.description_textarea, 'short description'));
      test('should set the "Phone" input', () => client.waitAndSetValue(Suppliers.phone_input, "0140183004"));
      test('should set the "Address" input', () => client.waitAndSetValue(Suppliers.address_input, "12 rue d'amesterdam"));
      test('should set the "Second address" input', () => client.waitAndSetValue(Suppliers.secondary_address, "RDC"));
      test('should set the "Zip code" input', () => client.waitAndSetValue(Suppliers.postal_code_input, "75009"));
      test('should set the "City" input', () => client.waitAndSetValue(Suppliers.city_input, "paris"));
      test('should choose the country', () => client.waitAndSelectByValue(Suppliers.country, "8"));
      test('should upload "Picture" to the supplier', () => client.uploadPicture("prestashop.png", Suppliers.image_input, "logo"));
      test('should set the "Meta title" input', () => client.waitAndSetValue(Suppliers.meta_title_input, "meta title"));
      test('should set the "Meta description" input', () => client.waitAndSetValue(Suppliers.meta_description_input, "meta description"));
      test('should set the "Meta keywords" input', () => client.addMetaKeywords(Suppliers.meta_keywords_input));
      test('should click on "Activate" button', () => client.waitForExistAndClick(Suppliers.active_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Suppliers.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'suppliers');

    scenario('Check Supplier in the Back office', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should check the address existence in the "addresses list"', () => {
        return promise
          .then(() => client.isVisible(Suppliers.search_filter_name))
          .then(() => client.search(Suppliers.search_filter_name, 'Supplier' + date_time))
          .then(() => client.checkExistence(Suppliers.search_result, 'Supplier' + date_time, 4));
      });
    }, 'suppliers');

    scenario('Check Supplier in the front office', client => {
      scenario('Login in the Front Office', client => {
        test('should click on "View my shop" button', () => {
          return promise
            .then(() => client.pause(4000))
            .then(() => client.waitForVisibleAndClick(AccessPageBO.shopname));
        });
        test('should switch to the new window', () => client.switchWindow(1));
        test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
        test('should set the language of shop to "English"', () => client.changeLanguage());
      }, 'suppliers');

      scenario('Check that the Supplier is well created in the Front Office', client => {
        test('should go to the shop sitemap', () => client.waitForExistAndClick(AccessPageFO.sitemap));
        test('should go to the supplier list', () => client.waitForExistAndClick(AccessPageFO.supplier_list));
        test('should click on the supplier', () => client.waitForExistAndClick(AccessPageFO.supplier.replace("%SupplierName", 'Supplier' + date_time)));
        test('should check the supplier name', () => client.checkTextValue(AccessPageFO.supplier_name, 'Supplier' + date_time, 'contain'));
        test('should check the supplier description', () => client.checkTextValue(AccessPageFO.supplier_description, 'short description', 'contain'));
      }, 'attribute_and_feature');
    }, 'suppliers');

  }, 'suppliers');

  scenario('Edit "Supplier"', () => {
    scenario('Go back to the Back Office', client => {
      test('should switch to the back office', () => client.switchWindow(0));
    }, 'attribute_and_feature');

    scenario('Update the created "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should check the address existence in the "addresses list"', () => {
        return promise
          .then(() => client.isVisible(Suppliers.search_filter_name))
          .then(() => client.search(Suppliers.search_filter_name, 'Supplier' + date_time));
      });
      test('should click on the "Edit" action', () => client.clickOnAction(Suppliers.select_option, Suppliers.update_supplier_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Suppliers.name_input, 'Supplier' + date_time + 'update'));
      test('should check the "Short Description"', () => client.setEditorText(Suppliers.description_textarea, 'short description update'));
      test('should click on "Save" button', () => client.waitForExistAndClick(Suppliers.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
    }, 'suppliers');

    scenario('Check Supplier in the front office', client => {
      scenario('Login in the Front Office', client => {
        test('should switch to the new window', () => client.switchWindow(1));
      }, 'suppliers');

      scenario('Check that the Supplier is well created in the Front Office', client => {
        test('should go to the shop sitemap', () => client.waitForExistAndClick(AccessPageFO.sitemap));
        test('should go to the supplier list', () => client.waitForExistAndClick(AccessPageFO.supplier_list));
        test('should click on the supplier', () => client.waitForExistAndClick(AccessPageFO.supplier.replace("%SupplierName", 'Supplier' + date_time + 'update')));
        test('should check the supplier name', () => client.checkTextValue(AccessPageFO.supplier_name, 'Supplier' + date_time, 'contain'));
        test('should check the supplier description', () => client.checkTextValue(AccessPageFO.supplier_description, 'short description', 'contain'));
      }, 'attribute_and_feature');
    }, 'suppliers');
  }, 'suppliers');

  scenario('Delete "Supplier"', () => {
    scenario('Go back to the Back Office', client => {
      test('should switch to the back office', () => client.switchWindow(0));
    }, 'attribute_and_feature');

    scenario('Delete the created "Supplier"', client => {
      test('should go to "Brands & Suppliers" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu));
      test('should go to "Suppliers" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.supplier_tab));
      test('should check the address existence in the "addresses list"', () => {
        return promise
          .then(() => client.isVisible(Suppliers.search_filter_name))
          .then(() => client.search(Suppliers.search_filter_name, 'Supplier' + date_time));
      });
      test('should click on the "Delete" action', () => client.clickOnAction(Suppliers.select_option, Suppliers.delete_supplier_button, 'delete'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    }, 'suppliers');

    scenario('Check Supplier in the front office', client => {
      scenario('Login in the Front Office', client => {
        test('should switch to the front office window', () => client.switchWindow(1));
      }, 'suppliers');

      scenario('Check that the Supplier is well created in the Front Office', client => {
        test('should go to the shop sitemap', () => client.waitForExistAndClick(AccessPageFO.sitemap));
        test('should go to the supplier list', () => client.waitForExistAndClick(AccessPageFO.supplier_list));
        test('should check that the supplier was existed', () => client.isNotExisting(AccessPageFO.supplier.replace("%SupplierName", 'Supplier' + date_time + 'update')));
      }, 'attribute_and_feature');
    }, 'suppliers');

  }, 'suppliers');
}, 'suppliers', true);
