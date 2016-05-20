myMngtHierarchyApp.controller('accountInfoController',[ '$scope', 'calculateTimeService', 'commonNodeHeirarchyModel', 'mngtHierarchyNodeServiceProvider',
				 function($scope, calculateTimeService, commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider) {
	
	var self = this;

	self.possition = null;
	self.dob = null;
	self.startWorkingDay = null;
	self.comments = null;

	$scope.$watch(
		 function()
            {
				if(getSelectedNodeId())
				{
					selectedNodeObject = mngtHierarchyNodeServiceProvider.getSelectedNodeDetails(getSelectedNodeId());
					initializeVariables(selectedNodeObject);
				}
			}
	);
	
	var initializeVariables = function(selectedNodeObject)
	{
		self.possition = selectedNodeObject.possition;
		self.dob = selectedNodeObject.dob;
		self.age = calculateTimeService.calculateDiffYearToCurrentDayFromFormatDay(self.dob);
		self.startWorkingDay = selectedNodeObject.start;
		self.comments = selectedNodeObject.comments;
		self.yearsWorking = calculateTimeService.calculateDiffYearToCurrentDayFromFormatDay(self.startWorkingDay);
		self.daysWorking = calculateTimeService.calculateDiffDaysToCurrentDayFromFormatDayAndYear(self.startWorkingDay, self.yearsWorking);
	}

	var getSelectedNodeId = function()
	{
		return commonNodeHeirarchyModel.selectedTopNode.id;
	};
}]);