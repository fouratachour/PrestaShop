const {Menu} = require('../../../selectors/BO/menu.js');
const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {MerchandiseReturns} = require('../../../selectors/BO/Merchandise_returns');

const {OrderPage} = require('../../../selectors/BO/order');
const {CreditSlip} = require('../../../selectors/BO/order');
const commonOrder = require('../../common_scenarios/order');

global.orderInformation = [];
let promise = Promise.resolve();

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
      test('should go to the orders list', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
      test('should go to the created order', () => client.waitForExistAndClick(OrderPage.order_view_button.replace('%ORDERNumber', 1)));
      test('should change order state to "Payment accepted"', () => client.changeOrderState(OrderPage, 'Payment accepted'));
      test('should click on "Partial refund" button', () => client.waitForExistAndClick(OrderPage.partial_refund));
      test('should set the "quantity refund" to "2"', () => client.waitAndSetValue(OrderPage.quantity_refund, '2'));
      test('should click on "Re-stock products" CheckBox', () => client.waitForExistAndClick(OrderPage.re_stock_product));
      test('should click on "Partial refund" button', () => client.waitForExistAndClick(OrderPage.refund_products_button));
      test('should check the success message', () => client.checkTextValue(OrderPage.success_msg, 'partial refund was successfully created.', 'contain'));
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
              "OrderId": global.tab['OrderID'].replace("#", ''),
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
      test('should click on "DOCUMENTS" subtab', () => client.waitForVisibleAndClick(OrderPage.document_submenu));
      test('should get the credit slip name', () => client.getDocumentName(OrderPage.credit_slip_document_name));
      test('should go to "Credit slip" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.credit_slips_submenu));
      test('should click on "Download credit slip" button', () => {
        return promise
          .then(() => client.waitForVisibleAndClick(CreditSlip.download_btn.replace('%ID', global.tab['OrderID'].replace("#", ''))))
          .then(() => client.pause(5000));
      });
      test('should check the "Billing Address " ', () => {
        return promise
          .then(() => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, 'My Company'))
          .then(() => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, '16, Main street'))
          .then(() => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, '75002 Paris'))
          .then(() => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, 'France'));
      });
      test('should check the "Invoice date Reference" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].invoiceDate));
      test('should check the "Invoice Reference" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].ProductRef));
      test('should check the "Product combination" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].ProductCombination));
      test('should check the "Product quantity" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].ProductQuantity));
      test('should check the "Product name" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].ProductName));
      test('should check the "Unit Price" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].UnitPrice));
      test('should check the "Price" ', () => client.checkDocument(global.downloadsFolderPath, global.invoiceFileName, global.orderInformation[0].Price));
    }, 'order');
  }, 'order');

}, 'order');