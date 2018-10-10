module.exports = {
  Suppliers: {
    new_supplier_button: '//*[@id="page-header-desc-supplier-new_supplier"]',
    name_input: '//*[@id="name"]',
    address_input: '//*[@id="address"]',
    secondary_address: '//*[@id="address2"]',
    postal_code_input: '//*[@id="postcode"]',
    city_input: '//*[@id="city"]',
    country: '//*[@id="id_country"]',
    phone_input: '//*[@id="phone"]',
    image_input: '//*[@id="logo"]',
    meta_title_input: '//*[@id="meta_title_1"]',
    meta_description_input: '//*[@id="meta_description_1"]',
    meta_keywords_input: '(//*[@id="supplier_form"]//div[@class="tagify-container"])[1]/input',
    active_button: '//*[@id="supplier_form"]//span[contains(@class, "switch")]/label[1]',
    save_button: '//*[@id="supplier_form_submit_btn"]',
    search_input: '//*[@id="table-supplier"]//input[@name="supplierFilter_name"]',
    search_button: '//*[@id="submitFilterButtonsupplier"]',
    select_option: '//*[@id="table-supplier"]//td//button',
    update_supplier_button: '//*[@id="table-supplier"]//td//li[1]/a',
    reset_button: '//*[@id="table-supplier"]//button[@name="submitResetsupplier"]',
    delete_supplier_button: '//*[@id="table-supplier"]//td//li[3]/a',
    bulk_actions_supplier: '//*[@id="bulk_action_menu_supplier"]',
    bulk_actions_delete_supplier: '//*[@id="form-supplier"]//li[7]/a',
    search_filter_name: '//input[@name="supplierFilter_name"]',
    search_result: '//*[@id="table-supplier"]//tr/td[%ID]',
    description_textarea: '(//*[@id="supplier_form"]//div[@class="mce-tinymce mce-container mce-panel"])[1]'
  }
};
