myMngtHierarchyApp.controller('helpMyProfileController', [ 'commonNodeHeirarchyModel', 'mngtHierarchyNodeServiceProvider', '$location',
	function(commonNodeHeirarchyModel, mngtHierarchyNodeServiceProvider, $location){

		var self = this;

		self.init = function()
		{
			self.btnName = "Save";
			self.internalErrorMessage = null;
			var emplDetails = mngtHierarchyNodeServiceProvider.getSelectedNodeDetails(commonNodeHeirarchyModel.userSelectedNode.id);
			self.dob = emplDetails.dob;
			self.email = emplDetails.email;
		}

		self.save = function(){
			if(self.dob && self.email)
			{
				commonNodeHeirarchyModel.hasPersonalData = false;
				var emplDetails = mngtHierarchyNodeServiceProvider.getSelectedNodeDetails(commonNodeHeirarchyModel.userSelectedNode.id);
				emplDetails.dob = self.dob;
				emplDetails.email = self.email;
				$location.path('/homeViewAccount');
			} 
			else 
			{
				// it should never happend.
				self.internalErrorMessage = "Your data has not been saved. Please, check your data and try it again."
			} 	
		}
}]);		