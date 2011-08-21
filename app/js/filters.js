/* http://docs.angularjs.org/#!angular.filter */
angular.directive('ng:delete', function(expression, compiledElement) {
    $(compiledElement).html('<input name="bob">')
})
