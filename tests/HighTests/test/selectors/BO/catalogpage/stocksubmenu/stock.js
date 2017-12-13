module.exports = {
  Stock:{
    submenu: '//*[@id="collapse-9"]/li[8]/a',
    tabs: '//*[@id="tab"]/li[1]/a',
    product_quantity_input: '//*[@id="app"]/div[4]/section/table/tbody/tr[%O]/td[8]/form/div/input',
    product_quantity: '//*[@id="app"]/div[4]/section/table/tbody/tr[%O]/td[7]',
    product_quantity_modified: '//*[@id="app"]/div[4]/section/table/tbody/tr[%O]/td[7]/span',
    save_product_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[%O]/td[8]/form/button',
    group_apply_button: '//*[@id="app"]/div[4]/section/div/div[2]/button',
    add_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[3]/td[8]/form/div/div/span[1]',
    remove_quantity_button: '//*[@id="app"]/div[4]/section/table/tbody/tr[4]/td[8]/form/div/div/span[2]',
    success_panel: '//*[@id="growls"]'
  }
};
