describe('Controller: myProfileContrller', function() {

	var ctrl, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock, toasterMock;

	var selectedNode = [{"name": "Bob", "id": 101,"parentsId": 100,"access": "admin",
						"child": [{"name": "Adam","id": 102,"parentsId": 101,"access": "user",
								"child": [] }] }];
	var details = [{"id": 101, "dob": "18/10/1973", "start": "28/09/2006","possition": "Developer",
		"comments": "Working as full-stacker developer.","fullname": "Bob Freeman","email":
		"bob.freeman@example.co.uk","password": "1234"},
		{"id": 102, "dob": null, "start": "21/02/2008","possition": "Designer",
		"comments": "Working as Java developer.","fullname": "Adam Smith","email":
		null,"password": "1234"}];
    var user = [{ "username": "bob"}, {"username": "adam"}]

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{   
		commonNodeHeirarchyModelMock = {
			userSelectedNode: selectedNode[0],
            user: user[0]
		};

		mngtHierarchyProviderMock = {
			getSelectedNodeDetails: function(id) {
				if(id == 101) return details[0];
				else if (id == 102) return details[1];
				else return null;
			}
		};

		toasterMock = {
			pop: function(error,message, option) {}
		};

		$provide.value('commonNodeHeirarchyModel', commonNodeHeirarchyModelMock);
		$provide.value('mngtHierarchyNodeServiceProvider', mngtHierarchyProviderMock);
		$provide.value('toaster', toasterMock);
	}));

	beforeEach(inject(function($controller)
	{
        ctrl = $controller('myProfileContrller');
    }));

    it('should be defined - Controller', function()
    {
        expect(ctrl).toBeDefined();
    });

    it('should initialize instance variables when init() function is called', function()
    {
    	ctrl.init();

    	expect(ctrl.showInputForms).toBeFalsy();
        expect(ctrl.username).toEqual("bob");
		expect(ctrl.btnName).toEqual("Save");
		expect(ctrl.employeeName).toEqual("Bob");
		expect(ctrl.Access).toEqual("admin");
		expect(ctrl.dob).toEqual("18/10/1973");
		expect(ctrl.email).toEqual("bob.freeman@example.co.uk");
		expect(ctrl.position).toEqual("Developer");
		expect(ctrl.startDay).toEqual("28/09/2006");
		expect(ctrl.employeeFullName).toEqual("Bob Freeman");
		expect(ctrl.hasAccess).toBeFalsy();
		expect(ctrl.oldPassword).toBeNull();
		expect(ctrl.newPassword).toBeNull();
		expect(ctrl.confirmPassword).toBeNull();
		expect(ctrl.btnEqualValue).toBeTruthy();
    	
		assertEqualOriginalValues();
    });

    it('should initialize instance variables when init() function is called - II', function()
    {
    	commonNodeHeirarchyModelMock.userSelectedNode = selectedNode[0].child[0];
        commonNodeHeirarchyModelMock.user = user[1]

    	ctrl.init();

		expect(ctrl.showInputForms).toBeFalsy();
		expect(ctrl.btnName).toEqual("Save");
        expect(ctrl.username).toEqual("adam");
		expect(ctrl.employeeName).toEqual("Adam");
		expect(ctrl.Access).toEqual("user");
		expect(ctrl.dob).toBeNull();
		expect(ctrl.email).toBeNull();
		expect(ctrl.position).toEqual("Designer");
		expect(ctrl.startDay).toEqual("21/02/2008");
		expect(ctrl.employeeFullName).toEqual("Adam Smith");
		expect(ctrl.hasAccess).toBeTruthy();
		expect(ctrl.oldPassword).toBeNull();
		expect(ctrl.newPassword).toBeNull();
		expect(ctrl.confirmPassword).toBeNull();
		expect(ctrl.btnEqualValue).toBeTruthy();

		assertEqualOriginalValues_II();
    });

    it('should open and close pa fields when showPasswordFields is called', function()
    {
    	ctrl.init();
    	expect(ctrl.showInputForms).toBeFalsy();
    	// user open password's fields
    	ctrl.showPasswordFields();
    	expect(ctrl.showInputForms).toBeTruthy();
    	// user can modified password's fields
    	ctrl.oldPassword = "password";
		ctrl.newPassword = "bflmpsvz";
		ctrl.confirmPassword = "bflmpsvz";
		// user close password's fields
    	ctrl.showPasswordFields();
    	expect(ctrl.showInputForms).toBeFalsy();
    	expect(ctrl.oldPassword).toBeNull();
		expect(ctrl.newPassword).toBeNull();
		expect(ctrl.confirmPassword).toBeNull();
    });

    it('should disable and rename buton when values are not same as original', function()
    {
    	ctrl.init();
    	// button should be disable and name Save
    	expect(ctrl.btnName).toEqual("Save");
    	expect(ctrl.btnEqualValue).toBeTruthy();
    	//user modify value
    	ctrl.employeeName = "Bobik";
    	ctrl.makeChange();
    	expect(ctrl.btnName).toEqual("Save");
    	expect(ctrl.btnEqualValue).toBeFalsy();
    	// user add back value
    	ctrl.employeeName = "Bob";
    	ctrl.makeChange();
    	expect(ctrl.btnName).toEqual("Done");
    	expect(ctrl.btnEqualValue).toBeTruthy();
    	// user modified it again
    	ctrl.email = "bob.freeman@example.com";
    	ctrl.makeChange();
    	expect(ctrl.btnName).toEqual("Save");
    	expect(ctrl.btnEqualValue).toBeFalsy();
    });

    it('should save personal data and called toaster when all data passed  and save function is called', function()
    {
    	ctrl.init();
    	ctrl.employeeName = "Bobik";
    	ctrl.employeeFullName = "Bobik Freeman";

    	expect(ctrl.originalEmplName).toEqual("Bob");
    	expect(ctrl.originalEmplFullName).toEqual("Bob Freeman");
    	spyOn(toasterMock, 'pop');

    	ctrl.save();

    	expect(ctrl.originalEmplName).toEqual("Bobik");
    	expect(ctrl.originalEmplFullName).toEqual("Bobik Freeman");
    	expect(toasterMock.pop).toHaveBeenCalledWith("success","Done", "The data was successfully saved.");

    	ctrl.employeeName = "Bob";
    	ctrl.employeeFullName = "Bob Freeman";

    	ctrl.save();
    	expect(ctrl.originalEmplName).toEqual("Bob");
    	expect(ctrl.originalEmplFullName).toEqual("Bob Freeman");
    	expect(toasterMock.pop).toHaveBeenCalledWith("success","Done", "The data was successfully saved.");
    });

    it('should display error  message when user try to save and enter only new password', function()
    {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.newPassword = "newPassword";
    	ctrl.save();

    	expect(ctrl.old_passwordMsg).toEqual("Current password is required.");
        expect(ctrl.confirm_passwordMsg).toBeTruthy();
        expect(ctrl.new_passwordMsg).toBeNull();
    });

     it('should display error  message when user try to save and enter only old password', function()
     {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.oldPassword = "1234";

    	ctrl.save();
    	expect(ctrl.old_passwordMsg).toBeNull();
        expect(ctrl.confirm_passwordMsg).toBeTruthy();
        expect(ctrl.new_passwordMsg).toBeTruthy();
    });

     it('should display error  message when user try to save and enter only confirm password', function()
     {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.confirmPassword = "newPassword";

    	ctrl.save();
    	expect(ctrl.old_passwordMsg).toEqual("Current password is required.");
        expect(ctrl.confirm_passwordMsg).toBeNull();
        expect(ctrl.new_passwordMsg).toBeTruthy();
    });

    it('should display error  message when user try to save and enter old password and confirm password', function()
    {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.oldPassword = "1234";
    	ctrl.confirmPassword = "newPassword";

    	ctrl.save();
    	expect(ctrl.old_passwordMsg).toBeNull();
        expect(ctrl.confirm_passwordMsg).toBeNull();
        expect(ctrl.new_passwordMsg).toBeTruthy();
    });

    it('should display error  message when user try to save and enter old password and new password', function()
    {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.oldPassword = "1234";
    	ctrl.newPassword = "newPassword";

    	ctrl.save();
    	expect(ctrl.old_passwordMsg).toBeNull();
        expect(ctrl.confirm_passwordMsg).toBeTruthy();
        expect(ctrl.new_passwordMsg).toBeNull();
    });

    it('should display error  message when user try to save and enter new password and confirm password', function()
    {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.confirmPassword = "newPassword";
    	ctrl.newPassword = "newPassword";

    	ctrl.save();
    	expect(ctrl.old_passwordMsg).toEqual("Current password is required.");
        expect(ctrl.confirm_passwordMsg).toBeNull();
        expect(ctrl.new_passwordMsg).toBeNull();
    });

    it('should display error  message when user try to save and enter incorrect old password', function()
    {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();

    	ctrl.oldPassword = "whatEver";
    	ctrl.newPassword = "newPassword";
    	ctrl.confirmPassword = "newPassword";

    	ctrl.save();
    	expect(ctrl.old_passwordMsg).toEqual("Incorrect Current Password");
        expect(ctrl.confirm_passwordMsg).toBeNull();
        expect(ctrl.new_passwordMsg).toBeNull();
    });

    it('should save personal data and assgn passwords instance to null when save is called and all data is entered', function()
    {
    	ctrl.init();
    	ctrl.showPasswordFields();

    	expect(ctrl.old_passwordMsg).toBeNull();
		expect(ctrl.confirm_passwordMsg).toBeNull();
		expect(ctrl.new_passwordMsg).toBeNull();
    	spyOn(toasterMock, 'pop');

    	ctrl.oldPassword = "1234";
    	ctrl.newPassword = "newPassword";
    	ctrl.confirmPassword = "newPassword";

    	ctrl.save();

    	expect(ctrl.old_passwordMsg).toBeNull();
        expect(ctrl.confirm_passwordMsg).toBeNull();
        expect(ctrl.new_passwordMsg).toBeNull();
        expect(toasterMock.pop).toHaveBeenCalledWith("success","Done", "The data was successfully saved.");
        assertEqualOriginalValues();
    });

	var assertEqualOriginalValues = function()
	{
		expect(ctrl.originalEmplName).toEqual("Bob");
		expect(ctrl.originalDob).toEqual("18/10/1973");
		expect(ctrl.originalEmail).toEqual("bob.freeman@example.co.uk");
		expect(ctrl.originalPosition).toEqual("Developer");
		expect(ctrl.originalStartDate).toEqual("28/09/2006");
		expect(ctrl.originalEmplFullName).toEqual("Bob Freeman");
		expect(ctrl.originalOldPassword).toBeNull();
		expect(ctrl.originalNewPassword).toBeNull();
		expect(ctrl.originalConfirmPassword).toBeNull();
	};

	var assertEqualOriginalValues_II = function()
	{
		expect(ctrl.originalEmplName).toEqual("Adam");
		expect(ctrl.originalDob).toBeNull();
		expect(ctrl.originalEmail).toBeNull();
		expect(ctrl.originalPosition).toEqual("Designer");
		expect(ctrl.originalStartDate).toEqual("21/02/2008");
		expect(ctrl.originalEmplFullName).toEqual("Adam Smith");
		expect(ctrl.originalOldPassword).toBeNull();
		expect(ctrl.originalNewPassword).toBeNull();
		expect(ctrl.originalConfirmPassword).toBeNull();
	};
});