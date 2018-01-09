const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {CatalogPage} = require('../../../selectors/BO/catalogpage/index');
const {Stock} = require('../../../selectors/BO/catalogpage/stocksubmenu/stock');
const {Movement} = require('../../../selectors/BO/catalogpage/stocksubmenu/movements');
const {OrderPage} = require('../../../selectors/BO/order_page');
const {CreateOrder} = require('../../../selectors/BO/create_order');
scenario('Check order movement', client => {
    scenario('Login in the Back Office', client => {
        test('should open the browser', () => client.open());
        test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    }, 'stocks');

    scenario('Create order in the Back Office', client => {
        test('should go to orders list', () => client.goToSubtabMenuPage(OrderPage.orders_subtab, OrderPage.order_submenu));
        test('should click on "Add new order" button', () => client.waitForExistAndClick(CreateOrder.new_order_button));
        test('should search for a customer', () => client.waitAndSetValue(CreateOrder.customer_search_input, 'john doe'));
        test('should choose the customer', () => client.waitForExistAndClick(CreateOrder.choose_customer_button));
        test('should search for a product by name', () => client.waitAndSetValue(CreateOrder.product_search_input, 'blouse'));

        test('should set the product quantity', () => client.waitAndSetValue(CreateOrder.quantity_input, '3'));

        test('should click on "Add to cart" button', () => client.scrollWaitForExistAndClick(CreateOrder.add_to_cart_button));


        test('should click on "Create the order"', () => client.waitForExistAndClick(CreateOrder.create_order_button));
    }, 'stocks');

/*    scenario('Change order state to "Delivred"', client => {
        test('should click on "Orders" menu', () => client.waitForExistAndClick(OrderPage.orders_subtab));
        test('should go to the first order', () => client.waitForExistAndClick(OrderPage.first_order));
        test('should change order state to "Delivered"', () => client.changeOrderState(OrderPage, 'Delivered'));
        test('should get the order quantity', () => client.getTextInVar(OrderPage.order_quantity, "orderQuantity"));
    }, 'stocks');
    scenario('Check order movement', client => {
        test('should go to "Stocks"', () => client.goToSubtabMenuPage(CatalogPage.menu_button, Stock.submenu));
        test('should go to "Movements" tabs', () => client.goToStockMovements(Movement));
        test('should check the movements of the delivered product', () => client.checkMovement(Movement, 1, global.tab["orderQuantity"], "-", "Customer Order"));
    }, 'stocks');*/
}, 'stocks');
