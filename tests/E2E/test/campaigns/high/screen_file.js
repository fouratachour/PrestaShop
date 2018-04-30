const {AccessPageBO} = require('../../selectors/BO/access_page');
const {Menu} = require('../../selectors/BO/menu.js');
const {PagesForm} = require('../../selectors/BO/pages_form.js');
const common = require('../common_scenarios/shop_parameters');
scenario('BackOfficetest', () => {

  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
  }, 'common_client');
  // Look same
  scenario('take screen shot', client => {
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    test('should take backoffice screen shot 1', () => client.takeScreenshot('checkImageLookSame1.png'));
    test('should wait for recharge de la page', () => client.pause(3000));
    test('should take backoffice screen shot 2', () => client.takeScreenshot('checkImageLookSame2.png'));
    test('should check the difference between both screen shot', () => client.checkImageLookSame('checkImageLookSame1.png', 'checkImageLookSame2.png'));
    test('should login successfully in the Back Office', () => client.signOutBO(AccessPageBO));
  }, 'common_client');
//Imagediff2
  scenario('take screen shot', client => {
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    test('should take backOffice screen shot 1', () => client.takeScreenshot('checkImageimagdiff1.png'));
    test('should wait for recharge de la page', () => client.pause(3000));
    test('should take backOffice screen shot 2', () => client.takeScreenshot('checkImageimagdiff2.png'));
    test('should check the difference between both screen shot', () => client.checkImageimagdiff('checkImageimagdiff1.png', 'checkImageimagdiff2.png'));
    test('should login successfully in the Back Office', () => client.signOutBO(AccessPageBO));
  }, 'common_client');
  //Resemble JS
  scenario('take screen shot', client => {
    test('should login successfully in the Back Office', () => client.signInBO(AccessPageBO));
    test('should take backOffice screen shot 1', () => client.takeScreenshot('checkImageRessamble1.png'));
    test('should wait for recharge de la page', () => client.pause(3000));
    test('should take backOffice screen shot 1', () => client.takeScreenshot('checkImageRessamble2.png'));
    test('should check the dashboard', () => client.asyncFunction('checkImageRessamble1.png', 'checkImageRessamble2.png'));
    test('should login successfully in the Back Office', () => client.signOutBO(AccessPageBO));
  }, 'common_client');


}, 'common_client', true);