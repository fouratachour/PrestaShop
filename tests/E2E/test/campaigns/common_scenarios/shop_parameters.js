const {AddProductPage} = require('../../selectors/BO/add_product_page');
const {resetModule} = require('./module');
const {Menu} = require('../../selectors/BO/menu');
const {ModulePage} = require('../../selectors/BO/module_page');
const {PagesForm} = require('../../selectors/BO/pages_form.js');
let promise = Promise.resolve();

module.exports = {
  clickOnMenuLinksAndCheckElement: function (client, gui, mainMenu, subMenu, pageSelector, describe1 = "", describe2 = "", pause = 0, tabMenu = "") {
    let page = describe2 === "" ? describe1 : describe2;
    if (mainMenu === "") {
      test('should click on "' + describe1 + '" menu', () => client.waitForExistAndClick(subMenu));
    } else {
      test('should click on "' + describe1 + '" menu', () => client.goToSubtabMenuPage(mainMenu, subMenu));
    }
    if (tabMenu !== "") {
      test('should click on "' + describe2 + '" tab', () => client.waitForExistAndClick(tabMenu));
    }
    test('should check that the "' + page + '" page is well opened', () => {
      return promise
        .then(() => client.waitForExist(pageSelector))
        .then(() => client.isExisting(pageSelector, pause));
    });

    if (gui === "takescreenshot") {
      test('should close symfony toolbar', () => {
        return promise
          .then(() => client.pause(2000))
          .then(() => client.isVisible(AddProductPage.symfony_toolbar))
          .then(() => {
            if (global.isVisible) {
              client.waitForVisibleAndClick(AddProductPage.symfony_toolbar);
            }
          })
      });
      test('should take Screen shot of ' + describe1 + ' ' + describe2 + ' page and compare with the previous version', () => {
        return promise
          .then(() => client.waitUntilIsNotVisible(Menu.loader))
          .then(() => client.waitUntilIsNotVisible(Menu.symfony_loader))
          .then(() => client.takeScreenshot('GUI_' + global.version + '/' + describe1 + ' ' + describe2 + '.png'))
          .then(() => client.checkImageResemble('GUI_' + global.version + '/' + describe1 + ' ' + describe2 + '.png', 'GUI_' + global.compareVersion + '/' + describe1 + ' ' + describe2 + '.png', describe1));
      });
    }
  },
  resetWelcomeModule: function (OnBoarding) {
    scenario('Reset the module "Welcome" ', client => {
      resetModule(client, ModulePage, AddProductPage, Menu, "Welcome", "welcome");
      test('should click on "RESUME" button', () => client.waitForExistAndClick(OnBoarding.resume_button));
    }, 'common_client');
  },
  onBoardingSteps: function (OnBoarding, AddProductPage) {
    scenario('First tutorial step : Create the first product ', () => {
      scenario('Step 1/5', client => {
        test('should click on "Start" button', () => client.waitForExistAndClick(OnBoarding.start_button));
        test('should check that the current step has started', () => client.checkAttributeValue(OnBoarding.welcomeSteps.tutorial_step.replace("%P", '0'), 'class', 'id -done'));
        test('should check the existence of the onboarding-tooltip', () => client.isExisting(OnBoarding.welcomeSteps.onboarding_tooltip, 2000));
        test('should check the first onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'Give your product a catchy name.'));
        test('should check that the step number is equal to "1" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '1/5'));
        test('should set the "Product name" input', () => client.waitAndSetValue(AddProductPage.product_name_input, 'productTest'));
      }, 'common_client');

      scenario('Step 2/5', client => {
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should check that the step number is equal to "2"', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '2', 'contain', 2000));
        test('should check the second onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'Fill out the essential details in this tab. The other tabs are for more advanced information.'));
        test('should select "Product with combinations"', () => client.waitForExistAndClick(AddProductPage.variations_type_button));
      }, 'common_client');

      scenario('Step 3/5 ', client => {
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should check that the step number is equal to "3" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '3', 'contain', 2000));
        test('should check the third  onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'Add one or more pictures so your product looks tempting!'));
        test('should upload the picture of product', () => client.uploadPicture('image_test.jpg', AddProductPage.picture));
      }, 'common_client');

      scenario('Step 4/5', client => {
        test('should click on "Next" button', () => client.scrollWaitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should check that the step number is equal to "4" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '4', 'contain', 2000));
        test('should check the fourth  onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'How much do you want to sell it for?'));
        test('should set the "Tax exclude" price', () => {
          return promise
            .then(() => client.scrollTo(AddProductPage.priceTE_shortcut, 50))
            .then(() => client.waitAndSetValue(AddProductPage.priceTE_shortcut, '50'));
        });
      }, 'common_client');

      scenario('Step 5/5', client => {
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should check that the step number is equal to "5"', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '5', 'contain', 3000));
        test('should check the fifth onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'Yay! You just created your first product. Looks good, right?'));
      }, 'common_client');
    }, 'common_client');
    scenario('Second Tutorial step : Give the shop an own identity', () => {
      scenario('Step 1/2', client => {
        test('should check that the current step has started', () => client.checkAttributeValue(OnBoarding.welcomeSteps.tutorial_step.replace("%P", '1'), 'class', 'id -done'));
        test('should click on "Next" button', () => client.scrollWaitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should check that the step number is equal to "1" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '1/2', 'contain', 1000));
        test('should check the first  onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'A good way to start is to add your own logo here!'));
        test('should upload the header logo', () => client.uploadPicture('image_test.jpg', OnBoarding.welcomeSteps.header_logo));
        test('should click on "Next" button', () => client.scrollWaitForExistAndClick(OnBoarding.welcomeSteps.next_button));
      }, 'common_client');

      scenario('Step 2/2 ', client => {
        test('should check that the step number is equal to "2" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '2/2', 'contain', 2000));
        test('should check the second onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'If you want something really special, have a look at the theme catalog!'));
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
      }, 'common_client');
    }, 'common_client');

    scenario('Third tutorial step : Get the shop ready for payments', () => {
      scenario('Step 1/2 ', client => {
        test('should check that the current step has started', () => client.checkAttributeValue(OnBoarding.welcomeSteps.tutorial_step.replace("%P", '2'), 'class', 'id -done', 'equal'));
        test('should check that the step number is equal to "1"', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '1/2', 'contain', 2000));
        test('should check the first onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'These payment methods are already available to your customers.', 'equal', 2000));
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
      }, 'common_client');

      scenario('Step 2/2 ', client => {
        test('should check that the step number is " 2/2"', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '2/2', 'contain', 2000));
        test('should check the second onboarding-tooltip message', () => client.checkTextValue(OnBoarding.welcomeSteps.message_value, 'And you can choose to add other payment methods from here!'));
      }, 'common_client');
    }, 'common_client');

    scenario('Fourth tutorial step : Choose the shipping solutions', client => {
      test('should check that the current step has started', () => client.checkAttributeValue(OnBoarding.welcomeSteps.tutorial_step.replace("%P", '3'), 'class', 'id -done', 'equal'));
      test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
      test('should discover the types of "Carriers" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '1/2', 'contain', 3000));
      test('should click on "Next" button', () => client.scrollWaitForExistAndClick(OnBoarding.welcomeSteps.next_button));
      test('should check that the step number is "2/2" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '2/2', 'contain', 2000));
      test('should check that the fifth tutorial step is done', () => client.checkAttributeValue(OnBoarding.welcomeSteps.tutorial_step.replace("%P", '4'), 'class', 'id -done', 'equal'));
    }, 'common_client');

    scenario('The fifth tutorial step ," Get the shop ready for payments" ', () => {
      scenario('Step 1/2 " Get the shop ready for payments" ', client => {
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should check that the step number is equal to "1" ', () => client.checkTextValue(OnBoarding.welcomeSteps.tooltip_step, '1/2', 'contain', 2000));
        test('should click on "Next" button', () => client.waitForExistAndClick(OnBoarding.welcomeSteps.next_button));
        test('should click on "Ready" button', () => client.waitForExistAndClick(OnBoarding.ready_button, 1000));
      }, 'common_client');
    }, 'common_client', true);
  },
  openAllMenuLinkBO: function (gui) {
    scenario('Go to "Dashboard" page in the Back Office', client => {
      this.clickOnMenuLinksAndCheckElement(client, gui, "", Menu.dashboard_menu, PagesForm.calendar_form, "Dashboard");
    }, 'common_client');
    scenario('Check all the menu links of "SELL"', () => {
      scenario('Check all the menu links of "Orders" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.orders_submenu, PagesForm.Orders.order_form, "Orders");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.invoices_submenu, PagesForm.Orders.invoice_form, "Invoices");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.credit_slips_submenu, PagesForm.Orders.order_slip_form, "Credit slips");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.delivery_slips_submenu, PagesForm.Orders.delivery_form, "Delivery slips");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Orders.orders_menu, Menu.Sell.Orders.shopping_carts_submenu, PagesForm.Orders.shopping_cart_form, "Shopping cart");
      }, 'common_client');
      scenario('Check all the menu links of "Catalog" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.products_submenu, PagesForm.Catalog.product_form, "Catalog", "Products");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.category_submenu, PagesForm.Catalog.category_form, "Category");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.monitoring_submenu, PagesForm.Catalog.empty_category_form, "Monitoring");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu, PagesForm.Catalog.attribute_form, "Attributes & Features", "Attributes");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.attributes_features_submenu, PagesForm.Catalog.feature_form, "Attributes & Features", "Features", 0, Menu.Sell.Catalog.feature_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu, PagesForm.Catalog.manufacturer_form, "Brands & Suppliers", "Brands");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.manufacturers_submenu, PagesForm.Catalog.supplier_form, "Brands & Suppliers", "Suppliers", 0, Menu.Sell.Catalog.supplier_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.files_submenu, PagesForm.Catalog.attachment_form, "Files");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.discounts_submenu, PagesForm.Catalog.cart_rule_form, "Discounts", "Carte Rules");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.discounts_submenu, PagesForm.Catalog.cart_price_rule_form, "Discounts", "Carte Price Rules", 0, Menu.Sell.Catalog.catalog_price_rules_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu, PagesForm.Catalog.search_box, "Stocks", "Stock", 4000);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Catalog.catalog_menu, Menu.Sell.Catalog.stocks_submenu, PagesForm.Catalog.search_box, "Stocks", "Movements", 0, Menu.Sell.Catalog.movement_tab);
      }, 'common_client');
/*      scenario('Check all the menu links of "Customers" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Customers.customers_menu, Menu.Sell.Customers.customers_submenu, PagesForm.Customers.customer_form, "Customers");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Customers.customers_menu, Menu.Sell.Customers.addresses_submenu, PagesForm.Customers.address_form, "Addresses");
      }, 'common_client');
      scenario('Check all the menu links of "Customer Service" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.customer_service_submenu, PagesForm.CustomerService.customer_service_form, "Customer Service");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.order_messages_submenu, PagesForm.CustomerService.order_message_form, "Order messages");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.CustomerService.customer_service_menu, Menu.Sell.CustomerService.merchandise_returns_submenu, PagesForm.CustomerService.order_returns_form, "Merchandise returns");
      }, 'common_client');
      scenario('Check the menu links of "Stats" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Sell.Stats.stats_menu, PagesForm.Stats.stats_dashboard, "Stats");
      }, 'common_client');*/
    }, 'common_client');
/*    scenario('Check all the menu links of "IMPROVE"', () => {
      scenario('Check all the menu links of "Modules" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu, PagesForm.Modules.modules_list, "Modules", "Selection", 5000);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu, PagesForm.Modules.modules_search_input, "Modules", "Installed modules", 0, Menu.Improve.Modules.installed_modules_tabs);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_services_submenu, PagesForm.Modules.modules_to_configure, "Modules", "Notifications", 0, Menu.Improve.Modules.notifications_tabs);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Modules.modules_menu, Menu.Improve.Modules.modules_catalog_submenu, PagesForm.Modules.addons_search_form, "Modules catalog");
      }, 'common_client');
      scenario('Check all the menu links of "Design" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Design.design_menu, Menu.Improve.Design.theme_logo_submenu, PagesForm.Design.design_form, "Design");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Design.design_menu, Menu.Improve.Design.theme_catalog_submenu, PagesForm.Design.catalog_theme, "Theme catalog");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Design.design_menu, Menu.Improve.Design.pages_submenu, PagesForm.Design.cms_category_form, "Pages");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Design.design_menu, Menu.Improve.Design.positions_submenu, PagesForm.Design.position_filter_form, "Positions");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Design.design_menu, Menu.Improve.Design.image_settings_submenu, PagesForm.Design.image_type_form, "Image settings");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Design.design_menu, Menu.Improve.Design.link_widget_submenu, PagesForm.Design.configuration_link_form, "Link widget");
      }, 'common_client');
      scenario('Check all the menu links of "Shipping" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping.carriers_submenu, PagesForm.Shipping.carrier_form, "Shipping", "Carrier");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Shipping.shipping_menu, Menu.Improve.Shipping.preferences_submenu, PagesForm.Shipping.delivery_form, "Delivery");
      }, 'common_client');
      scenario('Check all the menu links of "Payment" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Payment.payment_menu, Menu.Improve.Payment.payment_methods_submenu, PagesForm.Payment.recommended_payment, "Payment");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.Payment.payment_menu, Menu.Improve.Payment.preferences_submenu, PagesForm.Payment.currency_form, "Currency");
      }, 'common_client');
      scenario('Check all the menu links of "International" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu, PagesForm.International.localization_pack_select, "International", "Localization", 2000);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu, PagesForm.International.languages_form, "International", "Languages", 2000, Menu.Improve.International.languages_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu, PagesForm.International.currency_form, "International", "Currencies", 2000, Menu.Improve.International.currencies_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.localization_submenu, PagesForm.International.geolocation_by_address, "International", "Geolocation", 2000, Menu.Improve.International.geolocation_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu, PagesForm.International.zone_form, "Locations", "Zones");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu, PagesForm.International.country_form, "Locations", "Countries", 0, Menu.Improve.International.countries_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu, PagesForm.International.state_form, "Locations", "States", 0, Menu.Improve.International.states_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu, PagesForm.International.tax_from, "Taxes", "Taxes");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu, PagesForm.International.tax_rules_from, "Taxes", "Tax Rules", 0, Menu.Improve.International.taxe_rules_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Improve.International.international_menu, Menu.Improve.International.translations_submenu, PagesForm.International.translation_form, "Translations");
      }, 'common_client');
    }, 'common_client');*/
/*    scenario('Check all the menu links of "CONFIGURE"', () => {
      scenario('Check all the menu links of "Shop Parameters" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.general_submenu, PagesForm.ShopParameters.general_form, "Shop Parameters", "General");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.general_submenu, PagesForm.ShopParameters.general_form, "Shop Parameters", "Maintenance", 0, Menu.Configure.ShopParameters.maintenance_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.order_settings_submenu, PagesForm.ShopParameters.order_settings_form, "Order settings");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.order_settings_submenu, PagesForm.ShopParameters.statuses_form, "Order settings", "Statuses", 0, Menu.Configure.ShopParameters.statuses_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.product_settings_submenu, PagesForm.ShopParameters.product_settings_form, "Product Parameters");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.customer_settings_submenu, PagesForm.ShopParameters.customers_form, "Customer Parameters", "Customers");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.customer_settings_submenu, PagesForm.ShopParameters.groups_form, "Customer Parameters", "Groups", 0, Menu.Configure.ShopParameters.groups_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.customer_settings_submenu, PagesForm.ShopParameters.titles_form, "Customer Parameters", "Titles", 0, Menu.Configure.ShopParameters.titles_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu, PagesForm.ShopParameters.contact_form, "Contact", "Contacts");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.contact_submenu, PagesForm.ShopParameters.stores_form, "Contact", "Stores", 0, Menu.Configure.ShopParameters.stores_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.traffic_seo_submenu, PagesForm.ShopParameters.meta_form, "Traffic & SEO", "SEO & URLs");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.traffic_seo_submenu, PagesForm.ShopParameters.search_engine_form, "Traffic & SEO", "Search Engines", 0, Menu.Configure.ShopParameters.search_engines_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.traffic_seo_submenu, PagesForm.ShopParameters.index_form, "Traffic & SEO", "Referres", 0, Menu.Configure.ShopParameters.referrers_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.search_submenu, PagesForm.ShopParameters.alias_form, "Search", "Search box");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.search_submenu, PagesForm.ShopParameters.tags_form, "Search", "Tags", 0, Menu.Configure.ShopParameters.tags_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.ShopParameters.shop_parameters_menu, Menu.Configure.ShopParameters.merchant_expertise_submenu, PagesForm.ShopParameters.gamification_box, "Merchant Expertise", "Gamification");
      }, 'common_client');
      scenario('Check all the menu links of "Informations" in the Back Office', client => {
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.information_submenu, PagesForm.AdvancedParameters.check_configuration_box, "Informations");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.performance_submenu, PagesForm.AdvancedParameters.debug_mode_select, "Performance");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.administration_submenu, PagesForm.AdvancedParameters.administration_form, "Administration");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.email_submenu, PagesForm.AdvancedParameters.mail_form, "Email");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.import_submenu, PagesForm.AdvancedParameters.preview_import_form, "Import");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.team_submenu, PagesForm.AdvancedParameters.employee_form, "Team", "Employees");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.team_submenu, PagesForm.AdvancedParameters.profiles_form, "Team", "Profiles", 0, Menu.Configure.AdvancedParameters.profiles_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.team_submenu, PagesForm.AdvancedParameters.permissions_form, "Team", "Permissions", 0, Menu.Configure.AdvancedParameters.permissions_tab);
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.database_submenu, PagesForm.AdvancedParameters.request_sql_form, "Database", "Request sql");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.logs_submenu, PagesForm.AdvancedParameters.log_form, "Logs");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.webservice_submenu, PagesForm.AdvancedParameters.webservice_form, "WebService");
        this.clickOnMenuLinksAndCheckElement(client, gui, Menu.Configure.AdvancedParameters.advanced_parameters_menu, Menu.Configure.AdvancedParameters.multistore_submenu, PagesForm.AdvancedParameters.multistore_form, "Multistore");
      }, 'common_client');
    }, 'common_client');*/
  }
};
