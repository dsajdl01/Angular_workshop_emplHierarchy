myMngtHierarchyApp.controller('aboutController', ['modalDialogBoxService', 
		function(modalDialogBoxService){

	var self = this;

	self.close = function(){
		modalDialogBoxService.hideDialog();
	};

}]);