'use strict';
myMngtHierarchyApp.directive('dateValidation', ['$q',function($q) {
  return {
	restrict: 'A',
    require: 'ngModel',
    link: function(scope, elm, attrs, ngModel)
    {
      ngModel.$asyncValidators.uniqueStartDay = function(modelValue, viewValue)
      {
    		  var controller = scope.$eval(attrs.dateValidation).ctrl;
    	    var expression = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
        
          if (controller.origineStartDay === viewValue)
          {
              controller.dateErrorMessage = false;
              ngModel.$setValidity('dateValidation', true);
          }
          else
          {
              var res = new RegExp(expression).test(viewValue);
              
              if(res)
              {
                res = isDateLessOrEqualToCurrentDate(viewValue, controller);
              }
              else
              {
                controller.dateErrorMessage = "Invalid Date! Date must follow dd/MM/YYYY.";
              }
              ngModel.$setValidity('dateValidation', res );
          }
          return $q.when([]);
      };

      var isDateLessOrEqualToCurrentDate= function(inputDate, ctrl)
      {
          if(inputDate.length != 10)
          {
            ctrl.dateErrorMessage = "Invalid Date! Date must follow dd/MM/YYYY.";
            return false;
          }
          var input = new Date(swopDayWithMonth(inputDate));
          var todaysDate = new Date();
          if(input.setHours(0,0,0,0) <= todaysDate.setHours(0,0,0,0))
          {
            return true;
          }
          else
          {
            ctrl.dateErrorMessage = "Invalid Date! Date is greater then current date.";
            return false;
          }
      }
      
      var swopDayWithMonth = function(date)
      {
            var dateArr = date.split("/");
            return dateArr[1] +"/"+dateArr[0]+"/"+dateArr[2];
      }
    }
  }
}]);
