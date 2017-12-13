const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');

scenario('Modify quantity and check movement for single product', client => {
  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'stocks');
  scenario('Modify quantity and check movement for single product', client => {
    test('should go to "Stocks" page', () => client.goToSubtabMenuPage(CatalogPage.menu_button, Stock.submenu));
    test('should get the "Quantity" of the third product', () => client.getTextInVar(Stock.product_quantity.replace('%O', 3), "productQuantity"));
    test('should change the third product quantity', () => {
      let promise = Promise.resolve();
      promise = client.moveToObject(Stock.product_quantity_input.replace('%O', 3));
      for (let i = 1; i < 4; i++) {
        promise = client.waitForExistAndClick(Stock.add_quantity_button);
      }
      return promise
        .then(() => client.getTextInVar(Stock.product_quantity.replace('%O', 3), "productQuantity"))
        .then(() => client.checkTextValue(Stock.product_quantity_modified.replace('%O', 3), global.tab["productQuantity"].substring(18), "contain"));
    });
    test('should click on "Check" button of the third product quantity', () => client.waitForExistAndClick(Stock.save_product_quantity_button.replace('%O', 3)));
    test('should go to "Movements" tab', () => client.goToStockMovements(Movement));
    test('should check movement history', () => client.checkMovement(Movement, 1, "3", "+", "Employee Edition"));
    test('should go to "Stock" tab', () => client.waitForExistAndClick(Stock.tabs));
    test('should get the fourth product quantity', () => client.getTextInVar(Stock.product_quantity.replace('%O', 4), "productQuantity"));
    test('should change the fourth product quantity', () => {
      let promise = Promise.resolve();
      promise = client.moveToObject(Stock.product_quantity_input.replace('%O', 4));
      for (let i = 1; i < 4; i++) {
        promise = client.waitForExistAndClick(Stock.remove_quantity_button);
      }
      return promise
        .then(() => client.getTextInVar(Stock.product_quantity.replace('%O', 4), "productQuantity"))
        .then(() => client.checkTextValue(Stock.product_quantity_modified.replace('%O', 4), global.tab["productQuantity"].substring(18), "contain"));
    });
    test('should click on "Check" button of fourth product quantity', () => client.waitForExistAndClick(Stock.save_product_quantity_button.replace('%O', 4)));
    test('should go to "Movements" tab', () => client.goToStockMovements(Movement));
    test('should check movement history', () => client.checkMovement(Movement, 1, "3", "-", "Employee Edition"));
  }, 'stocks');
}, 'stocks', true);
