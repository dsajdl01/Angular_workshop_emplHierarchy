myMngtHierarchyApp.factory('calculateTimeService',[ function(){
	return new calculateTimeService();
}]);

function calculateTimeService(){

	var self = this;
	
	self.getCurrentDate = function()
	{
		var d = new Date();
   		var month = '' + (d.getMonth() + 1);
		var day = '' + d.getDate();
		var year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return day+"/"+month+"/"+year;
	};

	self.calculateDiffDaysToCurrentDayFromFormatDayAndYear = function(format, yearsWorking)
	{
		var day   = getDay(format);
    	var month  = getMonth(format);
   	 	var year   = getYear(format);
   	 	var currentYear = new Date().getFullYear();
   	 	if(year > currentYear){
			throw  "Starting year cannot be greater that current year!";
		}
   	 	var daysToCurerntDate = calculateDaysFromGivenDayToCurrentDay( new Date(year, month-1, day));
   	 	var yearsDay = calculateDaysFromGivenYeatToThisYear(year, currentYear , yearsWorking, month, new Date().getMonth()+1);
   	 	return daysToCurerntDate - yearsDay;
	};

	self.calculateDiffYearToCurrentDayFromFormatDay = function(format)
	{
    	var day   = getDay(format);
    	var month  = getMonth(format);
   	 	var year   = getYear(format);
   	 	return calculateYearFromGivenDateToCurrentDay(month, day, year);
	}

	var calculateDaysFromGivenDayToCurrentDay = function(startDay)
	{
		var timeDiff = Math.abs(new Date().getTime() - startDay.getTime());   
    	return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	}

	var calculateDaysFromGivenYeatToThisYear = function(startYear, currentYear, yearsWorking, month, currentMonths)
	{
		var leapYearDays = 0;
		for(var i = startYear; i <= currentYear; i++){
			if(leapYear(i)){
				leapYearDays++;
			}
		}
		if(month <= 2 && leapYear(currentYear) && currentMonths <= 2 && (leapYear(startYear)) ) leapYearDays --;
		else if(leapYear(currentYear) && currentMonths > 2 && month > 2 && (leapYear(startYear))) leapYearDays--;
		return (yearsWorking * 365) + leapYearDays;
	}


	var leapYear = function(year)
	{
  		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	var calculateYearFromGivenDateToCurrentDay = function (Month, Day, Year)
	{
		var todayDate = new Date();
	   	var todayYear = todayDate.getFullYear();
	  	var todayMonth = todayDate.getMonth();
	  	var todayDay = todayDate.getDate();
	  	var age = todayYear - Year;

		if (todayMonth < Month - 1){
		    age--;
		}

		if (Month - 1 == todayMonth && todayDay < Day){
		    age--;
		}
		return age;
	};

	var getDay = function(format)
	{
		return parseInt(format.substring(0,2));
	};

	var getMonth = function(format)
	{
		return parseInt(format.substring(3,5));
	};

	var getYear = function(format)
	{
		return parseInt(format.substring(6,10));
	};
}
