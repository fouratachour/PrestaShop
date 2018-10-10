let CommonClient = require('./common_client');

class Suppliers extends CommonClient {

  addMetaKeywords(selector) {
    return this.client
      .waitForVisible(selector, 90000)
      .setValue(selector, "key words")
      .keys('Enter')
  }

  clickOnAction(groupActionSelector, actionSelector, action = 'edit') {
    if (action === 'delete') {
      return this.client
        .waitForExistAndClick(groupActionSelector)
        .waitForExistAndClick(actionSelector)
        .alertAccept()
    } else {
      return this.client
        .waitForExistAndClick(groupActionSelector)
        .waitForExistAndClick(actionSelector)
    }
  }
}

module.exports = Suppliers;
