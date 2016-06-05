myMngtHierarchyApp.controller( 'mngtHierarchyController', ['mngtHierarchyNodeServiceProvider', 'commonNodeHeirarchyModel', 'calculateTimeService' ,'$location', '$rootScope', 'Auth', 'toaster',
					function(mngtHierarchyNodeServiceProvider, commonNodeHeirarchyModel, calculateTimeService, $location, $rootScope, Auth, toaster){

	var self = this;


	self.showPage = false;
	self.isTopNavigationBtnDisabled = false;
	self.commonNodeHeirarchyModel = commonNodeHeirarchyModel;
	self.accountTitle;
	self.todayDay = calculateTimeService.getCurrentDate();
	self.hasPermision = true;

	self.init = function()
	{
		var isAssumeIdentity = false;
		var isNodeLoaded = false;
		self.showPage = false;
		self.commonNodeHeirarchyModel.hasPersonalData = false;
		self.isTopNavigationBtnDisabled = false;
		self.commonNodeHeirarchyModel.isUserAssumeIdentity = false;
		if(!self.commonNodeHeirarchyModel.isLogIn){
			self.getLoginPage();
		} else
		{
			relocatePageToHomePage();
			mngtHierarchyNodeServiceProvider.loadTopNode(function(loadResponce){
				isNodeLoaded = loadResponce;
				if(!isNodeLoaded)
				{
					getPopUpToasterMessage();
					return;
				}
				mngtHierarchyNodeServiceProvider.loadNodeDetails(function(detailsResponce){
					isNodeLoaded = detailsResponce;
					if( isNodeLoaded )
					{
						self.getAssumeIdentityDialogBox(isNodeLoaded);
					}
					else
					{
						getPopUpToasterMessage();
					}
				});
			});
		}
	};

	self.getLoginPage = function(){
		self.commonNodeHeirarchyModel.isLogIn = false;
		self.showPage = false;
		mngtHierarchyNodeServiceProvider.getLoginPage(function(user){
			console.log("user:", user);
			self.init();
		});
	};

	self.getAssumeIdentityDialogBox = function(isNodeLoaded)
	{	
		var nodes  = getAllPathToEachNode(commonNodeHeirarchyModel.rootNode[0], "", []);
			nodes.unshift("[Assume Identity]");
			mngtHierarchyNodeServiceProvider.displayAssumeDialogBox(nodes, function(selectedNodeName)
			{
				if(selectedNodeName == false)
				{
					self.isTopNavigationBtnDisabled = selectedNodeName;
					self.accountTitle = "";
					selectedNodeName = true;
					$location.path("/templateAssumeIdentity");
				} else
				{
					self.isTopNavigationBtnDisabled = true;
					self.accountTitle = "Profile of " + selectedNodeName;
					self.commonNodeHeirarchyModel.isUserAssumeIdentity = true;
					mngtHierarchyNodeServiceProvider.checkIfPersonalDetailsAreInseared();
					var access = self.commonNodeHeirarchyModel.selectedTopNode.access;
					self.hasPermission = (access == "admin" || access == "viewer") ? true : false; 
				}
				isAssumeIdentity = !!selectedNodeName;
				canPageBeDisplayed(isNodeLoaded, isAssumeIdentity);
			});
	};

	self.loadPage = function()
	{
		self.showPage = false;
		self.commonNodeHeirarchyModel.isUserAssumeIdentity = false;
		self.getAssumeIdentityDialogBox(true);
	};

	self.displayAboutDialog = function() 
	{
		mngtHierarchyNodeServiceProvider.displayAboutDialogBox();
	};

	var getPopUpToasterMessage = function()
	{
		toaster.pop("error","Error occer while app was downloading data.");
	}

	var getAllPathToEachNode = function(nodes, pathToParent, allPath)
	{
		var pathToCurrentNode = pathToParent + (pathToParent.length == 0 ? "": ">") + nodes.name
		allPath.push(pathToCurrentNode);
		nodes.pathToNode = pathToCurrentNode;
		self.commonNodeHeirarchyModel.allNodesDetails.push(nodes); 
		for(var i = 0; i < nodes.child.length; i++)
		{
			getAllPathToEachNode(nodes.child[i], pathToCurrentNode, allPath);
		}
		return allPath;
	};

	var canPageBeDisplayed = function(isNodeLoaded, isAssumeIdentity)
	{
		self.showPage = isNodeLoaded && isAssumeIdentity && self.commonNodeHeirarchyModel.isLogIn;
	};

	var relocatePageToHomePage = function()
	{
		$location.path('/homeViewAccount');
	};
}]);