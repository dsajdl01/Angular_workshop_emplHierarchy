myMngtHierarchyApp.controller('myProfileContrller',['calculateTimeService', 'commonNodeHeirarchyModel', 'mngtHierarchyNodeServiceProvider',
				 function(calculateTimeService, commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider) {

	var self = this;

	self.showInputForms = false;

	self.init = function(){
		self.btnName = "Save";
		var emplDetails = mngtHierarchyNodeServiceProvider.getSelectedNodeDetails(commonNodeHeirarchyModel.userSelectedNode.id);
		self.employeeName = commonNodeHeirarchyModel.userSelectedNode.name;
		self.Access = commonNodeHeirarchyModel.userSelectedNode.access;
		self.dob = emplDetails.dob;
		self.email = emplDetails.email;
		self.position = emplDetails.possition;
		self.startDay = emplDetails.start;
		self.employeeFullName = emplDetails.fullname;
		self.hasAccess = doesUserHasAccess();
		self.oldPasswoord = null;
		self.newPassword = null;
		self.confirmPassword = null;
		setOriginalValues();
	}

	self.showPasswordFields =function(){
		self.showInputForms = (self.showInputForms) ? false : true;
		self.oldPasswoord = null;
		self.newPassword = null;
		self.confirmPassword = null;
	}

	self.makeChange = function(){
		
	}

	self.save = function(){
		commonNodeHeirarchyModel.hasPersonalData = false;
		console.log("self.commonNodeHeirarchyModel.hasPersonalData: ", commonNodeHeirarchyModel.hasPersonalData);
	}

	var setOriginalValues = function(){
		self.originalEmplName = self.employeeName;
		self.originalDob = self.dob;
		self.originalEmail = self.email;
		self.originalPosition = self.position
		self.originalStartDate = self.startDay;
		self.originalEmplFullName = self.employeeFullName;
	}

	var doesUserHasAccess = function(){
		return !(commonNodeHeirarchyModel.userSelectedNode.access == "admin" || commonNodeHeirarchyModel.userSelectedNode.access == "viewer");
	}

}]);