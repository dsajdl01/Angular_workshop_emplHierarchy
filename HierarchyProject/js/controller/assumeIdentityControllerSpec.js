describe('Controller: assumeIdentityController', function(){

	beforeEach(module('myMngtHierarchyApp'));

	var ctrl, modalDialogBoxServiceMock , pathToEachNode;

	var node = ["[Assume Identity]", "David", "David>Bob", "David>Bob>Fred", "David>Magda"];

	beforeEach(module(function($provide)
	{
		modalDialogBoxServiceMock = {
			shareModalData: {
				pathToEachNode: node
			},
			notifyAndHide: function(selectedPath){
				return selectedPath;
			}
		}

		$provide.value('modalDialogBoxService', modalDialogBoxServiceMock);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('assumeIdentityController');
    }));

	it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should set showMessage to false and call notify when selectedPath is not equal to Assume Identity', function()
    {
    	ctrl.getSelectedValue("David>Bob");
    	spyOn(modalDialogBoxServiceMock, 'notifyAndHide');
    	expect(ctrl.showMessage).toBeFalsy();
    });

    it('should set showMessage to true and not to call notify when selectedPath is equal to Assume Identity', function()
    {
    	ctrl.getSelectedValue("[Assume Identity]");
    	spyOn(modalDialogBoxServiceMock, 'notifyAndHide');
    	expect(ctrl.showMessage).toBeTruthy();
    });

     it('should call notify when cancal is executed', function()
     {
    	spyOn(modalDialogBoxServiceMock, 'notifyAndHide');
    	spyOn(ctrl, 'cancel').and.callThrough();
    	
    	ctrl.cancel()
    	expect(ctrl.cancel).toHaveBeenCalled();
    });

});