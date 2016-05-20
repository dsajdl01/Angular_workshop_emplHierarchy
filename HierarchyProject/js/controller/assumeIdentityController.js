'use strict';
myMngtHierarchyApp.controller('assumeIdentityController',['modalDialogBoxService',
	function(modalDialogBoxService) {
	
	var self = this;
	self.showMessage = false;
	self.allPath = modalDialogBoxService.shareModalData.pathToEachNode;
	self.selectedNode = self.allPath[0];

	self.getSelectedValue = function(selectedPath)
	{	
		if(selectedPath !== "[Assume Identity]")
		{
			self.showMessage = false;
			modalDialogBoxService.notifyAndHide(selectedPath);
		} 
		else
		{
			self.showMessage = true;
		}
	};

	self.cancel = function ()
	{
		modalDialogBoxService.notifyAndHide(false);
	}
}]);