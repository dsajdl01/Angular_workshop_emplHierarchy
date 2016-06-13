describe('Controller: loginController', function(){

	beforeEach(module('myMngtHierarchyApp'));

	var commonNodeHeirarchyModelMock, modalDialogBoxServiceMock, hierarchyNodeServiceMock

	var userLogin = [{ "nodeId": 100,"username": "bob","password": "1234567890","administrator": true},
        {"nodeId": 101,"username": "sandra","password": "1234567890","administrator": false}];

	beforeEach(module(function($provide)
	{
		commonNodeHeirarchyModelMock = {};

		modalDialogBoxServiceMock = {
			notifyAndHide: function(){}
		};

		hierarchyNodeServiceMock = {
			isSuccess: true,
			getLoginDetails: function(success, failes){
				if(this.isSuccess) success(userLogin);
				else failes('failed');
			}
		};
		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchyModelMock);
		$provide.value('modalDialogBoxService', modalDialogBoxServiceMock);
		$provide.value('hierarchyNodeService', hierarchyNodeServiceMock);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('loginController');
    }));

    it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should call getLoginDetails when init is called', function()
    {
    	hierarchyNodeServiceMock.isSuccess = true;
    	spyOn(hierarchyNodeServiceMock, 'getLoginDetails').and.callThrough();
    	spyOn(modalDialogBoxServiceMock, 'notifyAndHide');
    	
    	ctrl.init();
    	
    	expect(ctrl.user.username).toEqual("");
        expect(ctrl.user.password).toEqual("");
        expect(ctrl.failed).toBeFalsy();
        expect(ctrl.errorMessage).toBeFalsy();
    	expect(hierarchyNodeServiceMock.getLoginDetails).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    	expect(modalDialogBoxServiceMock.notifyAndHide).not.toHaveBeenCalled();
    });

    it('should call notifyAndHide() when getLoginDetails failed and when init is called', function()
    {
    	hierarchyNodeServiceMock.isSuccess = false;
    	spyOn(hierarchyNodeServiceMock, 'getLoginDetails').and.callThrough();
    	spyOn(modalDialogBoxServiceMock, 'notifyAndHide');
    	
    	ctrl.init();
    	
    	expect(ctrl.user.username).toEqual("");
        expect(ctrl.user.password).toEqual("");
        expect(ctrl.failed).toBeFalsy();
        expect(ctrl.errorMessage).toBeFalsy();
    	expect(hierarchyNodeServiceMock.getLoginDetails).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
    	expect(modalDialogBoxServiceMock.notifyAndHide).toHaveBeenCalledWith(false);
    });

    it('should display Username or password is incorrect when user type incorrent password and attempt to login', function()
    {
        hierarchyNodeServiceMock.isSuccess = true;

        ctrl.init();
        ctrl.user.username = "bob";
        ctrl.user.password = "0123456789";

        ctrl.login();

        expect(ctrl.errorMessage).toEqual("Username or password is incorrect!");
    });

    it('should display Username or password is incorrect when user type incorrent username and attempt to login', function()
    {
        hierarchyNodeServiceMock.isSuccess = true;

        ctrl.init();
        ctrl.user.username = "Bob";
        ctrl.user.password = "1234567890";

        ctrl.login();

        expect(ctrl.errorMessage).toEqual("Username or password is incorrect!");
    });

    it('should initilalize commonNodeHeirarchy user and call notifyAndHide with true when user type correct login', function()
    {
        hierarchyNodeServiceMock.isSuccess = true;

        ctrl.init();
        ctrl.user.username = "sandra";
        ctrl.user.password = "1234567890";
        spyOn(modalDialogBoxServiceMock, 'notifyAndHide');

        ctrl.login();

        expect(ctrl.commonNodeHeirarchyModel.user.isLogin).toBeTruthy();
        expect(ctrl.commonNodeHeirarchyModel.user.administrator).toBeFalsy();
        expect(ctrl.commonNodeHeirarchyModel.user.id).toBe(101);
        expect(ctrl.commonNodeHeirarchyModel.user.username).toEqual('sandra');
        expect(modalDialogBoxServiceMock.notifyAndHide).toHaveBeenCalledWith(true);
    });

    it('should initilalize commonNodeHeirarchy user and call notifyAndHide with true when user type correct login II', function()
    {
        hierarchyNodeServiceMock.isSuccess = true;

        ctrl.init();
        ctrl.user.username = "bob";
        ctrl.user.password = "1234567890";
        spyOn(modalDialogBoxServiceMock, 'notifyAndHide');

        ctrl.login();

        expect(ctrl.commonNodeHeirarchyModel.user.isLogin).toBeTruthy();
        expect(ctrl.commonNodeHeirarchyModel.user.administrator).toBeTruthy();
        expect(ctrl.commonNodeHeirarchyModel.user.id).toBe(100);
        expect(ctrl.commonNodeHeirarchyModel.user.username).toEqual('bob');
        expect(modalDialogBoxServiceMock.notifyAndHide).toHaveBeenCalledWith(true);
    });
});