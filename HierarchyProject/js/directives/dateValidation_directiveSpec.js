'use strict';
describe('directive: dateValidation', function() {

	 beforeEach(module('myMngtHierarchyApp'));

	 var elm, scope, form, date = "02/02/2016";

	 beforeEach(inject(function($rootScope, $compile) {

 		scope = $rootScope.$new();

        scope.formCtrl = {
            origineStartDay: date
        };

        elm = angular.element(
            '<form name="form">' +
                '<input  ' +
                    'date-validation="{ctrl:formCtrl}"' +
                    'name="startDay"' +
                    'ng-model="formCtrl.startDay"' +
                    '/>' +
                '</form>');

        scope.model = {startDay: date };

        elm = $compile(elm)(scope);
        form = scope.form;
	 }));

	it('should return false when user input same date', function ()
    {
        form.startDay.$setViewValue(date);
        scope.$digest();

        expect(scope.formCtrl.origineStartDay).toEqual(date);
        expect(scope.formCtrl.startDay).toEqual(date);
        expect(scope.formCtrl.dateErrorMessage).toBeFalsy();
        console.log("scope.model: ", scope.model);
        expect(scope.model.startDay).toEqual(date);
        expect(form.startDay.$invalid).toBe(false);
    });

	it('should return false when user input valid date', function()
    {
		form.startDay.$setViewValue("28/09/2014");
		scope.$digest();

		expect(scope.formCtrl.origineStartDay).toEqual(date);
        expect(scope.formCtrl.startDay).toEqual("28/09/2014");
        expect(scope.formCtrl.dateErrorMessage).toBeFalsy();
        expect(scope.model.startDay).toEqual(date);
        expect(form.startDay.$invalid).toBe(false);
	}); 

	it('should return true when user input invalid date', function()
    {
		form.startDay.$setViewValue("02.02.2015");
		scope.$digest();

		expect(scope.formCtrl.origineStartDay).toEqual(date);
        expect(scope.formCtrl.startDay).toEqual("02.02.2015");
        expect(scope.formCtrl.dateErrorMessage).toEqual("Invalid Date! Date must follow dd/MM/YYYY.");
        expect(scope.model.startDay).toEqual(date);
        expect(form.startDay.$invalid).toBe(true);
	}); 

	it('should return true when user input invalid date II', function()
    {
		form.startDay.$setViewValue("02/02/15");
		scope.$digest();

		expect(scope.formCtrl.origineStartDay).toEqual(date);
        expect(scope.formCtrl.startDay).toEqual("02/02/15");
        expect(scope.formCtrl.dateErrorMessage).toEqual("Invalid Date! Date must follow dd/MM/YYYY.");
        expect(scope.model.startDay).toEqual(date);
        expect(form.startDay.$invalid).toBe(true);
	}); 

	it('should return true when user input valid date that is greater then current date', function()
    {	
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 5);
		var plusFiveDays = currentDate.toLocaleString();
		var plusFiveDaysArray = plusFiveDays.split(",");
		var fiveDateUp = swopDayWithMonth(plusFiveDaysArray[0]);
		console.log("sevenDayAgo: ", fiveDateUp);
				
		form.startDay.$setViewValue(fiveDateUp);
		scope.$digest();

		expect(scope.formCtrl.origineStartDay).toEqual(date);
        expect(scope.formCtrl.startDay).toEqual(fiveDateUp);
        expect(scope.formCtrl.dateErrorMessage).toEqual("Invalid Date! Date is greater then current date.");
        expect(scope.model.startDay).toEqual(date);
        expect(form.startDay.$invalid).toBe(true);
	}); 

    var swopDayWithMonth = function(date)
    {
    	var dateArr = date.split("/");
    	return addZero(dateArr[1]) +"/"+addZero(dateArr[0])+"/"+dateArr[2];
    };

    var addZero = function(valueStr) {
    	return (valueStr.length < 2) ? '0' + valueStr : valueStr;
    };
})