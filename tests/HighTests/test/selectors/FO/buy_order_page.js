module.exports = {
  first_product_home_page: '.thumbnail.product-thumbnail',
  add_to_cart_button: '.btn.btn-primary.add-to-cart',
  first_product_home_page_name: '[itemprop="name"]',
  product_image: '#content',
  product_name_details: '[itemprop="name"]',
  product_price_details: '[itemprop="price"]',
  product_quantity_details: '#quantity_wanted',
  product_name: '(//div[@class="product-line-info"])[1]/a',
  product_price: '//span[@class="price"]',
  proceed_to_checkout_button: '//*[@id="main"]/div/div[2]/div[1]/div[2]/div/a',
  checkout_step2_continue_button: '//*[@id="checkout-addresses-step"]/div/div/form/div[2]/button',
  checkout_step3_continue_button: '//*[@id="js-delivery"]/button',
  checkout_step4_payment_radio: '//*[@id="payment-option-2"]',
  checkout_step4_cgv_checkbox: '//input[@id="conditions_to_approve[terms-and-conditions]"]',
  checkout_step4_order_button: '#payment-confirmation >div > button',
  checkout_total: '//div[@class="cart-summary-line cart-total"]/span[2]',
  order_confirmation_name: '#order-items > div > div > div.col-sm-4.col-xs-9.details > span',
  order_confirmation_price1: '#order-items > div > table > tbody > tr:nth-child(1) > td:nth-child(2)',
  order_confirmation_price2: '#content-hook_payment_return > div > div > div > dl > dd:nth-child(2)',
  order_confirmation_ref: '(//div[@id="order-details"]/ul/li)[1]'
};
