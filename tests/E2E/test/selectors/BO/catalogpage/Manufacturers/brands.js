module.exports = {
  Brands: {
    new_brand_button: '//*[@id="page-header-desc-address-new_manufacturer"]',
    name_input: '//*[@id="name"]',
    image_input: '//*[@id="logo"]',
    meta_title_input: '//*[@id="meta_title_1"]',
    meta_description_input: '//*[@id="meta_description_1"]',
    meta_keywords_input: '//*[@id="fieldset_0"]//div[5]//div[1]/div[1]/div/input[@placeholder="Add tag"]',
    active_button: '//*[@id="fieldset_0"]//label[@for="active_on"]',
    save_button: '//*[@id="manufacturer_form_submit_btn"]',
    short_description_input: '(//*[@id="manufacturer_form"]//div[@class="mce-tinymce mce-container mce-panel"])[1]',
    description_input: '(//*[@id="manufacturer_form"]//div[@class="mce-tinymce mce-container mce-panel"])[3]',
    brand_search_panel: '[name="manufacturerFilter_name"]',
    search_button: '//*[@id="submitFilterButtonmanufacturer"]',
    search_result: '//*[@id="table-manufacturer"]//tr/td[4]',
    address_result: '//*[@id="table-manufacturer"]//tr/td[5]',
    reset_search: '//*[@id="table-manufacturer"]/thead/tr[2]/th[8]/span/button[2]',
    dropdown_btn: '//*[@id="table-manufacturer"]//button[@data-toggle="dropdown"]',
    edit_btn: '//*[@id="table-manufacturer"]//a[@class="edit"]',
    delete_btn: '//*[@id="table-manufacturer"]//a[@class="delete"]'
  }
};
