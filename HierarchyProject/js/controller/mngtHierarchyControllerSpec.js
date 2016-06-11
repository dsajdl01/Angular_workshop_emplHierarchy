describe('Controller: mngtHierarchyController', function() {

	beforeEach(module('myMngtHierarchyApp'));

	var ctrl, mockMngtHierarchyProvider, mockCommonNodeHeirarchyModel, mockLocation, mockToaster, mockCalculateTimeService;

	var login = [{"isLogin": true, "administrator": true}, {"isLogin": true, "administrator": false }];

	var node = [{
			"name": "Sandra",
			"id": 100,
			"parentsId": null,
			"access": "admin",
			"child": [{
						"name": "Bob",
						"id": 101,
						"parentsId": 100,
						"access": "viewer",
						"child": [{
								"name": "David",
								"id": 106,
								"parentsId": 105,
								"access": "user",
								"child": []
							}]
						}, 
						{
						"name": "Fred",
						"id": 102,
						"parentsId": 100,
						"access": "viewer",
						"child": []
					}]
			}];

	beforeEach(module(function($provide)
	{
		mockCommonNodeHeirarchyModel = 
		{
			rootNode: node,
			selectedTopNode: node[0],
			user: login[0],
			allNodesDetails: []
		};

		mockMngtHierarchyProvider = 
		{
			isFirstNaneSelected: true,
			isSubNode: true,
			selNodeSucceed: true,
			loadSucceed: true,
			detailsSuccesd: true,
			islogin: true,
			loadTopNode: function(response){
				if(this.loadSucceed) response(true);
				else response(false);
			},
			loadNodeDetails: function(response){
				if(this.detailsSuccesd) response(true);
				else response(false);
			},
			displayAssumeDialogBox: function(path, selectedNodeName){
				if(this.selNodeSucceed){
					if(this.isSubNode){
						if(this.isFirstNaneSelected){
							selectedNodeName("Bob");
						} else {
							selectedNodeName("Fred");
						}
					} else {
						if(this.isFirstNaneSelected){
							selectedNodeName("Sandra");
						} else {
							selectedNodeName("David");
						}
					}
				} else {
					selectedNodeName(false);
				}
			},
			displayAboutDialogBox: function(){},
			checkIfPersonalDetailsAreInseared: function(){},
			getLoginPage: function(callback){
				if(this.islogin){
					callback(this.islogin);
				} else {
					callback(this.islogin);
				}
			},
			getLoginUserAsTopNode: function(){
				return "David";
			}
		};

		mockLocation = 
		{
			path: function(path) {}
		};

		mockToaster = 
		{
			pop: function(error,message, option) {}
		};
		mockCalculateTimeService = {
			getCurrentDate: function(){
				return "02/04/2016"
			}
		};

		$provide.value('calculateTimeService', mockCalculateTimeService);
		$provide.value("mngtHierarchyNodeServiceProvider", mockMngtHierarchyProvider);
		$provide.value("commonNodeHeirarchyModel", mockCommonNodeHeirarchyModel);
		$provide.value("$location", mockLocation);
		$provide.value("toaster", mockToaster);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('mngtHierarchyController');
    }));

    it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should get date in follow format mm/dd/yyyy', function()
    {
    	expect(ctrl.todayDay).toEqual("02/04/2016");
    });

    it('should load top hierarchy node when init() is called and get call assume identity box where sub-node is selected', function()
    {
    	mockMngtHierarchyProvider.isSubNode = false;
    	mockMngtHierarchyProvider.isFirstNaneSelected = true;
    	mockMngtHierarchyProvider.selNodeSucceed = true;
    	mockMngtHierarchyProvider.loadSucceed = true;
    	mockMngtHierarchyProvider.detailsSuccesd = true;

    	expect(ctrl.showPage).toBeFalsy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();
    	expect(ctrl.accountTitle).toBeUndefined;
    	expect(ctrl.commonNodeHeirarchyModel.isUserAssumeIdentity).toBeFalsy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();

    	spyOn(mockMngtHierarchyProvider, 'loadTopNode').and.callThrough();
    	spyOn(mockMngtHierarchyProvider, 'loadNodeDetails').and.callThrough();
    	spyOn(mockMngtHierarchyProvider, 'displayAssumeDialogBox').and.callThrough();

    	ctrl.init();

    	expect(ctrl.showPage).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.accountTitle).toEqual("Profile of Sandra");
    	expect(ctrl.hasPermission).toBeTruthy();
    });

    it('should load top hierarchy node when init() is called and get call assume identity box where top node is selected', function()
    {
    	mockMngtHierarchyProvider.isSubNode = false;
    	mockMngtHierarchyProvider.isFirstNaneSelected = false;
    	mockMngtHierarchyProvider.selNodeSucceed = true;
    	mockMngtHierarchyProvider.loadSucceed = true;
    	mockMngtHierarchyProvider.detailsSuccesd = true;
    	mockCommonNodeHeirarchyModel.selectedTopNode = node[0].child[0].child[0];
    	mockCommonNodeHeirarchyModel.user = login[1];

    	expect(ctrl.showPage).toBeFalsy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();
    	expect(ctrl.accountTitle).toBeUndefined;
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();

    	spyOn(mockMngtHierarchyProvider, 'loadTopNode').and.callThrough();
    	spyOn(mockMngtHierarchyProvider, 'loadNodeDetails').and.callThrough();
    	spyOn(mockMngtHierarchyProvider, 'displayAssumeDialogBox').and.callThrough();

    	ctrl.init();

    	expect(ctrl.showPage).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.accountTitle).toEqual("Profile of David");
    	expect(ctrl.hasPermission).toBeFalsy();
    });

    it('should pop up toaster message when loadTopNode() fail to load data', function()
    {
    	mockMngtHierarchyProvider.loadSucceed = false;
    	spyOn(mockMngtHierarchyProvider, 'loadTopNode').and.callThrough();

    	ctrl.init();

    	spyOn(mockToaster, 'pop');
    	expect(ctrl.showPage).toBeFalsy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();
    	expect(ctrl.accountTitle).toBeUndefined;
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();

    });

    it('should pop up toaster message when loadNodeDetails() falil to load data', function()
    {
    	mockMngtHierarchyProvider.loadSucceed = true;
    	mockMngtHierarchyProvider.detailsSuccesd = false;

    	spyOn(mockMngtHierarchyProvider, 'loadTopNode').and.callThrough();
    	spyOn(mockMngtHierarchyProvider, 'loadNodeDetails').and.callThrough();

    	spyOn(mockToaster, 'pop');
    	expect(ctrl.showPage).toBeFalsy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();
    	expect(ctrl.accountTitle).toBeUndefined;
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();
    });

    it('should assume identity as bob when administrator is true, getAssumeIdentityDialogBox is displayed and user select bob', function()
    {
    	mockMngtHierarchyProvider.selNodeSucceed = true;
		mockMngtHierarchyProvider.isSubNode = true;
		mockMngtHierarchyProvider.isFirstNaneSelected = true;
		mockCommonNodeHeirarchyModel.selectedTopNode = node[0].child[0];

		spyOn(mockMngtHierarchyProvider, 'displayAssumeDialogBox').and.callThrough();
		ctrl.getAssumeIdentityDialogBox(true);

		expect(ctrl.showPage).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.accountTitle).toEqual("Profile of Bob");
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.hasPermission).toBeTruthy();
    });

    it('should disable top navigation btn when getAssumeIdentityDialogBox is closed by user', function()
    {
    	mockMngtHierarchyProvider.selNodeSucceed = false;
    	spyOn(mockLocation, 'path');

    	spyOn(mockMngtHierarchyProvider, 'displayAssumeDialogBox').and.callThrough();
		ctrl.getAssumeIdentityDialogBox(true);

		expect(ctrl.showPage).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeFalsy();
    	expect(mockLocation.path).toHaveBeenCalledWith("/templateAssumeIdentity");
    	expect(ctrl.accountTitle).toEqual("");
    });

    it('should set login to false and getLoginPage function in service provider when getLoginPage is called', function()
    {
    	mockMngtHierarchyProvider.islogin = true;
    	ctrl.commonNodeHeirarchyModel.isLogIn = true;
    	spyOn(mockMngtHierarchyProvider, 'getLoginPage').and.callThrough();
    	spyOn(ctrl, 'init').and.callThrough();

    	expect(ctrl.commonNodeHeirarchyModel.isLogIn).toBeTruthy();
    	ctrl.getLoginPage();

    	expect(ctrl.commonNodeHeirarchyModel.isLogIn).toBeFalsy();
    	expect(mockMngtHierarchyProvider.getLoginPage).toHaveBeenCalled();
    	expect(ctrl.init).toHaveBeenCalled();
    });

    it('shoul pop up toaster worning message when user log in and data fail to load', function()
    {
    	mockMngtHierarchyProvider.islogin = false;
    	ctrl.commonNodeHeirarchyModel.isLogIn = true;
    	spyOn(mockMngtHierarchyProvider, 'getLoginPage').and.callThrough();
    	spyOn(ctrl, 'init').and.callThrough();
    	spyOn(mockToaster, 'pop');

    	expect(ctrl.commonNodeHeirarchyModel.isLogIn).toBeTruthy();
    	ctrl.getLoginPage();

    	expect(ctrl.commonNodeHeirarchyModel.isLogIn).toBeFalsy();
    	expect(mockMngtHierarchyProvider.getLoginPage).toHaveBeenCalled();
    	expect(ctrl.init).not.toHaveBeenCalled();
    	expect(mockToaster.pop).toHaveBeenCalledWith("error","ERROR!","An error occer while app was downloading data.");
    });

    it('should call getAssumeIdentityDialogBox when loadPage() is call and display title Fred if the user select Fred', function()
    {
    	mockMngtHierarchyProvider.selNodeSucceed = true;
		mockMngtHierarchyProvider.isSubNode = true;
		mockMngtHierarchyProvider.isFirstNaneSelected = false;
		mockCommonNodeHeirarchyModel.selectedTopNode = node[0].child[1];

		spyOn(mockMngtHierarchyProvider, 'displayAssumeDialogBox').and.callThrough();
		ctrl.loadPage();

		expect(ctrl.showPage).toBeTruthy();
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.accountTitle).toEqual("Profile of Fred");
    	expect(ctrl.isTopNavigationBtnDisabled).toBeTruthy();
    	expect(ctrl.hasPermission).toBeTruthy();
    });

    it('should call display about dialog box when displayAboutDialog is called', function()
    {
    	spyOn(mockMngtHierarchyProvider, 'displayAboutDialogBox');
    	ctrl.displayAboutDialog();
    });
});