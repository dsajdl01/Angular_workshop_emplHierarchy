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

		self.getLoginPage = function(callback){
			modalDialogBoxService.setTemplate("js/views/login.html");
			modalDialogBoxService.shareModalData = {}
			modalDialogBoxService.notify = function(user)
			{
				console.log("user in provider: ", user);
				callback(user);
            };
			modalDialogBoxService.showDialog();
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
					saveSelectedNodeFromPath(selectedPath);
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

		self.getLoginAsTopNode = function(){
			saveSelectedNodeFromId(commonNodeHeirarchyModel.user.id);
			return commonNodeHeirarchyModel.selectedTopNode.name
		}

		self.checkIfPersonalDetailsAreInseared = function(){
			var selectedDetails =	self.getSelectedNodeDetails(commonNodeHeirarchyModel.selectedTopNode.id);
			if(selectedDetails.dob == null || selectedDetails.email == null){
				commonNodeHeirarchyModel.hasPersonalData = true;
				$location.path('/personalInfo');
			}
		}

		var getNode = function(node, id){
			if(node.id == id) return node;
			var children = node.child
			var res = null
				for(var i = 0; res == null && i < children.length; i++){
					res = getNode(children[i], id);
				}
			return res;
		}

		var getSelectedNodeName = function(selectedPath)
		{
			var nodeName = selectedPath.split(">");
			return nodeName[nodeName.length - 1];
		};

		var saveSelectedNodeFromPath = function(selectedPath)
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

		var saveSelectedNodeFromId = function(userId){
			var topNode = commonNodeHeirarchyModel.rootNode[0];
			var selectedNode = (topNode.id == userId)? topNode : getNode(topNode, userId);
			commonNodeHeirarchyModel.selectedTopNode = selectedNode;
			commonNodeHeirarchyModel.selectedTopNode.isRootNode = true;
			commonNodeHeirarchyModel.userSelectedNode = selectedNode;
			console.log("node:", selectedNode);
		}
};
	
