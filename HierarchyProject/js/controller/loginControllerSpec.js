describe('Controller: loginController', function(){

	beforeEach(module('myMngtHierarchyApp'));

	var commonNodeHeirarchyModelMock, modalDialogBoxServiceMock, hierarchyNodeServiceMock

	var userLogin = [{ "id": 100,"username": "bob","password": "1234567890","administrator": true},
        {"id": 101,"username": "sandra","password": "1234567890","administrator": false}];
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
});