const {AccessPageBO} = require('../../../selectors/BO/access_page');
const {AccessPageFO} = require('../../../selectors/FO/access_page');
const {Menu} = require('../../../selectors/BO/menu.js');
const {CreateOrder, OrderPage, CustomerInformation, OrderDetailsPage} = require('../../../selectors/BO/order');
const order = require('../../common_scenarios/order');
const {productPage} = require('../../../selectors/FO/product_page');
const {CheckoutOrderPage} = require('../../../selectors/FO/order_page');
const product = require('../../common_scenarios/product');
const carrier = require('../../common_scenarios/carrier');
const currency = require('../../common_scenarios/currency');
const {OrderHistory} = require('../../../selectors/FO/order_page');
const {AddProductPage} = require('../../../selectors/BO/add_product_page');
const {AddCarrierPage} = require('../../../selectors/BO/add_carrier_page');
const {CurrencyPage} = require('../../../selectors/BO/international/currency');
const {accountPage} = require('../../../selectors/FO/add_account_page');

let promise = Promise.resolve();
let dateFormat = require('dateformat');

let customerData = {
  first_name: 'demo',
  last_name: 'demo',
  email_address: 'demo@prestashop.com',
  password: '123456789',
  birthday: {
    day: '18',
    month: '12',
    year: '1991'
  }
};
let cartRuleData = {
  name: 'promo',
  description: 'super promo',
  total_available: 10,
  total_available_for_each_user: 10,
  type: 'percent',
  reduction: 10
};
let addressDataExistingCustomer = {
  address_alias: 'plop',
  first_name: 'Johnny',
  last_name: 'DEPP',
  address: '12,street test',
  postal_code: '75009',
  city: 'Paris'
};
let addressDataNewCustomer = {
  address_alias: 'address',
  first_name: 'Demo',
  last_name: 'Demo',
  address: '14,street test',
  postal_code: '75009',
  city: 'Lyon'
};
let addressDataUpdated = {
  first_name: 'Johnnn',
  last_name: 'DOEEE',
  company: 'My companyyy'
};
let productData = [{
  name: 'Pro',
  quantity: "100",
  price: '12.9',
  image_name: 'image_test.jpg',
  reference: 'att',
  type: 'combination',
  attribute: {
    name: 'attribute',
    variation_quantity: '300'
  }
}, {
  name: 'Product',
  quantity: "100",
  price: '12.9',
  image_name: 'image_test.jpg',
  reference: 'att',
  type: 'combination',
  attribute: {
    name: 'attribute',
    variation_quantity: '300'
  }
}];
let carrierData = {
  name: 'Carrier',
  transitTime: 'From 1 to 3 days',
  image: 'prestashop.png',
  rangeInf: '0',
  rangeSup: '1000',
  price: '5',
  maxPackWidth: '0',
  maxPackheight: '0',
  maxPackdepth: '0',
  maxPackweight: '0'
};
let searchProduct = {
  name: 'prod',
  quantity: '3'
};

global.date = dateFormat(global.date, "mm/dd/yyyy");

