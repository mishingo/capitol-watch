'use strict';

describe('Controller: BillsCtrl', function () {

  // load the controller's module
  beforeEach(module('capitolwatchApp'));

  var BillsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillsCtrl = $controller('BillsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
