module.exports = {
  CheckoutOrderPage: {
    add_to_cart_button: '//*[@id="add-to-cart-or-refresh"]//button[contains(@class, "add-to-cart")]',
    proceed_to_checkout_modal_button: '//*[@id="blockcart-modal"]//div[@class="cart-content-btn"]//a',
    blockcart_modal: '#blockcart-modal',
    continue_shopping_button: '//*[@id="blockcart-modal"]//div[@class="cart-content-btn"]//button',
    proceed_to_checkout_button: '//*[@id="main"]//div[contains(@class,"checkout")]//a',
    promo_code_link: '//*[@id="main"]//a[contains(@class, "promo-code")]',
    promo_code_input: '//*[@id="promo-code"]//input[contains(@class, "promo-input")]',
    promo_code_add_button: '//*[@id="promo-code"]//button[@type="submit"]/span[text()="Add"]',
    remove_voucher_button: '(//*[@id="main"]//a[@data-link-action="remove-voucher"])[2]',
    cart_subtotal_products: '//*[@id="cart-subtotal-products"]/span[2]',
    cart_subtotal_discount: '//*[@id="cart-subtotal-discount"]/span[2]',
    cart_total: '//*[@id="main"]//div[contains(@class, "cart-total")]/span[2]',
    checkout_step2_continue_button: '//*[@id="checkout-addresses-step"]//button[contains(@name,"confirm-addresses")]',
    checkout_step3_continue_button: '//*[@id="js-delivery"]//button[@name="confirmDeliveryOption"]',
    checkout_step4_payment_radio: '//*[@id="payment-option-2"]',
    shipping_method_option: '//*[@id="delivery_option_2"]',
    message_textarea: '//*[@id="delivery_message"]',
    condition_check_box: '//*[@id="conditions_to_approve[terms-and-conditions]"]',
    confirmation_order_button: '//*[@id="payment-confirmation"]//button[@type="submit"]',
    confirmation_order_message: '//*[@id="content-hook_order_confirmation"]//h3[contains(@class,"card-title")]',
    order_product: '//*[@id="order-items"]//div[contains(@class,"details")]//span',
    order_reference: '//*[@id="order-details"]//li[1]',
    order_basic_price: '//*[@id="order-items"]//div[contains(@class,"qty")]/div/div[1]',
    order_total_price: '//*[@id="order-items"]/div[@class="order-confirmation-table"]//tr[1]/td[2]',
    order_shipping_prince_value: '//*[@id="order-items"]/div[@class="order-confirmation-table"]//tr[2]/td[2]',
    customer_name: '//*[@id="_desktop_user_info"]//a[@class="account"]/span',
    shipping_method: '//*[@id="order-details"]//li[3]',
    quantity_input: '//*[@id="main"]//li[%NUMBER]//div[contains(@class, "input-group")]//input[contains(@class, "js-cart-line-product-quantity")]',
    success_product_add_to_cart_modal: '//*[@id="myModalLabel"]',
    product_discount_details: '//*[@id="main"]//span[contains(@class, "discount")]',
    alert: '//*[@id="notifications"]//article[contains(@class, "alert-danger")]',
    product_cart_link: '//div[@class="product-line-info"]/a',
    cart_product_discount: '//*[@id="main"]//span[contains(@class,"discount-percentage")]',
    total_cart: '//*[@id="main"]//div[contains(@class, "cart-total")]/span[@class="value"]',
    product_name: '//*[@id="main"]//li[%NUMBER]//div[@class="product-line-info"]/a',
    product_unit_price: '//*[@id="main"]//li[%NUMBER]//div[@class="current-price"]/span',
    arrow_button_up: '//*[@id="main"]//li[%NUMBER]//button[contains(@class, "touchspin-up")]',
    add_new_address: '//*[@id="checkout-addresses-step"]//p[contains(@class,"add-address")]',
    company_input: '//*[@id="delivery-address"]//input[@name="company"]',
    vat_number_input: '//*[@id="delivery-address"]//input[@name="vat_number"]',
    address_input: '//*[@id="delivery-address"]//input[@name="address1"]',
    address_second_input: '//*[@id="delivery-address"]//input[@name="address2"]',
    zip_code_input: '//*[@id="delivery-address"]//input[@name="postcode"]',
    city_input: '//*[@id="delivery-address"]//input[@name="city"]',
    country_input: '//*[@id="delivery-address"]//select[@name="id_country"]',
    phone_input: '//*[@id="delivery-address"]//input[@name="phone"]',
    invoice_company_input: '//*[@id="invoice-address"]//input[@name="company"]',
    invoice_vat_number_input: '//*[@id="invoice-address"]//input[@name="vat_number"]',
    invoice_address_input: '//*[@id="invoice-address"]//input[@name="address1"]',
    invoice_address_second_input: '//*[@id="invoice-address"]//input[@name="address2"]',
    invoice_zip_code_input: '//*[@id="invoice-address"]//input[@name="postcode"]',
    invoice_city_input: '//*[@id="invoice-address"]//input[@name="city"]',
    invoice_country_input: '//*[@id="invoice-address"]//select[@name="id_country"]',
    invoice_phone_input: '//*[@id="invoice-address"]//input[@name="phone"]',
    use_address_for_facturation_input: '//*[@id="use_same_address"]',
    product_current_price: '//*[@class="current-price"]/span[@itemprop="price"]',
    display_after_carrier_link_widget: '//*[@id="hook-display-after-carrier"]//p[contains(text(),"%NAME")]',
    display_after_carrier_second_link_widget: '//*[@id="hook-display-after-carrier"]//div[2]/p',
    modal_content: '//*[@id="blockcart-modal"]//div[@class="modal-content"]',
    cart_page: '//*[@id="cart"]',
    cart_body: '(//*[@id="main"]//div[contains(@class, "body")])[1]'
  },

  OrderHistory: {
    order_reference: '//*[@id="content"]//tr[%NUMBER]/th[@scope="row"]',
    order_Informations: '//*[@id="content"]//tr[1]/td[%NUMBER]',
    details_button: '//*[@id="content"]//tr[%NUMBER]/td[6]/a[1]',
    order_details: '(//*[@id="order-infos"]/div[1]/div/div[1]/strong)'
  }
};