scenario('Order in the Back Office', client => {

  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');

  scenario('Add a new currency', () => {
    currency.addNewCurrency(CurrencyPage);
  }, 'order');

  scenario('Create "Carrier"', () => {
    carrier.createCarrier(AddCarrierPage, carrierData);
  }, 'order');

  scenario('Login in the Front Office and create a cart', client => {
    test('should click on "View my shop" button', () => {
      return promise
        .then(() => client.pause(4000))
        .then(() => client.waitForVisibleAndClick(AccessPageBO.shopname));
    });
    test('should switch to the new window', () => client.switchWindow(1));
    test('should login successfully in the Front Office', () => client.signInFO(AccessPageFO));
    test('should set the language of shop to "English"', () => client.changeLanguage());
    test('should go to the first product page', () => client.waitForExistAndClick(productPage.first_product, 2000));
    test('should click on "Add to cart" button  ', () => client.waitForExistAndClick(CheckoutOrderPage.add_to_cart_button));
  }, 'common_client');

  scenario('Try to create a customer from order and display his details', client => {
    test('should switch to the new window', () => client.switchWindow(0));
    test('should go to the "Orders" page', () => client.goToSubtabMenuPage(Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu));
    test('should click on "Add new order" button', () => client.waitForExistAndClick(CreateOrder.new_order_button, 1000));
    test('should click on "Add new customer" button', () => client.waitForExistAndClick(CreateOrder.new_customer_button, 2000));
    scenario('create customer', () => {
      order.createCustomer(customerData);
    }, 'order');
    scenario('Check the customer information', client => {
      test('should click on "Details" button', () => client.waitForExistAndClick(CreateOrder.details_customer_button, 1000));
      test('should check the social title', () => {
        return promise
          .then(() => client.switchToFrameById(1, 2000))
          .then(() => client.checkTextValue(CreateOrder.social_title_details, 'Unknown'));
      });
      test('should check the last visit', () => {
        return promise
          .then(() => client.checkTextValue(CreateOrder.last_visit_details, 'Never'))
          .then(() => client.keys("Escape"));
      });
    }, 'order');
  }, 'order');

  scenario('Create order with existing customer', client => {
    test('should search for an existing customer', () => client.waitAndSetValue(CreateOrder.customer_search_input, 'pub@prestashop.com'));
    test('should click on "Choose" button', () => client.waitForExistAndClick(CreateOrder.choose_customer_button, 1000));
  }, 'order');

  scenario('Check existing cart and try to use it', client => {
    test('should display details of an existing cart', () => client.waitForExistAndClick(CreateOrder.carts_order));
    test('should check the displayed cart list', () => client.isExisting(CreateOrder.carts_orders_list));
    test('should use an existing cart', () => client.waitForExistAndClick(CreateOrder.carts_use_button));
    test('should using the existing cart', () => client.isVisible(CreateOrder.order_detail));
  }, 'order');

  scenario('Check existing order and try to use it', client => {
    test('should display details of an existing order', () => client.waitForExistAndClick(CreateOrder.orders));
    test('should check the displayed order list', () => client.isExisting(CreateOrder.orders_list));
    test('should use an existing order', () => client.waitForExistAndClick(CreateOrder.orders_use_button));
    test('should using the existing order', () => client.isVisible(CreateOrder.order_detail, 3000));
  }, 'order');

  scenario('delete the selected product and search for product', client => {
    test('should delete the first affected product', () => client.waitForExistAndClick(CreateOrder.delete_affected_product.replace('%ID', '1')));
    test('should delete the second affected product', () => {
      return promise
        .then(() => client.isVisible(CreateOrder.delete_affected_product.replace('%ID', '2')))
        .then(() => {
          if (global.isVisible) {
            client.waitForExistAndClick(CreateOrder.delete_affected_product.replace('%ID', '2'))
          }
        });
    });
    test('should search a product', () => {
      return promise
        .then(() => client.waitAndSetValue(CreateOrder.product_search_input, 'notebook'))
        .then(() => client.waitForExistAndClick(CreateOrder.search_button, 1000));
    });
    test('should choose the second combination', () => client.waitAndSelectByVisibleText(CreateOrder.combination_select, "Plain - £11.44"));
    test('should choose the third combination', () => client.waitAndSelectByVisibleText(CreateOrder.combination_select, "Squarred - £11.44"));
    test('should set the "Quantity" input', () => client.waitAndSetValue(CreateOrder.quantity_cart_input, '4'));
    test('should click on "Add to cart" button', () => client.waitForExistAndClick(CreateOrder.add_to_cart_button, 1000));
    test('should delete the cart', () => client.waitForExistAndClick(CreateOrder.delete_product_button, 3000));
    test('should check that the product is well deleted', () => client.isNotExisting(CreateOrder.delete_product_button, 2000));
    test('should choose the other product', () => client.waitAndSelectByVisibleText(CreateOrder.product_select, 'Hummingbird notebook'));
    test('should choose the second combination', () => client.waitAndSelectByVisibleText(CreateOrder.combination_select, "Doted - £11.44"));
    test('should click on "Add to cart" button', () => client.waitForExistAndClick(CreateOrder.add_to_cart_button, 1000));
    test('should change the quantity of the product', () => {
      for (let i = 0; i <= 1; i++) {
        promise
          .then(() => client.waitForExistAndClick(CreateOrder.increase_quantity_button, 1000))
          .then(() => client.pause(1000));
      }
      return promise
    });
    test('should decrease the quantity', () => {
      for (let i = 0; i <= 2; i++) {
        promise
          .then(() => client.waitForExistAndClick(CreateOrder.decrease_quantity_button, 1000))
          .then(() => client.pause(1000));
      }
      return promise
    });
    test('should get the basic price', () => client.getAttributeInVar(CreateOrder.basic_price_value, 'value', "basicPriceEuro"));
    test('should get the quantity', () => client.getAttributeInVar(CreateOrder.quantity_product_input, 'value', "quantity", 3000));
    test('should get the total price', () => client.getTextInVar(CreateOrder.total_price, "totalPriceEuro"));
    test('should check the total price HT in Euro', () => client.checkPrice(CreateOrder.total_price, (parseFloat(tab["basicPriceEuro"]) * parseInt(tab["quantity"])).toFixed(1)));
    test('should change currency to "GBP"', () => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "British Pound Sterling"));
    test('should get the basic price', () => client.getAttributeInVar(CreateOrder.basic_price_value, 'value', "basicPriceGBP", 3000));
    test('should get the total price', () => client.getTextInVar(CreateOrder.total_price, "totalPriceEuro"));
    test('should check the total price HT in GBP', () => client.checkPrice(CreateOrder.total_price, (parseFloat(tab["basicPriceGBP"]) * parseInt(tab["quantity"])).toFixed(1)));
    test('should change currency to "Euro"', () => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "Euro"));
    test('should get the total price', () => {
      return promise
        .then(() => client.pause(3000))
        .then(() => client.getTextInVar(CreateOrder.total_price, "totalPriceEuro"));
    });
  }, 'order');

  scenario('Voucher steps', client => {
    scenario('Add new cart rule', client => {
      order.createCartRule(cartRuleData, "promoCode");
    }, 'order');
    scenario('Testing the voucher', client => {
      test('should delete the voucher', () => client.waitForExistAndClick(CreateOrder.delete_voucher_button, 2000));
      test('should search the same voucher', () => {
        return promise
          .then(() => client.waitAndSetValue(CreateOrder.voucher_input, cartRuleData.name))
          .then(() => client.waitForVisibleAndClick(CreateOrder.search_voucher_option.replace("%T", tab["promoCode"])))
          .then(() => client.pause(3000));
      });
      test('should check the voucher in Euro', () => client.checkTextValue(CreateOrder.voucher_value, "€" + (((parseFloat(tab["totalPriceEuro"]) * 0.2) + parseFloat(tab["totalPriceEuro"])) / cartRuleData.reduction).toFixed(2), 'equal', 3000));
      test('should check the voucher in GBP', () => {
        return promise
          .then(() => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "British Pound Sterling"))
          .then(() => client.pause(3000))
          .then(() => client.getTextInVar(CreateOrder.total_price, "totalPriceGBP"))
          .then(() => client.checkTextValue(CreateOrder.voucher_value, "£" + (((parseFloat(tab["totalPriceGBP"]) * 0.2) + parseFloat(tab["totalPriceGBP"])) / cartRuleData.reduction).toFixed(2), 'equal', 3000));
      });
      test('should get the voucher', () => client.getTextInVar(CreateOrder.voucher_value, "voucherTTC"));
      test('should change currency to "GBP"', () => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "Euro"));
      test('should get the total price', () => {
        return promise
          .then(() => client.pause(3000))
          .then(() => client.waitAndSelectByVisibleText(CreateOrder.currency_select, "British Pound Sterling"))
      });
    }, 'order');
  }, 'order');
  scenario('Address steps', client => {
    scenario('Edit the delivery address', client => {
      order.editDeliveryAddress(addressDataUpdated);
    }, 'order');
    scenario('check that the delivered address is well updated', client => {
      test('should check that the first and the last name are updated', () => client.checkTextValue(CreateOrder.check_delivered_address, addressDataUpdated.first_name + " " + addressDataUpdated.last_name, 'contain', 1000));
      test('should check that the company is updated', () => client.checkTextValue(CreateOrder.check_delivered_address, addressDataUpdated.company, 'contain', 1000));
      test('should change the address', () => client.waitAndSelectByVisibleText(CreateOrder.delivery_address_select, "My address"));
      test('should check the first name', () => client.checkTextValue(CreateOrder.check_delivered_address, 'John', 'contain', 1000));
    }, 'order');
    scenario('Add a new address', client => {
      order.addNewDeliveryAddress(addressDataExistingCustomer);
    }, 'order');
    scenario('Change the delivery and the invoice addresses ', client => {
      test('should change the invoice address', () => {
        return promise
          .then(() => client.waitAndSelectByVisibleText(CreateOrder.invoice_address_select, "plop"))
          .then(() => client.pause(3000));
      });
      test('should check the first name', () => client.checkTextValue(CreateOrder.check_invoice_address, addressDataExistingCustomer.first_name, 'contain', 1000));
      test('should change the delivery address', () => client.client.waitAndSelectByVisibleText(CreateOrder.delivery_address_select, "Mon adresse"));
      test('should get the delivery address', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.getTextInVar(CreateOrder.check_delivered_address, "deliveryAddress"));
      });
      test('should get the invoice address', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.getTextInVar(CreateOrder.check_invoice_address, "invoiceAddress"));
      });
    }, 'order');
  }, 'order');

  scenario('Shipping steps', client => {
    test('should choose the delivery', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.waitAndSelectByVisibleText(CreateOrder.delivery_option, carrierData.name + date_time + " - " + carrierData.transitTime));
    });
    test('should check the shipping price TTC', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.getTextInVar(CreateOrder.shipping_price_tax_excl, "totalShippingTaxExcl"))
        .then(() => client.getTextInVar(CreateOrder.shipping_price_tax_incl, "totalShippingTTC"))
        .then(() => client.pause(3000))
        .then(() => client.checkPrice(CreateOrder.shipping_price_tax_incl, (((parseFloat(tab["totalShippingTaxExcl"]) * 0.2) + (parseFloat(tab["totalShippingTaxExcl"])))).toFixed(1)));
    });
    test('should enable the "Free shipping"', () => client.client.waitForVisibleAndClick(CreateOrder.enable_free_shipping));
    test('should check the free shipping price', () => {
      return promise
        .then(() => client.pause(2000))
        .then(() => client.getTextInVar(CreateOrder.shipping_price_tax_excl, "freeShippingPrice"))
        .then(() => client.pause(3000))
        .then(() => client.checkPrice(CreateOrder.shipping_price_tax_incl, (parseFloat(tab["freeShippingPrice"])).toFixed(1), 3000));
    });
    test('should disable the "Free shipping"', () => {
      return promise
        .then(() => client.waitForVisibleAndClick(CreateOrder.disable_free_shipping))
        .then(() => client.pause(3000));
    });
  }, 'order');

  scenario('Summary cart ', client => {
    test('should get the total price cart TTC', () => client.getTextInVar(CreateOrder.total_cart_TTC, "total"));
    test('should get the total voucher(Discount)', () => client.getTextInVar(CreateOrder.total_voucher_HT, "totalDiscount"));
    test('should get the total shipping', () => client.getTextInVar(CreateOrder.total_shipping, "totalShipping"));
    test('should get the total taxes', () => client.getTextInVar(CreateOrder.total_taxes, "totalTaxes"));
    test('should get the total cart (tax excl.)', () => client.getTextInVar(CreateOrder.total_cart_HT, "totalCartHT"));
    test('should get the total product price', () => client.getTextInVar(CreateOrder.total_product_HT, "totalProduct"));
    test('should check the total product price', () => client.checkTextValue(CreateOrder.total_price, tab["totalProduct"], 'contain'));
    test('should check the total vouchers HT', () => client.checkTextValue(CreateOrder.total_voucher_HT, (parseFloat(tab['totalProduct']) / cartRuleData.reduction).toFixed(2), 'contain'));
    test('should check the total shipping HT', () => client.checkPrice(CreateOrder.shipping_price_tax_excl, (tab['totalShippingTTC'] / (1 + 0.2)).toFixed(1), 'contain'));
    test('should check the total price HT', () => client.checkTextValue(CreateOrder.total_cart_HT, ((parseFloat(tab['totalProduct']) + parseFloat(tab['totalShippingTaxExcl'])) - parseFloat(tab['totalDiscount'])).toFixed(2)));
    test('should set the "Order message" input', () => client.waitAndSetValue(CreateOrder.order_message_textarea, 'test message'));
    test('should choose the "Bank transfer" payment method', () => client.waitAndSelectByValue(CreateOrder.payment, "ps_wirepayment"));
    test('should get the payment method', () => client.getTextInVar(CreateOrder.payment_method.replace("VALUE", "ps_wirepayment"), "paymentMethod"));
    test('should click on "Create the order" button', () => client.waitForVisibleAndClick(CreateOrder.create_order_button));
  }, 'order');

  scenario('Get the product information', client => {
    test('should go to the product information page', () => {
      return promise
        .then(() => client.waitForExistAndMiddleClick(OrderPage.product_information_page.replace("%NAME", 'Hummingbird notebook')))
        .then(() => client.switchWindow(2));
    });
    test('should click on "Combinations" tab', () => client.waitForExistAndClick(AddProductPage.product_combinations_tab));
    test('should get the product quantity', () => {
      return promise
        .then(() => client.pause(3000))
        .then(() => client.getAttributeInVar(AddProductPage.combination_quantity_input.replace("%TEXT", "Doted"), 'value', "productQuantity"));
    });
    test('should get the product weight', () => {
      return promise
        .then(() => client.waitForExistAndClick(AddProductPage.product_shipping_tab))
        .then(() => client.getAttributeInVar(AddProductPage.shipping_weight, 'value', "shippingWeight"));
    });
    test('should go back to the order page', () => client.switchWindow(0));
  }, 'order');

  scenario('Get customer information', client => {
    test('should go to the product information page', () => {
      return promise
        .then(() => client.pause(3000))
        .then(() => client.scrollTo(OrderPage.outside, 50))
        .then(() => client.waitForExistAndMiddleClick(OrderPage.customer_informations_link, 3000))
        .then(() => client.switchWindow(3));
    });
    test('should get the customer email', () => client.getTextInVar(CustomerInformation.customer_email, "customerEmail"));
    test('should get the customer registration date', () => client.getTextInVar(CustomerInformation.registration_date, "registrationDate"));
    test('should get the the number of the valid orders', () => client.getTextInVar(CustomerInformation.valid_orders, "validOrders"));
    test('should get the the total spent since registration', () => client.getTextInVar(CustomerInformation.orders_total_amount, "totalAmount"));
    test('should go back to the order page', () => client.switchWindow(0));
  }, 'order');

  scenario('check the order page', client => {
    test('should get the order reference', () => client.getTextInVar(OrderPage.order_reference, "orderReference"));
    test('should check the name and the last name of the customer', () => client.checkTextValue(OrderPage.customer_informations_link, 'MR. JOHN DOE'));
    test('should check the customer email', () => client.checkTextValue(OrderPage.customer_email, tab["customerEmail"].toLowerCase()));
    test('should check the customer account registered', () => client.checkTextValue(OrderPage.account_registered, tab["registrationDate"]));
    test('should check the number of valid orders placed', () => client.checkTextValue(OrderPage.valid_orders_placed, tab["validOrders"]));
    test('should check the shipping date ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 1), date, 'contain'));
    test('should check the carrier name ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 3), carrierData.name + date_time));
    test('should check the shipping weight ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 4), parseFloat(tab["shippingWeight"]).toFixed(3) + " kg"));
    test('should check the shipping cost TTC ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 5), "£" + tab["totalShippingTTC"]));
    test('should check the tracking number ', () => client.checkTextValue(OrderPage.shipping_informations.replace("%NUMBER", 6), ""));
    test('should check the shipping address ', () => client.checkTextValue(OrderPage.shipping_address, "Edit\n" + tab["deliveryAddress"]));
    test('should click on "INVOICE ADDRESS" button ', () => client.waitForVisibleAndClick(OrderPage.invoice_address_button));
    test('should check the invoice address ', () => client.checkTextValue(OrderPage.invoice_address, "Edit\n" + tab["invoiceAddress"]));
    test('should check the text message', () => client.checkTextValue(OrderPage.message_order, 'test message'));
    test('should check the payment date ', () => client.checkTextValue(OrderPage.payment_informations.replace("%NUMBER", 1), date, 'contain'));
    test('should check the payment method', () => {
      return promise
        .then(() => client.scrollTo(OrderPage.payment_informations.replace("%NUMBER", 2)))
        .then(() => client.checkTextValue(OrderPage.payment_informations.replace("%NUMBER", 2), tab["paymentMethod"]));
    });
    test('should check the payment amount', () => client.checkTextValue(OrderPage.payment_informations.replace("%NUMBER", 4), "£" + tab["total"]));
    test('should check the total amount', () => client.checkTextValue(OrderPage.payment_amount, "£" + tab["total"]));
    test('should check the product quantity', () => client.checkTextValue(OrderPage.order_quantity_show, "3"));
    test('should check the product available quantity', () => client.checkTextValue(OrderPage.available_quantity, tab["productQuantity"]));
    test('should check the voucher name', () => client.checkTextValue(OrderPage.voucher_name, cartRuleData.name, 'contain', 1000));
    test('should check the voucher value', () => client.checkTextValue(OrderPage.voucher_value, "- £" + (((parseFloat(tab["totalPriceGBP"]) * 0.2) + parseFloat(tab["totalPriceGBP"])) / cartRuleData.reduction).toFixed(2), 'contain', 3000));
    scenario('Check summary order', client => {
      test('should get the total price cart TTC', () => client.getTextInVar(OrderPage.total_product, "totalPrice"));
      test('should check the total product', () => client.checkTextValue(OrderPage.total_price, tab['totalPrice'], 'contain', 3000));
      test('should check the total discount', () => client.checkTextValue(OrderPage.total_discount, "-£" + (((tab["totalPrice"].replace("£", "")) / cartRuleData.reduction)).toFixed(2)));
      test('should check the total shipping', () => client.checkTextValue(OrderPage.total_shipping_price, tab["totalShippingTTC"], 'contain'));
    }, 'order');
  }, 'order');

  scenario('Check the created order in the front office', client => {
    test('should go to the front office', () => {
      return promise
        .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
        .then(() => client.switchWindow(4, false));
    });
    test('should click on connected user', () => client.waitForExistAndClick(accountPage.user_connected));
    test('should set the shop language to "English"', () => client.changeLanguage());
    test('should go to the order history page', () => client.waitForExistAndClick(accountPage.order_history));
    test('should check the order reference', () => client.checkTextValue(OrderHistory.order_reference.replace("%NUMBER", 1), tab["orderReference"]));
    test('should check the order date', () => client.checkTextValue(OrderHistory.order_Informations.replace("%NUMBER", 1), date));
    test('should check the total price', () => client.checkTextValue(OrderHistory.order_Informations.replace("%NUMBER", 2), "£" + tab["totalCartTaxIncl"]));
    test('should check the payment method', () => client.checkTextValue(OrderHistory.order_Informations.replace("%NUMBER", 3), tab["paymentMethod"]));
    test('should click on the "details" button ', () => client.waitForExistAndClick(OrderHistory.details_button.replace("%NUMBER", 1)));
    test('should check the order reference', () => client.checkTextValue(OrderHistory.order_details, tab["orderReference"], 'contain'));
  }, 'order');
}, 'order', true);
