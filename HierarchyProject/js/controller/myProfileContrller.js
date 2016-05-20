myMngtHierarchyApp.controller('myProfileContrller',['calculateTimeService', 'commonNodeHeirarchyModel', 'mngtHierarchyNodeServiceProvider',
				 function(calculateTimeService, commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider) {
	
	var self = this;
	self.showInputForms = false;

	self.showPasswordFields =function(){
		self.showInputForms = (self.showInputForms) ? false : true;
	}

	self.makeChange = function(){
		
	}

	self.save = function(){
		commonNodeHeirarchyModel.hasPersonalData = false;
		console.log("self.commonNodeHeirarchyModel.hasPersonalData: ", commonNodeHeirarchyModel.hasPersonalData);
	}

}]);