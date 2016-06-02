describe('Controller: myProfileContrller', function() {

	var ctrl, commonNodeHeirarchyModelMock, mngtHierarchyProviderMock, toasterMock;

	var selectedNode = [{"name": "Bob", "id": 101,"parentsId": 100,"access": "admin",
						"child": [{"name": "Adam","id": 102,"parentsId": 101,"access": "user",
								"child": [] }] }];
	var details = [{"id": 101, "dob": "18/10/1973", "start": "28/09/2006","possition": "Developer",
		"comments": "Working as full-stacker developer.","fullname": "Bob Freeman","email":
		"bob.freeman@example.co.uk","password": "1234"},
		{"id": 102, "dob": null, "start": "21/02/2008","possition": "Developer",
		"comments": "Working as Java developer.","fullname": "Adam Smith","email":
		null,"password": "1234"}];

	beforeEach(module('myMngtHierarchyApp'));

	beforeEach(module(function($provide)
	{   
		commonNodeHeirarchyModelMock = {
			userSelectedNode: selectedNode[0]
			// commonNodeHeirarchyModel.userSelectedNode
		};

		mngtHierarchyProviderMock = {
			getSelectedNodeDetails: function(id){
				if(id == 101) return details[0];
				else if (id == 102) return details[1];
				else return null;
			}
		};

		toasterMock = {};

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

    it('should initialize instance variables when init() function is called', function(){
    	ctrl.init();

    	expect(ctrl.showInputForms).toBeFalsy();
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

    
	var assertEqualOriginalValues = function(){
		expect(ctrl.originalEmplName).toEqual("Bob");
		expect(ctrl.originalDob).toEqual("18/10/1973");
		expect(ctrl.originalEmail).toEqual("bob.freeman@example.co.uk");
		expect(ctrl.originalPosition).toEqual("Developer");
		expect(ctrl.originalStartDate).toEqual("28/09/2006");
		expect(ctrl.originalEmplFullName).toEqual("Bob Freeman");
		expect(ctrl.originalOldPassword).toBeNull();
		expect(ctrl.originalNewPassword).toBeNull();
		expect(ctrl.originalConfirmPassword).toBeNull();
	}
});