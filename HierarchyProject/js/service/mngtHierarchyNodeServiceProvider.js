myMngtHierarchyApp.factory('mngtHierarchyNodeServiceProvider',
	['hierarchyNodeService','commonNodeHeirarchyModel', 'modalDialogBoxService', '$location', 
		function(hierarchyNodeService, commonNodeHeirarchyModel, modalDialogBoxService, $location){
		return new mngtHierarchyNodeServiceProvider(hierarchyNodeService, commonNodeHeirarchyModel, modalDialogBoxService, $location);
}]);

function mngtHierarchyNodeServiceProvider(hierarchyNodeService, commonNodeHeirarchyModel, modalDialogBoxService, $location) {
		var self = this;
	
		self.loadTopNode = function(callBack)
		{
			hierarchyNodeService.getSelectedNode(
			 	function(rootNode) {
			 		commonNodeHeirarchyModel.rootNode = rootNode;
			 		callBack(true);
			 	},
			 	function(fail){
			 		callBack(false);
			 	}
			);
		};
		
		self.loadNodeDetails = function(callback)
		{
			hierarchyNodeService.getNodesDetails(
				function(nodesDetails) {
			 		commonNodeHeirarchyModel.nodesDetails = nodesDetails;
			 		callback(true);
			 	},
			 	function(fail) {
			 		callback(false);
			 	}
			);
		};

		self.displayAssumeDialogBox = function( path, callBack )
		{
			modalDialogBoxService.setTemplate("js/views/assumeIdentityTemplate.html");
			modalDialogBoxService.shareModalData = {
				pathToEachNode: path
			};

			modalDialogBoxService.notify = function(selectedPath)
			{
				if(!selectedPath)
				{
					callBack(selectedPath);
				}
				else
				{
					saveSelectedNode(selectedPath);
    	            callBack(getSelectedNodeName(selectedPath));
    	        }
            };
			modalDialogBoxService.showDialog();
		};

		self.displayAboutDialogBox = function()
		{
			modalDialogBoxService.setTemplate("js/views/aboutTemplate.html");
			modalDialogBoxService.showDialog();
		};

		self.getSelectedNodeDetails = function(selectedNodeId)
		{
			for(var i = 0; i < commonNodeHeirarchyModel.nodesDetails.length; i++)
			{
				if(commonNodeHeirarchyModel.nodesDetails[i].id == selectedNodeId) {
					return commonNodeHeirarchyModel.nodesDetails[i];
				};
			};
			return null;
		};

		self.checkIfPersonalDetailsAreInseared = function(){
			var selectedDetails =	self.getSelectedNodeDetails(commonNodeHeirarchyModel.selectedTopNode.id);
			if(selectedDetails.dob == null || selectedDetails.email == null){
				commonNodeHeirarchyModel.hasPersonalData = true;
				$location.path('/personalInfo');
			}
		}

		var getSelectedNodeName = function(selectedPath)
		{
			var nodeName = selectedPath.split(">");
			return nodeName[nodeName.length - 1];
		};

		var saveSelectedNode = function(selectedPath)
		{
			for(var i = 0; i < commonNodeHeirarchyModel.allNodesDetails.length; i++)
			{
				if(commonNodeHeirarchyModel.allNodesDetails[i].pathToNode == selectedPath) {
					commonNodeHeirarchyModel.selectedTopNode = commonNodeHeirarchyModel.allNodesDetails[i];
					commonNodeHeirarchyModel.selectedTopNode.isRootNode = true;
					commonNodeHeirarchyModel.userSelectedNode = commonNodeHeirarchyModel.allNodesDetails[i];
					break;
				};
			};
		};
};
	
