myMngtHierarchyApp.directive( 'editNodeInPlace', function() {
    return {
   	restric: 'E',
    	scope: {
   		 	  select: '&', // IS CALLED WHEN USER CLICK ON THE NODE "INPUT FILE"
          value: '@',
          update: '&',
          isSelectedCondition: '@',
          validateValue: '&',
          editable: '@',
          editAfterCreation: '@',
          beingEdit: '&'
    	},
    	templateUrl: 'js/views/accounts.html',

    	link: function ( $scope, $element, attrs )
      {

        var originalNodeValue, savingValue = false;
      
        var inputElement = angular.element( $element.children()[1] );

        $scope.valid = true;

    		$scope.selectedNode = function()
        {
    			$scope.select();
    		};

    		$scope.getSelectedClass = function()
        {
            return  isSelected() ? "selected" : "";
        };

        $scope.modifiedNodeName = function()
        {
          if(isEditable())
          {
            savingValue = false;
            originalNodeValue = $scope.value;
            $element.addClass('active');
            inputElement[0].focus();
            $scope.beingEdit();
          }
        };

        $scope.fireBlurred = function()
        {
            cancelEditing();
        };

        var isEditable = function()
        {
            return $scope.editable === 'true';
        };

        var validateInput = function(){
            var validatedResult = $scope.validateValue({value: $scope.value});
            if(validatedResult.value)
            {
              $scope.errorMessage = "";
              $scope.valid = true;
            }
            else 
            {
              $scope.errorMessage = validatedResult.message;
              $scope.valid = validatedResult.valid;
            }
            return validatedResult;
        };

        $scope.fireEditing = function(event)
        {
            var validInput = validateInput();

            if(event.keyCode === 13)
            {
                if(!validInput.valid) {
                    event.preventDefault();
                    return;
                }
                
                cancelEditingEvent(event);
                originalNodeValue = $scope.value;
                $scope.update({newName: $scope.value});
            }
            else if(event.keyCode === 27)
            {
                cancelEditing(event);
            }
        };

        var isSelected = function()
        {
            return $scope.isSelectedCondition === "true";
        };

        var cancelEditingEvent = function(event)
        {
          savingValue = false;
          if (angular.isDefined(event))
          {
              event.preventDefault();
          }
          
          $element.removeClass('active');
        };

        var cancelEditing = function(event)
        {
          $scope.valid = true;
          cancelEditingEvent(event);
          $scope.value = originalNodeValue;
          $scope.update({newName: $scope.value});
        };

        $scope.init = function(){
          if($scope.editAfterCreation === 'true')
          {
            $scope.modifiedNodeName();
            validateInput();
          }
        };
        $scope.init();
    }
	}; 
});