describe('Service: calculateTimeService', function() {

	var service;
	var sevenDayAgo = new Date();
	sevenDayAgo.setDate(sevenDayAgo.getDate() - 5);
	sevenDayAgo = sevenDayAgo.toLocaleString();

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(inject(function($injector) {
		service = $injector.get('calculateTimeService');
	}));

	it('should be defined', function() {
        expect(service).toBeDefined();
    });

    it('should return today date in format dd/mm/yyy.', function(){
    	// getting current date
    	var today = new Date();
    	var dateArray = today.toLocaleString().split(",");

    	// getting date from getCurrentDate() function
    	swopDayWithMonth(dateArray[0]);
    	var dateExcepted = splitDayMonthYearToArry(dateArray[0]);
    	var received = splitDayMonthYearToArry(service.getCurrentDate());
    	
    	expect(received.length).toBe(dateExcepted.length);
    	expect(received[0]).toContain(dateExcepted[1]); // months 
    	expect(received[1]).toContain(dateExcepted[0]); // day
    	expect( received[2] ).toEqual( dateExcepted[2] );  // year
    });

    it('shoud calculate how many days are missing to complete starting', function(){
    	try {
	    	var day7 = sevenDayAgo.split(",");
	    	expect(service.calculateDiffDaysToCurrentDayFromFormatDayAndYear(swopDayWithMonth(day7[0]), 0)).toBe(6);
			var oneYear = updateYear(day7[0], 1);
			expect(service.calculateDiffDaysToCurrentDayFromFormatDayAndYear(swopDayWithMonth(oneYear), 1)).toBe(6);
			var oneYear = updateYear(day7[0], 2);
			expect(service.calculateDiffDaysToCurrentDayFromFormatDayAndYear(swopDayWithMonth(oneYear), 2)).toBe(6);
			var oneYear = updateYear(day7[0], 3);
			expect(service.calculateDiffDaysToCurrentDayFromFormatDayAndYear(swopDayWithMonth(oneYear), 3)).toBe(6);
			var oneYear = updateYear(day7[0], 4);
			expect(service.calculateDiffDaysToCurrentDayFromFormatDayAndYear(swopDayWithMonth(oneYear), 4)).toBe(6);
			var oneYear = updateYear(day7[0], 5);
			expect(service.calculateDiffDaysToCurrentDayFromFormatDayAndYear(swopDayWithMonth(oneYear), 5)).toBe(6);
		} catch (error) {
		} 	
	});

    it('should throw exception when year is greater then current year', function(){
    	var currentYear = new Date().getFullYear();
    	try {
	    	service.calculateDiffDaysToCurrentDayFromFormatDayAndYear("01/01/"+(currentYear+1), 0);
	    } catch (error) {
	    	expect(error).toEqual("Starting year cannot be greater that current year!");
        }
    });

    it('should give a number of years from given date', function(){
    	var day7 = sevenDayAgo.split(",");
		var fourYear = updateYear(day7[0], 4);
		expect(service.calculateDiffYearToCurrentDayFromFormatDay(swopDayWithMonth(fourYear))).toBe(4);
		var  plus7 = new Date();
		plus7.setDate(plus7.getDate() + 1);
		plus7 = plus7.toLocaleString();
		plus7 = plus7.split(",");
		fourYear = updateYear(plus7[0], 4);
		expect(service.calculateDiffYearToCurrentDayFromFormatDay(swopDayWithMonth(fourYear))).toBe(3);

    })

    /**********************************
	***   Private help functions	***
    ***********************************/
	var splitDayMonthYearToArry = function(date){
		return date.split("/");
	};

    var swopDayWithMonth = function(date){
    	var dateArr = splitDayMonthYearToArry(date);
    	return addZero(dateArr[1]) +"/"+addZero(dateArr[0])+"/"+dateArr[2];
    };

    var updateYear = function(date, number){
    	var dateArr = splitDayMonthYearToArry(date);
    	var newYear = Number(dateArr[2]) - number;
    	return dateArr[0]+"/"+dateArr[1]+"/"+newYear;
    }

    var addZero = function(valueStr){
    	return (valueStr.length < 2) ? '0' + valueStr : valueStr;
    };
});