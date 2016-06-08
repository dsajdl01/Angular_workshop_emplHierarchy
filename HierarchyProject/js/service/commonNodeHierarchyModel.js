myMngtHierarchyApp.factory('commonNodeHeirarchyModel',[ function(){
	return new commonNodeHeirarchyModel();
}]);

function commonNodeHeirarchyModel(){
	var self = this;
	self.rootNode = {};
	self.nodesDetails = {};
	self.selectedTopNode =  {};
	self.allNodesDetails =[];
	self.userSelectedNode = {};
	self.editingNode = {};
	self.isUserAssumeIdentity = false;
	self.hasPersonalData = false;
	self.user = {
		"id": null,
		"username": null,
		"isLogin": false,
		"administrator": false
	}
}