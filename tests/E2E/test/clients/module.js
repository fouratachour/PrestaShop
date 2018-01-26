var CommonClient = require('./common_client');
global.moduleInfo = [];
global.moduleSort = [];

class Module extends CommonClient {

  getModuleAttr(selector, attr, index) {
    return this.client
      .getAttribute(selector.replace('%I', index + 1), attr)
      .then((name) => {
        moduleSort[index] = name.toLowerCase();
        moduleInfo[index] = name.toLowerCase();
      })
  }

  checkSortByName(length) {
    return this.client
      .pause(1000)
      .then(() => {
        this.client
          .waitUntil(function () {
            expect(moduleInfo.sort()).to.deep.equal(moduleSort)
          }, 1000 * length)
      });
  }

  checkSortByIncPrice(length) {
    return this.client
      .pause(1000)
      .then(() => {
        this.client
          .waitUntil(function () {
            expect(moduleInfo.sort(function (a, b) {
              return a - b;
            })).to.deep.equal(moduleSort)
          }, 1000 * length)
      });
  }

  checkSortDesc(length) {
    return this.client
      .pause(1000)
      .then(() => {
        this.client
          .waitUntil(function () {
            expect(moduleInfo.sort(function (a, b) {
              return a - b;
            }).reverse()).to.deep.equal(moduleSort)
          }, 1000 * length)
      });
  }
}

module.exports = Module;