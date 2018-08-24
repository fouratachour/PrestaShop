const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {MerchandiseReturns} = require('../../../selectors/BO/Merchandise_returns');

const {OrderPage} = require('../../../selectors/BO/order');
const commonOrder = require('../../common_scenarios/order');

global.orderInformation = [];

const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {CustomerSettings} = require('../../../selectors/BO/shopParameters/customer_settings');
const {SearchProductPage} = require('../../../selectors/FO/search_product_page');
const {productPage} = require('../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');



scenario('Check Credit slip', () => {
  scenario('Open the browser login successfully in the Back Office ', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'order');

  scenario('Enable Merchandise Returns', client => {
    test('should go to "Merchandise Returns" page', () => client.goToSubtabMenuPage(Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.merchandise_returns_submenu));
    test('should enable "Merchandise Returns"', () => client.waitForExistAndClick(MerchandiseReturns.enableReturns));
    test('should click on "Save" button', () => client.waitForExistAndClick(MerchandiseReturns.save_button));
    test('should check the success message', () => client.checkTextValue(MerchandiseReturns.success_msg, 'The settings have been successfully updated.', 'contain'));
  }, 'order');

  scenario('Create order and generate a credit slip', client => {
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    commonOrder.createOrderFO();
    scenario('Generate a credit slip', client => {
      test('should login successfully in the Back Office', () => client.linkAccess(URL + '/admin-dev'));
      test('should go orders list', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
      test('should go the created order', () => client.waitForExistAndClick(OrderPage.order_view_button.replace('%ORDERNumber', 1)));
      test('should change order state to "Payment accepted"', () => client.changeOrderState(OrderPage, 'Payment accepted'));
      test('should click on "Standard refund" button', () => client.waitForExistAndClick(OrderPage.standard_refund));
      test('should click on "Refund" CheckBox', () => client.waitForExistAndClick(OrderPage.refund_checkbox));
      test('should check the "Generate a credit slip" CheckBox', () => client.waitForExistAndClick(OrderPage.generate_credit_slip_checkbox));
      test('should click on "Refund products" button', () => client.waitForExistAndClick(OrderPage.refund_products_button));
      test('should check the success message', () => client.checkTextValue(OrderPage.success_msg, 'The discount was successfully generated.', 'contain'));
      test('should get all order information', () => {
        return promise
          .then(() => client.getTextInVar(OrderPage.order_id, "OrderID"))
          .then(() => client.getTextInVar(OrderPage.order_date, "invoiceDate"))
          .then(() => client.getTextInVar(OrderPage.order_ref, "OrderRef"))
          .then(() => {
            client.getTextInVar(OrderPage.product_information, "ProductRef").then(() => {
              global.tab['ProductRef'] = global.tab['ProductRef'].split('\n')[1];
              global.tab['ProductRef'] = global.tab['ProductRef'].substring(18);
            })
          })
          .then(() => client.pause(2000))
          .then(() => {
            client.getTextInVar(OrderPage.product_information, "ProductCombination").then(() => {
              global.tab['ProductCombination'] = global.tab['ProductCombination'].split('\n')[0];
              global.tab['ProductCombination'] = global.tab['ProductCombination'].split(':')[1];
            })
          })
          .then(() => client.pause(2000))
          .then(() => client.getTextInVar(OrderPage.product_quantity, "ProductQuantity"))
          .then(() => client.getTextInVar(OrderPage.product_name_tab, "ProductName"))
          .then(() => client.getAttributeInVar(OrderPage.product_unit_price_tax_included, "value", "UnitPrice"))
          .then(() => client.getTextInVar(OrderPage.total_price_tax_included, "Price"))
          .then(() => {
            global.orderInformation[0] = {
              "OrderId": global.tab['OrderID'],
              "invoiceDate": global.tab['invoiceDate'],
              "ProductRef": global.tab['ProductRef'],
              "ProductCombination": global.tab['ProductCombination'],
              "ProductQuantity": global.tab['ProductQuantity'],
              "ProductName": global.tab['ProductName'],
              "UnitPrice": global.tab['UnitPrice'],
              "Price": global.tab['Price']
            }
          });
      });


    }, 'order');
  }, 'order');

}, 'order');