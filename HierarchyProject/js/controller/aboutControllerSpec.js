describe('Controller: aboutController', function() {

	beforeEach(module('myMngtHierarchyApp'));

	var ctrl, mockModalDialogBoxService;

	beforeEach(module(function($provide)
	{
		mockModalDialogBoxService = {
			hideDialog: function(){}
		};

		$provide.value('modalDialogBoxService', mockModalDialogBoxService);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('aboutController');
    }));

	it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should hide dialog when close() method is called', function()
    {
    	spyOn(mockModalDialogBoxService, 'hideDialog');
    	ctrl.close();
    });
});